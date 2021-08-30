import Fuse from 'fuse.js';
import { displayData } from '$lib/stores';
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
	// minMatchCharLength: 1,
	// location: 0,
	threshold: 0.4,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	keys: ['title', 'submitter', 'meta.agendaText']
};

const fuse = new Fuse(data, options);

export function search(term: string) {
	const result = fuse.search(term);
	displayData.update(()=> result.map(value => value.item))
}
