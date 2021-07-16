export class Meeting {
  agenda: Object;
  title: string;
  date: Date;
  motions: Object;
  url: string;
}

interface Votable {
  title: string;
  pass: boolean;
  contra?: string[];
  withheld?: string[];
  bias?: string;
  absent?: string;
}

export class Motion implements Votable {
  title: string;
  submitter: string;
  pass: boolean;
  agendaItem: string;
  index: number;
  id: string;
  forward?: boolean;
  forwardTo?: string;
  contra?: string[];
  withheld?: string[];
  bias?: string;
  absent?: string;

  setContra(list: string) {
    this.contra = list.split(",").map((p) => {
      const matches = p.match(/S?K?F?PÖ|Die Grünen|ÖVP|NEOS/gm);
      return matches ? matches[0] : null;
    });
  }

  setWithheld(list: string) {
    this.withheld = list.split(",").map((p) => {
      const matches = p.match(/S?K?F?PÖ|Die Grünen|ÖVP|NEOS/gm);
      return matches ? matches[0] : null;
    });
  }

  private checkVoteInfo(sentence: string): Boolean {
    if (!sentence) return false;
    return (
      sentence.match(/(?:Enthaltung|Gegenstimme|Stimmenthaltung):?(.+)/gm) !=
      null
    );
  }

  countVotes(result: string[], idx: number) {
    const string = result[idx];
    if (!string) return;
    const resultRxMatches = [
      ...string.matchAll(/(?:Enthaltung|Gegenstimme|Stimmenthaltung):?(.+)/gm),
    ];
    //if we have a result and it's for the main antrag
    if (resultRxMatches[0] && resultRxMatches[0].length > 0) {
      if (resultRxMatches[0][0].includes("nthaltung")) {
        this.setWithheld(resultRxMatches[0][1]);
      } else if (resultRxMatches[0][0].includes("Gegen")) {
        this.setContra(resultRxMatches[0][1]);
      }
    } else {
      console.log("Could not tally votes in string:" + string);
    }
    if (this.checkVoteInfo(result[idx + 1])) {
      this.countVotes(result, idx + 1);
    }
  }
}

export class GeneralMotion extends Motion {
  addenda: Addendum[];
  changes: Change[];
  chapters: ExtraMotion[];
  url: string;
  meetingNo: number;
  secret: boolean;

  addAddendum(addendum: Addendum) {
    if (!this.addenda) this.addenda = new Array() as Array<Addendum>;
    this.addenda.push(addendum);
  }

  addChange(change: Change) {
    if (!this.changes) this.changes = new Array() as Array<Change>;
    this.changes.push(change);
  }

  addChapter(chapter: ExtraMotion) {
    if (!this.chapters) this.chapters = new Array() as Array<ExtraMotion>;
    this.chapters.push(chapter);
  }

  matchAction(action: string) {
    return [
      ...action.matchAll(
        /(?:(?<majority>mehrstimmig|einstimmig)? (?:(?<result>angenommen|abgelehnt)|(?:(?:dem |zum )(?<forwardTo>.*(?=zugewiesen))))|(?<noVote>nicht.*ab.*timmt)|(?<withdrawn>.*zurückgezogen))/gm
      ),
    ];
  }

  analyze(sentences) {
    sentences.forEach((sentence, idx) => {
      const matches = [
        ...sentence.matchAll(
          /(?:D[erasi]*)?(?<thing>.*)(?:(?:wurde|wird)(?<action>.+(?=.))|(?:ist(?<attribute>.*)))/gm
        ),
      ];
      if (matches[0]) {
        let result = matches[0];
        //console.log(result);
        if (result.groups) {
          const thing = result.groups.thing;
          const action = result.groups.action;
          //if (thing != " Antrag ") console.log(thing);
          const motionType = thing.match(
            /(Antrag\b.+Zusatzantrag|Antrag.+Abänderungsantrag\b|Antrag\b|Abänderungsantrag\b|Zusatzantrag\b)/gm
          );
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
            //console.log( thingMatches)
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
                if (groups.majority == "mehrstimmig") {
                  extraMotion.countVotes(sentences, idx + 1);
                }
                if (motionType[0] == "Zusatzantrag")
                  this.addAddendum(extraMotion);
                if (motionType[0] == "Abänderungsantrag")
                  this.addChange(extraMotion);
              }
              //console.log(extraMotion);
            }
          } else if (motionType) {
            const actionMatches = this.matchAction(action);
            if (actionMatches[0]) {
              let groups = actionMatches[0].groups;
              this.pass = groups.result == "angenommen";
              if (groups.forwardTo != null) {
                this.forwardTo = groups.forwardTo;
                this.forward = true;
              }
              if (groups.majority == "mehrstimmig") {
                this.countVotes(sentences, idx + 1);
              }
            }
            if (thing.match(/Antrag\b.+Zusatzantrag/gm)) {
              this.addAddendum(new Addendum());
            } else if (thing.match(/Antrag.+Abänderungsantrag\b/gm)) {
              this.addChange(new Change());
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
              this.forwardTo = thingMatches[0].groups.forwardTo;
            }
            if (actionMatches[0]) {
              let groups = actionMatches[0].groups;
              this.forward = groups.result == "angenommen";
              if (groups.majority == "mehrstimmig") {
                this.countVotes(sentences, idx + 1);
              }
            }
            //console.log(`THING: ${thing}, ACTION: ${action}`);
          } else if (thing.match(/(\d.*\d)|\d/gm)) {
            const chapter = new ExtraMotion();
            chapter.title = thing.match(/(\d.*\d)|\d/gm);

            if (action) {
              const actionMatches = this.matchAction(action);
              if (actionMatches[0]) {
                let groups = actionMatches[0].groups;
                chapter.pass = groups.result == "angenommen";
                if (groups.majority == "mehrstimmig") {
                  chapter.countVotes(sentences, idx + 1);
                }
              }
              this.addChapter(chapter);
            }
          } else {
            //console.log(`THING: ${thing}, ACTION: ${action}`);
          }
        }
      } else if (sentence.match(/nthaltung|Gegenstimme/)) {
        //console.log("Vote: "+sentence);
      } else if (sentence.includes("Befangenheit")) {
        this.bias = sentence;
      } else if (sentence.includes("vertraulich")) {
        this.secret = true;
      } else if (sentence.includes("nicht anwesend")) {
        this.absent = sentence;
      } else {
        console.log("no match: " + sentence);
      }
    });
  }
}

export class ExtraMotion extends Motion {
  noVote?: boolean;
  sub?: string;
}

export class Addendum extends ExtraMotion {
  title = "Zusatzantrag";
}

export class Change extends ExtraMotion {
  title = "Abänderungsantrag";
}

/* export class Forward extends ExtraMotion {
  forwardTo: string;
  title = "Zuweisungssantrag";

  //takes a whole sentence and extracts recipients
  setForwardTo(string) {
    let rxResult = [
      ...string.matchAll(/Antrag.+(?:an den|dem)\s(.*)(?:wurde|zugewiesen)/gm),
    ];
    //console.log(resultRxMatches);
    if (rxResult[0] && rxResult[0].length > 1) {
      this.forwardTo = rxResult[0][1];
    }
  }
} */
