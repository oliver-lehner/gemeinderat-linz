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
  title: string
  submitter: string
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
  contra?: string[];
  withheld?: string[];
  bias?: string;
  absent?: string;

  setContra(list: string) {
    this.contra = list.split(",").map((p) => p.trim());
  }

  setWithheld(list:string) {
    this.withheld = list.split(",").map((p) => p.trim());
  }

  countVotes(string) {
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
  }
}


export class GeneralMotion extends Motion {
  addenda: Addendum[];
  changes: Change[];
  forward: Forward;
  url: string;
  meetingNo: number;

  addAddendum(addendum:Addendum){
    if(!this.addenda) this.addenda = new Array() as Array<Addendum>;
    this.addenda.push(addendum);
  }

  addChange(change:Change){
  if(!this.changes) this.changes = new Array() as Array<Addendum>;
    this.changes.push(change);
  }

}


export class ExtraMotion extends Motion {
  noVote = false;
  sub?:string;
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
  undefined = 9
}