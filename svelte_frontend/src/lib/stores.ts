import { writable, derived } from 'svelte/store';
import data from '../../../node_offline_backend/gr-data.json';
import type { Motion } from '$lib/types';
import Fuse from 'fuse.js';

//export let displayData = writable(data as Motion[]);
export let searchTerm = writable('');

const options = {
	// isCaseSensitive: false,
	// includeScore: false,
	// shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	minMatchCharLength: 3,
	// location: 0,
	threshold: 0.3,
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

const fuse = new Fuse(data as Motion[], options);

export let displayData = derived(searchTerm, ($searchTerm) => {
	if ($searchTerm && $searchTerm.length > 0) {
		return fuse.search($searchTerm).map((value) => value.item);
	} else {
		return data as Motion[];
	}
});

export let displayDataItems = derived(displayData, ($displayData) => {
	return [...Array(Math.ceil($displayData.length / 12)).keys()];
});

export let filter = writable({ side: '', parties: [], excludeUnisono: true });

function filterByVotes(motions: Motion[], filter: { side: string; parties: string[], excludeUnisono: boolean }): Motion[] {
	if (!filter || filter.side === 'none') return motions;
	const result = motions.filter((motion) => {
		return motion.votes.some((vote) => {
			if (vote[filter.side]) {
				if(filter.excludeUnisono && vote[filter.side].length == 6) return false;
				return filter.parties.every((party) => {
					return vote[filter.side].includes(party);
				});
			}
		});
	});
	console.log(result);
	return result;
}

export let filteredData = derived([displayData, filter], ([$displayData, $filter]) => {
	return filterByVotes($displayData, $filter);
});

export let filteredDataItems = derived(filteredData, ($filteredData) => {
	return [...Array(Math.ceil($filteredData.length / 12)).keys()];
});

export let filteredDataCount = derived(filteredData, ($filteredData) => {
	return $filteredData.length;
});

/* export function resetDisplayData() {
	displayData.set(data as Motion[]);
} */
