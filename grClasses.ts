export class Meeting {
  agenda: Object;
  title: string;
  date: Date;
  motions = new Array();
  url: string;
}

/*



*/

interface Votable {
  title: string;
  submitter: string;
  pass: boolean;
  contra?: string[];
  withheld?: string[];
  bias?: string;
  absent?: string;
}

export class Motion implements Votable {
  title: string;
  sentenceTypes: SentenceType[];
  submitter: string;
  pass: boolean;
  contra?: string[];
  withheld?: string[];
  bias?: string;
  absent?: string;

  setContra(list: string) {
    this.contra = list.split(",").map((p) => p.trim());
  }

  setWithheld(list: string) {
    this.withheld = list.split(",").map((p) => p.trim());
  }

  countVotes(result: String[], idx: number) {
    let string = result[idx];
    let resultRxMatches = [
      ...string.matchAll(/(?:Enthaltung|Gegenstimme|Stimmenthaltung):?(.+)/gm),
    ];
    //console.log(resultRxMatches);
    //if we have a result and it's for the main antrag
    if (resultRxMatches[0] && resultRxMatches[0].length > 0) {
      if (resultRxMatches[0][0].includes("nthaltung")) {
        this.withheld = resultRxMatches[0][1].split(",").map((p) => p.trim());
      } else if (resultRxMatches[0][0].includes("Gegen")) {
        this.contra = resultRxMatches[0][1].split(",").map((p) => p.trim());
      }
    } else {
      console.log("Could not tally votes in string:" + string);
    }
    if (
      this.sentenceTypes != null &&
      this.sentenceTypes[idx + 1] === SentenceType.Votes
    )
      this.countVotes(result, idx + 1);
  }
}

export class GeneralMotion extends Motion {
  addenda: Addendum[];
  changes: Change[];
  forward: Forward;
  url: string;
  meetingNo: number;

  addAddendum(addendum: Addendum) {
    if (!this.addenda) this.addenda = new Array() as Array<Addendum>;
    this.addenda.push(addendum);
  }

  addChange(change: Change) {
    if (!this.changes) this.changes = new Array() as Array<Addendum>;
    this.changes.push(change);
  }

  private preanalyzeSentenceTypes(sentences) {
    this.sentenceTypes = new Array();
    sentences.forEach((sentence, idx) => {
      const lengthBefore = this.sentenceTypes.length;
      if (sentence.match(/Zuweisung|zugewiesen/gm)) {
        this.sentenceTypes.push(SentenceType.Forward);
        return;
      }
      if (
        sentence.match(
          /^.{0,4}(?<sub>T|P|Anträge.*\d).*(?:(?:(?<majority>mehrstimmig|einstimmig)\s(?<result>angenommen|abgelehnt))|(?<invalid>zulässig))/gm
        ) !== null
      ) {
        this.sentenceTypes.push(SentenceType.Sub);
      } else if (
        sentence.match(
          /D\w{2}\s(?<name>((?!.*ntrag|Resolution).).*)(wurde|wird).*(angenommen|abgelehnt)/gm
        )
      ) {
        this.sentenceTypes.push(SentenceType.Sub);
      }
      //Ad "Der von der":
      //4: Could not match this one: Der von der Berichterstatterin abgeänderte Antrag wurde mehrstimmig angenommen.
      //O21. Attraktivierung der Linzer Schwimmbäder durch Ausdehnung der Öffnungszeiten und Wiedereinführung des Sommertickets - Resolution
      //https://www.linz.at/Politik/GRSitzungen/GPSearch/ResultDetail?TopId=3725
      if (
        sentence.match(
          /(Der Antrag|Die Resolution|Der von der).*(abgelehnt|angenommen)/gm
        )
      ) {
        this.sentenceTypes.push(SentenceType.Motion);
        return;
      }
      if (sentence.includes("Zusatzantrag")) {
        this.sentenceTypes.push(SentenceType.Addendum);
      }
      if (sentence.includes("Abänderungsantrag")) {
        this.sentenceTypes.push(SentenceType.Change);
      }
      if (sentence.includes("vertrauliche Sitzung")) {
        this.sentenceTypes.push(SentenceType.Secret);
      }
      if (
        sentence.match(
          /Enthaltung|Gegenstimme|Stimmenthaltung|Befangenheit|befangen|nicht anwesend|enthalten|dagegen|stimmt für/gm
        )
      ) {
        this.sentenceTypes.push(SentenceType.Votes);
      }
      if (
        sentence.match(
          /.* \b(.*) \bwurde (einstimmig )?von der Tagesordnung (\w*)/gm
        )
      ) {
        this.sentenceTypes.push(SentenceType.Removed);
      }
      if (
        sentence.match(
          /(?:Der|Die|Das)\s(.*)\s(?:wurde|wird)\s(mehrstimmig|einstimmig)? ?zur Kenntnis genommen/gm
        )
      ) {
        this.sentenceTypes.push(SentenceType.Recognization);
      }

      if (lengthBefore == this.sentenceTypes.length) {
        this.sentenceTypes.push(SentenceType.undefined);
        /*           console.log(
          ++noMatch +
            ": Could not match this one: " +
            sentence +
            "\n" +
            item.antrag_titel +
            "\n" +
            motion.url 
        );  */
      }
    });
  }

  analyze(sentences) {
    this.preanalyzeSentenceTypes(sentences);
    sentences.forEach((sentence, idx) => {
      if (this.sentenceTypes != null) {
        let type = this.sentenceTypes[idx];
        if(type === SentenceType.Motion){
          this.pass = sentence.includes("angenommen");
          if(this.sentenceTypes[idx+1] === SentenceType.Votes) this.countVotes(sentences, idx+1);
        }        
      }

      //main issue: spaghetti code, countvotes with idx+1 incomplete and fragile make it robust ffs
      //issues persist and intensify
      let extraMotion: ExtraMotion;

      //check if forward motion
      if (sentence.match(/(Zuweisung.*angenommen)|zugewiesen/gm)) {
        extraMotion = new Forward();
        extraMotion.pass = true;
        if (this.sentenceTypes[idx + 1] == SentenceType.Votes)
          extraMotion.countVotes(sentences, idx + 1);
      } else if (sentence.match(/(Zuweisung.*abgelehnt)/gm)) {
        extraMotion = new Forward();
        extraMotion.pass = false;
        if (this.sentenceTypes[idx + 1] == SentenceType.Votes)
          extraMotion.countVotes(sentences, idx + 1);
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
          if (
            result.groups.majority == "mehrstimmig" &&
            this.sentenceTypes[idx + 1] === SentenceType.Votes
          ) {
            extraMotion.countVotes(sentences, idx + 1);
          } else if (result.groups.majority == "nicht") {
            extraMotion.noVote = true;
          }
        }
      }

      if (extraMotion instanceof Forward) {
        extraMotion.setForwardTo(sentence);
        this.forward = extraMotion;
      } else if (extraMotion instanceof Change) {
        this.addChange(extraMotion);
      } else if (extraMotion instanceof Addendum) {
        this.addAddendum(extraMotion);
      }
    });
  }
}

export class ExtraMotion extends Motion {
  noVote?:boolean;
  sub?: string;
}

export class Addendum extends ExtraMotion {
  title = "Zusatzantrag";
}

export class Change extends ExtraMotion {
  title = "Abänderungsantrag";
}

export class Forward extends ExtraMotion {
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
}

export enum SentenceType {
  Motion = 0,
  Change = 1,
  Addendum = 2,
  Sub = 3,
  Forward = 4,
  Votes = 5,
  Removed = 6,
  Recognization = 7,
  Secret = 8,
  undefined = 9,
}
