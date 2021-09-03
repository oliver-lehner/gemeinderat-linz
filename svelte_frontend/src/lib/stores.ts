import { writable, derived } from 'svelte/store';
import data from '../../../node_offline_backend/gr-results.json';
import type { Motion } from '$lib/types';

export let displayData = writable(data as Motion[]);
export let searchTerm = writable<string>();

export let displayDataItems = derived(displayData, ($displayData) => {
	return [...Array(Math.ceil($displayData.length / 12)).keys()];
});

export let searchResults = derived([displayData, searchTerm], ([$displayData, $searchTerm]) => {
	
});

export function resetDisplayData() {
	displayData.set(data);
}
