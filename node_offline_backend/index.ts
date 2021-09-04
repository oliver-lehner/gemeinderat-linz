import * as fs from "fs";
import { URL } from "url";
import * as json from "./repair.json";
import { Motion, VoteResult, DataItem } from "./types";

function getTitleInfo(item: DataItem): RegExpMatchArray {
  return [
    ...item.antrag_titel.matchAll(
      /^(?<agendaItem>[A-Z])(?<index>[0-9]+)\.\s(?<value>(.|\n)+)/gm
    ),
  ][0];
}

function getMeetingDateAndNumber(item: DataItem): [Date, number] {
  const dateRxMatches = [
    ...item.sitzung.matchAll(
      /(\d+)\.(?:\sGemeinderatssitzung\sam\s)(\d+)\.(\d+)\.(\d{4})(?:\sum\s)(\d+)/gm
    ),
  ];
  let meetingNo: number = Array.isArray(dateRxMatches[0])
    ? parseInt(dateRxMatches[0][1])
    : 0;
  if (meetingNo > 51) return undefined; //scraped data includes one meeting from period before

  let date = new Date(
    parseInt(dateRxMatches[0][4]),
    parseInt(dateRxMatches[0][3])-1, //fucking monthIndex who came up with this?
    parseInt(dateRxMatches[0][2]),
    parseInt(dateRxMatches[0][5]),
    0,
    0,
    0
  );
  return [date, meetingNo];
}

