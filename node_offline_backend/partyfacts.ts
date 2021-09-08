const partyFacts = {
	SPÖ: { color: '--spoe-color', percent: 32.79, delegates: 20 },
	FPÖ: { color: '--fpoe-color', percent: 26.23, delegates: 16 },
	ÖVP: { color: '--oevp-color', percent: 19.67, delegates: 12 },
	'Die Grünen': { color: '--gruen-color', percent: 14.75, delegates: 9 },
	NEOS: { color: '--neos-color', percent: 4.92, delegates: 3 },
	KPÖ: { color: '--kpoe-color', percent: 1.64, delegates: 1 }
};

export function getPartyNames(){
	return Object.keys(partyFacts);
}

export function getPartyFacts(
	party: string | string[] | (string | number)[]
): { color: string; percent: number; delegates: number } {
	let delegateCount, singleDelegatePercent, partyIndex;
	if (Array.isArray(party)) {
		partyIndex = typeof party[0] == 'string' ? party[0] : undefined;
		delegateCount =
			typeof party[1] == 'string' ? 1 : typeof party[1] == 'number' ? party[1] : undefined;
		singleDelegatePercent = partyFacts[partyIndex].percent / partyFacts[partyIndex].delegates;
	} else {
		partyIndex = party;
	}
	if (delegateCount) {
		const { color } = partyFacts[partyIndex];
		return { color: color, percent: delegateCount * singleDelegatePercent, delegates: delegateCount };
	}
	if (partyIndex && (partyFacts[partyIndex] || partyFacts[(partyIndex = partyIndex.toUpperCase())])) {
		return partyFacts[partyIndex];
	} else {
		return undefined;
	}
}
