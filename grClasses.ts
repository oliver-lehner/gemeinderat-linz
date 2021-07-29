interface Votable {
  title: string;
  pass: boolean;
  contra?: string[];
  withheld?: string[];
  bias?: string;
  absent?: string;
}

interface VoteResult {
  pro?: string[];
  withheld?: string[];
  contra?: string[];
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
  votes: VoteResult;  
  forward?: boolean;
  forwardTo?: string;
  bias?: string;
  absent?: string;
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
  //TODO handle single person case (looking at you, neos)
  private partyListToArray(list: string): string[] {
    return list.split(",").map((p) => {
      const matches = p.match(/S?K?F?PÖ|Die Grünen|ÖVP|NEOS|Neos/gm);
      return matches ? matches[0] : null;
    });
  }

  private checkVoteInfo(sentence: string): RegExpMatchArray | undefined {
    if (!sentence) return undefined;
    return sentence.match(/(?:Enthaltung|Gegenstimme|Stimmenthaltung):?(.+)/gm);
  }

  private countVotes(values: string[], idx: number): VoteResult {
    let result: VoteResult = {};

    result.pro = ["SPÖ", "FPÖ", "ÖVP", "Die Grünen", "NEOS", "KPÖ"];
    while (this.checkVoteInfo(values[idx]) != undefined) {
      const resultRxMatches = this.checkVoteInfo(values[idx]);
      if (resultRxMatches[0] && resultRxMatches[0].length > 0) {
        if (resultRxMatches[0].includes("nthaltung")) {
          result.withheld = this.partyListToArray(resultRxMatches[0]);
          for (let party of result.withheld) {
            result.pro.splice(result.pro.indexOf(party), 1);
          }
        } else if (resultRxMatches[0].includes("Gegen")) {
          result.contra = this.partyListToArray(resultRxMatches[0]);
          for (let party of result.contra) {
            result.pro.splice(result.pro.indexOf(party), 1);
          }
        }
      } else {
        console.log("Could not tally votes in string:" + values[idx]);
      }
      idx++;
    }
    return result;
  }

  matchAction(action: string) {
    return [
      ...action.matchAll(
        /(?:(?<majority>mehrstimmig|einstimmig)? (?:(?<result>angenommen|abgelehnt)|(?:(?:dem |zum )(?<forwardTo>.*(?=zugewiesen))))|(?<noVote>nicht.*ab.*timmt)|(?<withdrawn>.*zurückgezogen))/gm
      ),
    ];
  }

