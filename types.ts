export interface VoteResult {
  subject: string;
  meta?: string;
  pro?: (string | string[])[];
  withheld?: (string | string[])[];
  contra?: (string | string[])[];
}

export interface DataItem {
  "web-scraper-order": string;
  "web-scraper-start-url": string;
  antrag_titel: string;
  antrag_ergebnisdetail: string;
  antrag_berichterstatter: string;
  wortprotokoll: string;
  "wortprotokoll-href": string;
  sitzung: string;
  tagesordnung: string;
  dringlich_titel: string;
  dringlich_berichterstatter: string;
  dringlich_ergebnisdetail: string;
  dringlich_wortprotokoll: string;
  "dringlich_wortprotokoll-href": string;
}

export class Motion {
  title: string;
  submitter: string;
  url: string;
  id: string;
  meta: { date: Date; agendaText: string; meetingUrl: string, meetingNo: number, index: number, agendaItem: string};
  votes: VoteResult[];
}