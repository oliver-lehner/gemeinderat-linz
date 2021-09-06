import Fuse from 'fuse.js';
import { displayData, resetDisplayData } from '$lib/stores';
import type { Motion } from '$lib/types';

let data: Motion[];

const unsubscribe = displayData.subscribe((value) => {
	data = value;
});

const options = {
	// isCaseSensitive: false,
	// includeScore: false,
	// shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	minMatchCharLength: 3,
	// location: 0,
	threshold: 0.4,
	// distance: 100,
	// useExtendedSearch: false,
	ignoreLocation: true,
	// ignoreFieldNorm: false,
	keys: [
		{
			name: 'title',
			weight: 6
		},
		{
			name: 'submitter',
			weight: 3
		},
		{
			name: 'meta.agendaText',
			weight: 5
		}
	]
};

const fuse = new Fuse(data, options);

export function search(term: string) {
	if (term && term.length > 0) {
		const result = fuse.search(term).map((value) => value.item);
		displayData.update(() => result);
	} else {
		resetDisplayData();
	}
}

export function reset() {
	resetDisplayData();
}
