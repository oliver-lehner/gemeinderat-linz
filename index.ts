import * as fs from "fs";
import * as json from "./grsitzungen-5b.json";
import {
  Meeting,
  GeneralMotion,
  // Addendum,
  // Change,
  // Forward,
  // ExtraMotion,
  SentenceType,
} from "./grClasses";
//import { deepCopy } from 'deep-copy-ts';
const meetings = {};
const data = json["result"];

function setupMeetings() {
  data.forEach((item) => {
    const dateRxMatches = [
      ...item.sitzung.matchAll(
        /(\d+)\.(?:\sGemeinderatssitzung\sam\s)(\d+)\.(\d+)\.(\d{4})(?:\sum\s)(\d+)/gm
      ),
    ];
    let meetingNo = Array.isArray(dateRxMatches[0]) ? dateRxMatches[0][1] : 0;
    if (!meetings[meetingNo] && meetingNo > 0) {
      let meeting = new Meeting();
      meeting.date = new Date(
        parseInt(dateRxMatches[0][4]),
        parseInt(dateRxMatches[0][3]),
        parseInt(dateRxMatches[0][2]),
        parseInt(dateRxMatches[0][5]),
        0,
        0,
        0
      );
      meeting.url = item["web-scraper-start-url"];
      meeting.title = item.sitzung;

      //regex agenda string
      const agendaRxMatches = [
        ...item.tagesordnung.matchAll(/([A-S])\.(?:\n\s*\n\s*)(.+?(?=\n))/gm),
      ];
      let agenda = {};

      agendaRxMatches.forEach((to) => {
        //console.log(to[1]+" "+to[2]);
        agenda[to[1]] = to[2];
      });
      meetings[meetingNo] = meeting;
    }
  });
}

setupMeetings();
makeMotions();

