const partyFacts = {
	SPÖ: { color: '--spoe-color', percent: 32.79 },
	FPÖ: { color: '--fpoe-color', percent: 26.23 },
	ÖVP: { color: '--oevp-color', percent: 19.67 },
	'Die Grünen': { color: '--gruen-color', percent: 14.75 },
	NEOS: { color: '--neos-color', percent: 4.92 },
	KPÖ: { color: '--kpoe-color', percent: 1.64 }
};

export function getColor(party: string): string {
	if (party && (partyFacts[party] || partyFacts[(party = party.toUpperCase())])) {
		return partyFacts[party].color;
	} else if (party && party.includes('Grün')) {
		return partyFacts['Die Grünen'].color;
	} else {
		return undefined;
	}
}

export function getPercent(party: string): number {
	if (party && (partyFacts[party] || partyFacts[(party = party.toUpperCase())])) {
		return partyFacts[party].percent;
	} else if (party && party.includes('Grün')) {
		return partyFacts['Die Grünen'].percent;
	} else {
		return undefined;
	}
}
