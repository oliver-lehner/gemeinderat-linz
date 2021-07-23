import * as fs from "fs";
import * as json from "./repair.json";
import { MotionMaker } from "./grClasses";

let output = [];
const agendas = {};
const data = json["result"];

function makeMotions() {
  const maker = new MotionMaker();

  data.forEach((item) => {
    const titleInfo = [
      ...item.antrag_titel.matchAll(
        /^(?<agendaItem>[A-Z])(?<index>[0-9]+)\.\s(?<value>(.|\n)+)/gm
      ),
    ][0];
    if (titleInfo) {
      const dateRxMatches = [
        ...item.sitzung.matchAll(
          /(\d+)\.(?:\sGemeinderatssitzung\sam\s)(\d+)\.(\d+)\.(\d{4})(?:\sum\s)(\d+)/gm
        ),
      ];
      if (!dateRxMatches[0]) {
        let debug = true;
        debug;
      }
      let meetingNo:number = Array.isArray(dateRxMatches[0]) ? parseInt(dateRxMatches[0][1]) : 0;

      let date = new Date(
        parseInt(dateRxMatches[0][4]),
        parseInt(dateRxMatches[0][3]),
        parseInt(dateRxMatches[0][2]),
        parseInt(dateRxMatches[0][5]),
        0,
        0,
        0
      );
      let meetingUrl = item["web-scraper-start-url"];

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
      agendas[meetingNo] = agenda;

      if (meetingNo > 51) return; //scraped data includes one meeting from period before
      const id =
        meetingNo + titleInfo.groups.agendaItem + titleInfo.groups.index;
      const motion = maker.make(item);

      if (motion != undefined) {
        motion.id = id;
        motion.meetingUrl = meetingUrl;
        motion.meetingNo = meetingNo;
        motion.agendaText = agendas[meetingNo][titleInfo.groups.agendaItem];
        motion.date = date;
        output.push(motion);
      }
    }
  });
}

makeMotions();

const sorted = output.sort((a, b) => {
  const calcScore = (val) =>
    val.meetingNo * (val.agendaItem.charCodeAt(0) * 100 + val.index);
  const score = calcScore(a) - calcScore(b);
  return score;
});

const outputString = JSON.stringify(sorted);

fs.writeFile("./gr-results.json", outputString, "utf8", (err) => {
  if (err) {
    console.log(`Error writing file: ${err}`);
  } else {
    console.log(`File is written successfully!`);
  }
});
