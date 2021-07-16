import * as fs from "fs";
import * as json from "./repair.json";
import { Meeting, GeneralMotion } from "./grClasses";
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
        ...item.tagesordnung.matchAll(
          /(?<index>[A-Z])\.\s*(?<value>[\wÄÖÜäöüß€§.,\-;\(\)"\/: ]+)/gm
        ),
      ];
      let agenda = {};
      agendaRxMatches.forEach((to) => {
        agenda[to.groups.index] = to.groups.value;
      });
      meeting.agenda = agenda;
      meetings[meetingNo] = meeting;
    }
  });
}

setupMeetings();
makeMotions();

interface MotionData {
  titleInfo: RegExpMatchArray;
  submitter: string;
  resultArray: string[];
  url?: string;
}

function makeMotions() {
  let motionData: MotionData;
  const motions = {};
  /*   let fail = 0;
  let noMatch = 0; */

  /*   "dringlich_titel": "L. Dringlichkeitsantrag der ÖVP-Fraktion betreffend Drogen-Gesamtstrategie und -Aktionsplan für Linz",
    "dringlich_berichterstatter": "Berichterstatter: GR Mag.Martin Hajart (ÖVP)",
    "dringlich_ergebnisdetail": "Der Antrag wurde mehrstimmig abgelehnt.\nStimmenthaltung: SPÖ, FPÖ, KPÖ",
    "dringlich_wortprotokoll": "Wortprotokoll zu L",
    "dringlich_wortprotokoll-href": "https://www.linz.at/Politik/GRSitzungen/GPSearch/ResultDetail?TopId=2082" */

  data.forEach((item) => {
    let singleIssue = false;
    if (!item.antrag_berichterstatter || !item.antrag_ergebnisdetail) {
      if (
        item.dringlich_titel &&
        item.dringlich_ergebnisdetail &&
        item.dringlich_berichterstatter
      ) {
        singleIssue = true;
      } else {
        return;
      }
    }

    let motion = new GeneralMotion();
    if (singleIssue === false) {
      motionData = {
        titleInfo: [
          ...item.antrag_titel.matchAll(
            /^(?<agendaItem>[A-Z])(?<index>[0-9]+)\.\s(?<value>(.|\n)+)/gm
          ),
        ][0],
        submitter: item.antrag_berichterstatter.substr(
          1,
          item.antrag_berichterstatter.length - 2
        ),
        resultArray: item.antrag_ergebnisdetail.split("\n"),
      };
      if (item["wortprotokoll-href"]) {
        motionData.url = item["wortprotokoll-href"];
      }
    } else {
      //console.log(item);
      motionData = {
        titleInfo: [
          ...item.dringlich_titel.matchAll(
            /^(?<agendaItem>[A-Z])(?<index>[0-9]+)?\.\s(?<value>(.|\n)+)/gm
          ),
        ][0],
        submitter: item.dringlich_berichterstatter.match(/S?K?F?PÖ|Die Grünen|ÖVP|NEOS|Grüne/gm)
          ? item.dringlich_berichterstatter.match(/S?K?F?PÖ|Die Grünen|ÖVP|NEOS|Grüne/gm)[0]
          : "",
        resultArray: item.dringlich_ergebnisdetail.split("\n"),
      };
      if (item["dringlich_wortprotokoll-href"]) {
        motionData.url = item["dringlich_wortprotokoll-href"];
      }
    }
    const meetingNo = item.sitzung.match(/^\d+/gm)[0];
    motion.title = motionData.titleInfo.groups.value;
    motion.agendaItem = motionData.titleInfo.groups.agendaItem;
    motion.index = parseInt(motionData.titleInfo.groups.index);
    const id = meetingNo.toString()+motion.agendaItem+motionData.titleInfo.groups.index;
    if(motionData.submitter == "Grüne") motionData.submitter = "Die Grünen";
    motion.submitter = motionData.submitter;
    if (motionData.url) {
      motion.url = motionData.url;
    } else {
      motion.url = item["web-scraper-start-url"];
    }

    //welcome to hell, first split result in sentences
    //const resultArray = item.antrag_ergebnisdetail.split("\n");
    //results.push(resultArray);

    motion.analyze(motionData.resultArray);

    
    meetings[meetingNo].motions[id] =  motion;
  });
  /*   console.log("Could not interpret result: " + fail);
  console.log("Unmatched sentences: " + noMatch); */
}

const outputString = JSON.stringify(meetings);

// write file to disk
fs.writeFile("./gr-results.json", outputString, "utf8", (err) => {
  if (err) {
    console.log(`Error writing file: ${err}`);
  } else {
    console.log(`File is written successfully!`);
  }
});
