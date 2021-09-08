import { writable, derived } from 'svelte/store';
import data from '../../../node_offline_backend/gr-data.json';
import type { Motion } from '$lib/types';

export let displayData = writable(data as Motion[]);

export let displayDataItems = derived(displayData, ($displayData) => {
	return [...Array(Math.ceil($displayData.length / 12)).keys()];
});

export let filter = writable({ side: '', parties: []});

function filterByVotes(motions: Motion[], filter: { side: string; parties: string[] }): Motion[] {
	if (!filter) return motions;
	const result = motions.filter((motion) => {
		return motion.votes.some((vote) => {
			if (vote[filter.side]) {
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

export function resetDisplayData() {
	displayData.set(data as Motion[]);
}