function getAgenda(item: DataItem): {} {
  const agendaRxMatches = [
    ...item.tagesordnung.matchAll(
      /(?<index>[A-Z])\.\s*(?<value>[\wÄÖÜäöüß€§.,\-;\(\)"\/: ]+)/gm
    ),
  ];

  let agenda = {};
  agendaRxMatches.forEach((to) => {
    agenda[to.groups.index] = to.groups.value;
  });
  return agenda;
}

function getVoteResults(item: DataItem): VoteResult[] {
  const result: string[] = item.antrag_ergebnisdetail.split("\n");
  let voteResults = new Array<VoteResult>();
  let currentSubject: string;
  result.forEach((sentence) => {
    let partialResult = analyzeSentence(sentence);
    if (partialResult && typeof partialResult != "string") {
      if ("subject" in partialResult && "action" in partialResult) {
        let passed = partialResult.action.includes("angenommen");
        voteResults.push({
          subject: partialResult.subject,
          passed: passed,
          meta: [partialResult.action],
        });
        currentSubject = partialResult.subject;
      } else if ("vote" in partialResult) {
        let index = voteResults.findIndex(
          (value) => value.subject === currentSubject
        );
        if (index >= 0) {
          voteResults[index][partialResult.vote] = partialResult.parties;
        }
      } else if ("subject" in partialResult && "passed" in partialResult) {
        //this is the case for einstimmig angenommen, when analyzeSentence returns a VoteResult
        voteResults.push(partialResult);
      }
    } else if (partialResult && typeof partialResult == "string") {
      //sentences that are neither subject/action or vote results become meta info
      let index = voteResults.findIndex(
        (value) => value.subject === currentSubject
      );
      if (index >= 0) {
        if (Array.isArray(voteResults[index]["meta"])) {
          voteResults[index]["meta"].push(partialResult);
        } else {
          voteResults[index]["meta"] = [partialResult];
        }
      }
    }
  });
  return voteResults;
}

function analyzeSentence(sentence: string):
  | string
  | VoteResult
  | { subject: string; action: string }
  | {
      vote: string;
      parties: string[] | string[][];
    } {
  const match = [
    ...sentence.matchAll(
      /(?:D[erasi]*)?(?<thing>.*)(?:(?:wurde|wird)(?<action>.+(?=.))|(?:ist(?<attribute>.*)))/gm
    ),
  ][0];
  if (match) {
    if (match.groups.thing && match.groups.action) {
      const result = {
        subject: match.groups.thing.trim(),
        action: match.groups.action.trim(),
      };
      if (result.action.includes("einstimmig")) {
        let voteResult: VoteResult = {
          subject: result.subject,
          meta: [result.action],
          passed: true,
        };
        return voteResult;
      } else {
        return result;
      }
    }
  } else if (checkVoteInfo(sentence)) {
    return countVotes(sentence);
  } else {
    return sentence;
  }
}

function partyListToArray(list: string) {
  const listToArray = list.split(",");
  listToArray.forEach((entry) => {
    if (entry.includes("und")) {
      const entryToArray = entry.split("und");
      entryToArray.forEach((value) => listToArray.push(value));
      listToArray.splice(listToArray.indexOf(entry), 1);
    }
  });
  return listToArray
    .map((p) => {
      if (p.includes("Grüne")) p = "Die Grünen";
      const matches = [
        ...p.matchAll(
          /(?<delegate>(?:GRin|GR).*(?=\s\())?(?:\s\()?(?<party>S?K?F?PÖ|Die Grünen|ÖVP|NEOS|Neos)/gm
        ),
      ];
      const groups = matches.length > 0 ? matches[0].groups : undefined;
      if (groups && !groups.delegate) {
        return groups.party;
      } else if (groups && groups.party && groups.delegate) {
        return [groups.party, groups.delegate];
      }
    })
    .filter((value) => value !== undefined);
}

function checkVoteInfo(sentence: string): boolean | undefined {
  if (!sentence) return undefined;
  return sentence.includes("nthaltung") || sentence.includes("Gegenstimme");
}

function countVotes(value: string): {
  vote: string;
  parties: string[] | string[][];
} {
  const match = [
    ...value.matchAll(
      /(?<side>(?:.*nthaltung:\s?|Ge.*mme:\s?))(?<parties>.*)/gm
    ),
  ][0];
  let result;
  if (match)
    if (match.groups.side.includes("nthaltung")) {
      result = {
        vote: "withheld",
        parties: partyListToArray(match.groups.parties),
      };
    } else if (match.groups.side.includes("Gegen")) {
      result = {
        vote: "contra",
        parties: partyListToArray(match.groups.parties),
      };
    } else {
      console.log("Could not tally votes in string:" + value);
    }
  return result;
}

function main() {
  let output = [];
  const data = json["result"];

  data.forEach((item: DataItem) => {
    //I realized that urgent motions weren't initially included in the scraped data,
    //but adding those motions polluted the data with duplicates.
    if (!item.antrag_berichterstatter || !item.antrag_ergebnisdetail) {
      if (
        item.dringlich_titel &&
        item.dringlich_ergebnisdetail &&
        item.dringlich_berichterstatter
      ) {
        item.antrag_berichterstatter = item.dringlich_berichterstatter;
        item.antrag_ergebnisdetail = item.dringlich_ergebnisdetail;
        item.antrag_titel = item.dringlich_titel;
        if (item["dringlich_wortprotokoll-href"]) {
          item["wortprotokoll-href"] = item["dringlich_wortprotokoll-href"];
        }
      } else {
        return;
      }
    }

    const titleInfo = getTitleInfo(item);

    if (titleInfo) {
      const motion = {} as Motion;
      motion.title = titleInfo.groups.value;
      let [date, meetingNo] = getMeetingDateAndNumber(item);
      motion.id =
        meetingNo + titleInfo.groups.agendaItem + titleInfo.groups.index;

      let submitter = item.antrag_berichterstatter.match(
        /S?K?F?PÖ|Die Grünen|ÖVP|NEOS|Grüne/gm
      )
        ? item.antrag_berichterstatter.match(
            /S?K?F?PÖ|Die Grünen|ÖVP|NEOS|Grüne/gm
          )[0]
        : "";
      if (submitter == "Grüne") submitter = "Die Grünen";
      motion.submitter = submitter;

      let motionUrlId;
      if (item["wortprotokoll-href"]) {
        const searchParams = new URL(item["wortprotokoll-href"]).searchParams;
        if (searchParams.get("TopId")) {
          motionUrlId = "TopId=" + searchParams.get("TopId");
        } else if (searchParams.get("AnfrageAntragId")) {
          motionUrlId =
            "AnfrageAntragId=" + searchParams.get("AnfrageAntragId");
        }
      }

      const meetingUrlId =
        "GrId=" +
        new URL(item["web-scraper-start-url"]).searchParams.get("GrId");

      motion.url = motionUrlId || meetingUrlId;

      const agenda = getAgenda(item);
      motion.meta = {
        date: date.toISOString(),
        agendaText: agenda[titleInfo.groups.agendaItem],
        meetingUrl: meetingUrlId,
        meetingNo: meetingNo,
        index: parseInt(titleInfo.groups.index),
        agendaItem: titleInfo.groups.agendaItem,
      };

      motion.votes = getVoteResults(item);

      if (motion != undefined) {
        output.push(motion);
      }
    }
  });

  const sorted = output.sort((a, b) => {
    const calcScore = (val) =>
      val.meta.meetingNo * 10000 +
      val.meta.agendaItem.charCodeAt(0) * 100 +
      parseInt(val.meta.index);
    const score = calcScore(a) - calcScore(b);
    return score;
  });

  const outputString = JSON.stringify(sorted);

  fs.writeFile("./gr-results.json", outputString, "utf8", (err) => {
    if (err) {
      console.log(`Error writing file: ${err}`);
    } else {
      console.log(`File is written successfully!`);
    }
  });
}

main();
