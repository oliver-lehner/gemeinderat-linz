const partyFacts = {
	SPÖ: { color: '--spoe-color', percent: 32.79, delegates: 20 },
	FPÖ: { color: '--fpoe-color', percent: 26.23, delegates: 16 },
	ÖVP: { color: '--oevp-color', percent: 19.67, delegates: 12 },
	'Die Grünen': { color: '--gruen-color', percent: 14.75, delegates: 9 },
	NEOS: { color: '--neos-color', percent: 4.92, delegates: 3 },
	KPÖ: { color: '--kpoe-color', percent: 1.64, delegates: 1 }
};

export function getPartyFacts(
	party: string | string[] | (string | number)[]
): { color: string; percent: number; delegates: number } {
	let singleDelegatePercent;
	if (Array.isArray(party)) {
		party = typeof party[0] == 'string' ? party[0] : undefined;
		singleDelegatePercent = partyFacts[party].percent / partyFacts[party].delegates;
	}
	if(singleDelegatePercent){
		const {color} = partyFacts[party];
		return {color: color, percent: singleDelegatePercent, delegates: 1}
	}
	if (party && (partyFacts[party] || partyFacts[(party = party.toUpperCase())])) {
		return partyFacts[party];
	} else {
		return undefined;
	}
}
