interface Votable {
  title: string;
  pass: boolean;
  contra?: string[];
  withheld?: string[];
  bias?: string;
  absent?: string;
}

interface VoteResult {
  subject: string;
  meta?: string;
  pro?: (string | string[])[];
  withheld?: (string | string[])[];
  contra?: (string | string[])[];
}

enum ExtraTypes {
  "addendum",
  "change",
  "chapter",
}
export class Motion implements Votable {
  title: string;
  submitter: string;
  pass: boolean;
  votes: VoteResult[];
  forward?: boolean;
  forwardTo?: string;
  bias?: string;
  absent?: string;
  debug?: Object[];
}

export class GeneralMotion extends Motion {
  url: string;
  id: string;
  index: number;
  date: Date;
  agendaItem: string;
  agendaText: string;
  meetingNo: number;
  meetingUrl: string;
  extras?: ExtraMotion[];
  secret?: boolean;

  addExtra(extra: ExtraMotion) {
    if (!this.extras) this.extras = new Array() as Array<ExtraMotion>;
    this.extras.push(extra);
  }
}

export class ExtraMotion extends Motion {
  type: string;
  noVote?: boolean;
  sub?: string;

  setType(type: number) {
    this.type = ExtraTypes[type];
  }
}

export class Addendum extends ExtraMotion {
  title = "Zusatzantrag";
}

export class Change extends ExtraMotion {
  title = "Abänderungsantrag";
}

export class MotionMaker {
  sentences = "";

