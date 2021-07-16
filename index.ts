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
      const id =
        meetingNo.toString() +
        titleInfo.groups.agendaItem +
        titleInfo.groups.index;

      let motion = maker.make(item);
      meetings[meetingNo].addMotion(id, motion);
    } else {
    }
  });
}

setupMeetings();
makeMotions();

const outputString = JSON.stringify(meetings);

fs.writeFile("./gr-results.json", outputString, "utf8", (err) => {
  if (err) {
    console.log(`Error writing file: ${err}`);
  } else {
    console.log(`File is written successfully!`);
  }
});
