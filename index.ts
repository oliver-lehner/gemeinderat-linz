import * as fs from "fs";
import * as json from "./repair.json";
import { Meeting, MotionMaker } from "./grClasses";

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

function makeMotions() {
  const maker = new MotionMaker();

  data.forEach((item) => {
    const titleInfo = [
      ...item.antrag_titel.matchAll(
        /^(?<agendaItem>[A-Z])(?<index>[0-9]+)\.\s(?<value>(.|\n)+)/gm
      ),
    ][0];
    if (titleInfo) {
      const meetingNo = item.sitzung.match(/^\d+/gm)[0];
      if (parseInt(meetingNo) > 51) return; //scraped data includes one meeting from period before
      const id =
        meetingNo + titleInfo.groups.agendaItem + titleInfo.groups.index;
      const motion = maker.make(item);

      if (motion != undefined) {
        meetings[meetingNo].addMotion(id, motion);
      }
    }
  });
}

function sortMotions() {
  for (let meeting in Object.entries(meetings)) {
    if (meetings[meeting] !== undefined) {
      const sortedData = Object.entries(meetings[meeting].motions).sort(
        (a, b) => {
          const matchA = [...a[0].matchAll(/([A-Z])(\d+)$/gm)];
          const matchB = [...b[0].matchAll(/([A-Z])(\d+)$/gm)];
          const score =
            matchA[0][1].charCodeAt(0) * 100 + //100 is quite arbitrary, but without weighing the charcode, A1 and B1 would only be 1 apart
            parseInt(matchA[0][2]) -
            (matchB[0][1].charCodeAt(0) * 100 + parseInt(matchB[0][2]));
          return score;
        }
      );
      //sortedData looks like this: [['id',{obj}]]
      const unwrappedData = new Object();
      //but I want ['id':{obj}]
      sortedData.forEach((value) => (unwrappedData[value[0]] = value[1]));
      meetings[meeting].motions = unwrappedData;
    }
  }
}



setupMeetings();
makeMotions();
sortMotions();

const outputString = JSON.stringify(meetings);

fs.writeFile("./gr-results.json", outputString, "utf8", (err) => {
  if (err) {
    console.log(`Error writing file: ${err}`);
  } else {
    console.log(`File is written successfully!`);
  }
});