function makeMotions() {
  let fail = 0;
  let noMatch = 0;
  data.forEach((item) => {
    if (!item.antrag_berichterstatter || !item.antrag_ergebnisdetail) return;
    let motion = new GeneralMotion();
    motion.title = item.antrag_titel.replace("\n", " ");
    motion.submitter = item.antrag_berichterstatter.substr(
      1,
      item.antrag_berichterstatter.length - 2
    );
    motion.url = item["wortprotokoll-href"];

    //welcome to hell, first split result in sentences
    const resultArray = item.antrag_ergebnisdetail.split("\n");
    //to interpret multiline results, analyze sentence type beforehand
    const sentenceTypeArray: SentenceType[] = new Array();
    resultArray.forEach((sentence, idx) => {
      const lengthBefore = sentenceTypeArray.length;
      if (sentence.match(/Zuweisung|zugewiesen/gm)) {
        sentenceTypeArray.push(SentenceType.Forward);
      }
      if (
        sentence.match(
          /^.{0,4}(?<sub>P.*\d).*(?<majority>mehrstimmig|einstimmig)\s(?<result>angenommen|abgelehnt)/gm
        ) !== null
      ) {
        sentenceTypeArray.push(SentenceType.Sub);
      }
      if (sentence.match(/Der Antrag.*(abgelehnt|angenommen)/gm)) {
        sentenceTypeArray.push(SentenceType.Motion);
      }
      if (sentence.includes("Zusatzantrag")) {
        sentenceTypeArray.push(SentenceType.Addendum);
      }
      if (sentence.includes("Abänderungsantrag")) {
        sentenceTypeArray.push(SentenceType.Change);
      }
      if (sentence.includes("vertrauliche Sitzung")) {
        sentenceTypeArray.push(SentenceType.Secret);
      }
      if (
        sentence.match(
          /Enthaltung|Gegenstimme|Stimmenthaltung|Befangenheit|nicht anwesend|enthalten|dagegen/gm
        )
      ) {
        sentenceTypeArray.push(SentenceType.Votes);
      }
      if (
        sentence.match(
          /.* \b(.*) \bwurde (einstimmig )?von der Tagesordnung (\w*)/gm
        )
      ) {
        sentenceTypeArray.push(SentenceType.Removed);
      }
      if (
        sentence.match(
          /(?:Der|Die|Das)\s(.*)\s(?:wurde|wird)\s(mehrstimmig|einstimmig)? ?zur Kenntnis genommen/gm
        )
      ) {
        sentenceTypeArray.push(SentenceType.Recognization);
      }

      if (lengthBefore == sentenceTypeArray.length) {
        sentenceTypeArray.push(SentenceType.undefined);
        console.log(
          ++noMatch +
            ": Could not match this one: " +
            sentence +
            "\n" +
            item.antrag_titel +
            "\n" +
            motion.url
        );
      }

      /*
        //main issue: spaghetti code, countvotes with idx+1 incomplete and fragile make it robust ffs
        let extraMotion: ExtraMotion;

        //check if forward motion
        if (sentence.match(/(Zuweisung.*angenommen)|zugewiesen/gm)) {
          extraMotion = new Forward();
          extraMotion.pass = true;
          if (sentence.includes("mehrstimmig")) {
            extraMotion.countVotes(resultArray[idx + 1]);
          }
        } else if (sentence.match(/(Zuweisung.*abgelehnt)/gm)) {
          extraMotion = new Forward();
          extraMotion.pass = false;
          extraMotion.countVotes(resultArray[idx + 1]);
        }

        //check if change motion
        let regEx;
        if (sentence.includes("Zusatzantrag")) {
          regEx =
            /Zusatzantrag (?:\((?<sub>.*)\)\s)?((?:der (?<party>[NEOSPÖVFGrünen, ]*)\s)|(?:von\s(?<member>.*)))?(?:wird|wurde)\s(?<majority>nicht|mehrstimmig|einstimmig)\s(?<pass>\w*)?/gm;
          extraMotion = new Addendum();
        } 
        
        if (sentence.includes("Abänderungsantrag")) {
          regEx =
            /Abänderungsantrag (?:\((?<sub>.*)\)\s)?(?:der (?<party>[NEOSPÖVFGrünen]*)\s)?(?:wird|wurde)\s(?<majority>nicht|mehrstimmig|einstimmig)\s(?<pass>\w*)?/gm;
          extraMotion = new Change();
        }

        let resultRxMatches = [...sentence.matchAll(regEx)];
        //console.log(resultRxMatches);
        //if we have a result and it's for the main antrag
        if (resultRxMatches[0]) {
          let result = resultRxMatches[0];
          //console.log(result);
          if (result.groups) {
            extraMotion.pass = result.groups.pass == "angenommen";
            extraMotion.submitter = result.groups.party || result.groups.member;
            extraMotion.sub = result.groups.sub;
            if (result.groups.majority == "mehrstimmig") {
              extraMotion.countVotes(resultArray[idx + 1]);
            } else if (result.groups.majority == "nicht") {
              extraMotion.noVote = true;
            }
          }
        }

        if (extraMotion instanceof Forward) {
          extraMotion.setForwardTo(sentence);
          motion.forward = extraMotion;
        } else if (extraMotion instanceof Change) {
          motion.addChange(extraMotion);
        } else if (extraMotion instanceof Addendum) {
          motion.addAddendum(extraMotion);
        }
        */
    });
    if (resultArray.length != sentenceTypeArray.length) {
      fail++;
      console.log(resultArray);
      console.log(sentenceTypeArray);
      console.log("-------------------");
    }
    const meetingNo = item.sitzung.match(/^\d+/gm)[0];
    meetings[meetingNo].motions.push(motion);
  });
  console.log("Could not interpret result: " + fail);
  console.log("Unmatched sentences: " + noMatch);
}

const outputString = JSON.stringify(meetings);

// write file to disk
fs.writeFile("./gr-nice.json", outputString, "utf8", (err) => {
  if (err) {
    console.log(`Error writing file: ${err}`);
  } else {
    console.log(`File is written successfully!`);
  }
});
