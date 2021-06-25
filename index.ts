import * as fs from "fs";
import * as json from "./grsitzungen.json";
import {
  Meeting,
  GeneralMotion,
  // Addendum,
  // Change,
  // Forward,
  // ExtraMotion,
} from "./grClasses";
const meetings = {};
const data = json["result"];
const results = [];

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
/*   let fail = 0;
  let noMatch = 0; */
  
  data.forEach((item) => {
    if (!item.antrag_berichterstatter || !item.antrag_ergebnisdetail) return;
    let motion = new GeneralMotion();
    motion.title = item.antrag_titel.replace("\n", " ");
    motion.submitter = item.antrag_berichterstatter.substr(
      1,
      item.antrag_berichterstatter.length - 2
    );
    if (item["wortprotokoll-href"]) {
      motion.url = item["wortprotokoll-href"];
    } else {
      motion.url = item["web-scraper-start-url"];
    }

    //welcome to hell, first split result in sentences
    const resultArray = item.antrag_ergebnisdetail.split("\n");
    results.push(resultArray);
    //to interpret multiline results, analyze sentence type beforehand
    
    //motion.analyze(resultArray);

/*     if (resultArray.length != motion.sentenceTypes.length) {
      fail++;
      console.log(resultArray);
      console.log(motion.sentenceTypes);
      console.log("-------------------");
    } */
    const meetingNo = item.sitzung.match(/^\d+/gm)[0];
    meetings[meetingNo].motions.push(motion);
  });
/*   console.log("Could not interpret result: " + fail);
  console.log("Unmatched sentences: " + noMatch); */
}

const outputString = JSON.stringify(results);

// write file to disk
fs.writeFile("./gr-results.json", outputString, "utf8", (err) => {
  if (err) {
    console.log(`Error writing file: ${err}`);
  } else {
    console.log(`File is written successfully!`);
  }
});