  private partyListToArray(list: string) {
    const listToArray = list.split(",");
    listToArray.forEach((entry) => {
      if (entry.includes("und")) {
        const entryToArray = entry.split("und");
        entryToArray.forEach((value) => listToArray.push(value));
        listToArray.splice(listToArray.indexOf(entry), 1);
      }
    });
    return listToArray.map((p) => {
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
      } else if (groups && groups.delegate) {
        return groups.delegate;
      }
    });
  }

  private checkVoteInfo(sentence: string): RegExpMatchArray | undefined {
    if (!sentence) return undefined;
    return sentence.match(/(?:Enthaltung|Gegenstimme|Stimmenthaltung):?(.+)/gm);
  }

  private analyzeSentence(sentence: string, subject:string) {
    this.sentences += "\n" + sentence;
    const partyArray = this.partyListToArray(sentence).filter(
      (value) => value !== undefined
    );
    const rogueList = {"SPÖ": 0, "NEOS": 0}
    for (let party of partyArray) {
      if (Array.isArray(party)) {
        rogueList[party[0]]++;
      }
    }

    /* if (sentence.includes("nthaltung")) {
            result.withheld = this.partyListToArray(info[0]).filter(
              (value) => value !== undefined
            );
            for (let party of result.withheld) {
              if (Array.isArray(party)) {
                if (party[0] == "NEOS") neos--;
                result.pro = result.pro.filter((value) => value != party[0]);
              } else {
                result.pro = result.pro.filter((value) => value != party);
              }
            }
          } else if (info[0].includes("Gegen")) {
            result.contra = this.partyListToArray(info[0]).filter(
              (value) => value !== undefined
            );
            for (let party of result.contra) {
              if (Array.isArray(party)) {
                if (party[0] == "NEOS") neos--;
                result.pro = result.pro.filter((value) => value != party[0]);
              } else {
                result.pro = result.pro.filter((value) => value != party);
              }
            }
          } */
  }

  private countVotes(
    subject: string,
    action: string,
    values: string[],
    idx: number
  ): VoteResult {
    let neos = 3;
    let result: VoteResult = { subject: subject };
    if (action && action.includes("zugewiesen")) result.meta = action;
    let info = this.checkVoteInfo(values[idx]);

    if (info != undefined) {
      result.pro = ["SPÖ", "FPÖ", "ÖVP", "Die Grünen", "NEOS", "KPÖ"];
      while (info != undefined) {
        if (info[0] && info[0].length > 0) {
          this.analyzeSentence(info[0]);
        } else {
          console.log("Could not tally votes in string:" + values[idx]);
        }
        info = this.checkVoteInfo(values[++idx]);
      }
      if (neos < 3) {
        result.pro.push(["NEOS", neos.toString()]);
      }
    }

    return result;
  }

  /*
  matchAction(action: string) {
    return [
      ...action.matchAll(
        /(?:(?<majority>mehrstimmig|einstimmig)? (?:(?<result>angenommen|abgelehnt)|(?:(?:dem |zum )(?<forwardTo>.*(?=zugewiesen))))|(?<noVote>nicht.*ab.*timmt)|(?<withdrawn>.*zurückgezogen))/gm
      ),
    ];
  } */

  /*   getMotionType(thing:string){
   const motionType = thing.matchAll(
            /(Antrag\b.+Zusatzantrag|Antrag\b.+Zuweisung|Antrag.+Abänderungsantrag\b|Antrag\b|Abänderungsantrag\b|Zusatzantrag\b)/gm
          );
  
  } */

  make(item): GeneralMotion {
    let motion = new GeneralMotion();

    motion.debug = new Array();
    motion.votes = new Array();
    
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
        item.titel = item.dringlich_titel;
        if (item["dringlich_wortprotokoll-href"]) {
          item["wortprotokoll-href"] = item["dringlich_wortprotokoll-href"];
        }
      } else {
        return;
      }
    }

    const titleGroup = [
      ...item.antrag_titel.matchAll(
        /^(?<agendaItem>[A-Z])(?<index>[0-9]+)\.\s(?<value>(.|\n)+)/gm
      ),
    ][0];

    motion.title = titleGroup.groups.value;
    motion.agendaItem = titleGroup.groups.agendaItem;
    motion.index = parseInt(titleGroup.groups.index);

    //TODO: Einzelpersonen als Submitter
    let submitter = item.antrag_berichterstatter.match(
      /S?K?F?PÖ|Die Grünen|ÖVP|NEOS|Grüne/gm
    )
      ? item.antrag_berichterstatter.match(
          /S?K?F?PÖ|Die Grünen|ÖVP|NEOS|Grüne/gm
        )[0]
      : "";
    if (submitter == "Grüne") submitter = "Die Grünen";
    motion.submitter = submitter;

    //TODO: only store ids for production version
    motion.url = item["wortprotokoll-href"] || item["web-scraper-start-url"];

    motion.bias = item.antrag_ergebnisdetail;

    const result: string[] = item.antrag_ergebnisdetail.split("\n");
    let currentSubject: string, currentAction: string;

    result.forEach((sentence, idx) => {
      const match = [
        ...sentence.matchAll(
          /(?:D[erasi]*)?(?<thing>.*)(?:(?:wurde|wird)(?<action>.+(?=.))|(?:ist(?<attribute>.*)))/gm
        ),
      ][0];
      if (match) {
        currentSubject = match.groups.thing.trim();
        currentAction = match.groups.action;
        if (currentSubject && currentAction) {
          if (currentAction.includes("einstimmig")) {
            let result: VoteResult = {
              subject: currentSubject,
              pro: ["SPÖ", "FPÖ", "ÖVP", "Die Grünen", "NEOS", "KPÖ"],
            };
            if (currentAction.includes("zugewiesen")) {
              result.meta = currentAction;
            }
            motion.votes.push(result);
          }
        }
      } else if (this.checkVoteInfo(sentence)) {
        if (
          motion.votes.length == 0 ||
          motion.votes.find((value) => value.subject != currentSubject)
        ) {
          motion.votes.push(
            this.countVotes(currentSubject, currentAction, result, idx)
          );
        }
      } else {
        let index = motion.votes.findIndex(
          (value) => value.subject === currentSubject
        );
        if (index >= 0) {
          if (motion.votes[index].meta) {
            motion.votes[index].meta += sentence;
          } else {
            motion.votes[index].meta = sentence;
          }
        }
      }
    });

    return motion;
  }
}