  make(item): GeneralMotion {
    let motion = new GeneralMotion();

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

    let submitter = item.antrag_berichterstatter.match(
      /S?K?F?PÖ|Die Grünen|ÖVP|NEOS|Grüne/gm
    )
      ? item.antrag_berichterstatter.match(
          /S?K?F?PÖ|Die Grünen|ÖVP|NEOS|Grüne/gm
        )[0]
      : "";
    if (submitter == "Grüne") submitter = "Die Grünen";
    motion.submitter = submitter;
    motion.title = titleGroup.groups.value;
    motion.agendaItem = titleGroup.groups.agendaItem;
    motion.index = parseInt(titleGroup.groups.index);
    //motion.id = meetingNo.toString()+motion.agendaItem+titleGroup.groups.index;

    motion.url = item["wortprotokoll-href"] || item["web-scraper-start-url"];

    const result = item.antrag_ergebnisdetail.split("\n");

    result.forEach((sentence, idx) => {
      const matches = [
        ...sentence.matchAll(
          /(?:D[erasi]*)?(?<thing>.*)(?:(?:wurde|wird)(?<action>.+(?=.))|(?:ist(?<attribute>.*)))/gm
        ),
      ];
      if (matches[0]) {
        if (matches[0].groups) {
          const thing = matches[0].groups.thing;
          const action = matches[0].groups.action;
          const motionType = thing.match(
            /(Antrag\b.+Zusatzantrag|Antrag.+Abänderungsantrag\b|Antrag\b|Abänderungsantrag\b|Zusatzantrag\b)/gm
          );
          //there's much room for improvement down there vv

          if (
            motionType &&
            (motionType[0] == "Zusatzantrag" ||
              motionType[0] == "Abänderungsantrag")
          ) {
            let extraMotion = new ExtraMotion();
            const thingMatches = [
              ...thing.matchAll(
                /(?:der (?<party>[NEOSPÖVFGrünen, ]*)\s)|(?:von\s(?<member>.*))/gm
              ),
            ];
            if (thingMatches[0]) {
              const subEntity =
                thingMatches[0].groups.party || thingMatches[0].groups.member;
              if (subEntity) extraMotion.submitter = subEntity;
            }
            if (action) {
              const actionMatches = this.matchAction(action);
              if (actionMatches[0]) {
                let groups = actionMatches[0].groups;
                extraMotion.pass = groups.result == "angenommen";
                if (groups.noVote != null) extraMotion.noVote = true;
                if (groups.forwardTo != null) {
                  extraMotion.forwardTo = groups.forwardTo;
                  extraMotion.forward = true;
                }
                //if (groups.majority == "mehrstimmig") {
                extraMotion.votes = this.countVotes(result, idx + 1);
                //}
                if (motionType[0] == "Zusatzantrag")
                  extraMotion.setType(ExtraTypes.addendum);

                if (motionType[0] == "Abänderungsantrag")
                  extraMotion.setType(ExtraTypes.change);
                motion.addExtra(extraMotion);
              }
            }
          } else if (motionType) {
            const actionMatches = this.matchAction(action);
            if (actionMatches[0]) {
              let groups = actionMatches[0].groups;
              motion.pass = groups.result == "angenommen";
              if (groups.forwardTo != null) {
                motion.forwardTo = groups.forwardTo;
                motion.forward = true;
              }
              //if (groups.majority == "mehrstimmig") {
              motion.votes = this.countVotes(result, idx + 1);
              //}
            }
            if (thing.match(/Antrag\b.+Zusatzantrag/gm)) {
              motion.addAddendum(new Addendum());
            } else if (thing.match(/Antrag.+Abänderungsantrag\b/gm)) {
              motion.addChange(new Change());
            }
          } else if (thing.match(/Zu?weisung/gm)) {
            //typos are usually the cause for weird regexes like this
            const thingMatches = [
              ...thing.matchAll(
                /(?<=(?:(?:a|i)n de(?:n|r))|zum) (?<forwardTo>.*)/gm
              ),
            ];
            const actionMatches = this.matchAction(action);
            if (thingMatches[0]) {
              motion.forwardTo = thingMatches[0].groups.forwardTo;
            }
            if (actionMatches[0]) {
              let groups = actionMatches[0].groups;
              motion.forward = groups.result == "angenommen";
              //if (groups.majority == "mehrstimmig") {
              motion.votes = this.countVotes(result, idx + 1);
              //}
            }
          } else if (thing.match(/(\d.*\d)|\d/gm)) {
            const chapter = new ExtraMotion();
            chapter.title = thing.match(/(\d.*\d)|\d/gm);

            if (action) {
              const actionMatches = this.matchAction(action);
              if (actionMatches[0]) {
                let groups = actionMatches[0].groups;
                chapter.pass = groups.result == "angenommen";
                //if (groups.majority == "mehrstimmig") {
                chapter.votes = this.countVotes(result, idx + 1);
                //}
              }
              chapter.setType(ExtraTypes.chapter);
              motion.addExtra(chapter);
            }
          } else {
          }
        }
      } else if (sentence.match(/nthaltung|Gegenstimme/)) {
      } else if (sentence.includes("Befangenheit")) {
        motion.bias = sentence;
      } else if (sentence.includes("vertraulich")) {
        motion.secret = true;
      } else if (sentence.includes("nicht anwesend")) {
        motion.absent = sentence;
      } else {
        console.log("no match: " + sentence);
      }
    });

    return motion;
  }
}
