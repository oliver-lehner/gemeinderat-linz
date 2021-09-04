<script lang="ts">
	import { goto, prefetch } from '$app/navigation';
	import { page } from '$app/stores';
	import SearchIcon from './searchicon.svelte';

	let searchTerm = $page.query.get('search') ?? '';

	$: console.log(searchTerm);
</script>

<form
	class="flex text-l"
	on:submit|preventDefault={() => {
		prefetch('/motions?search=' + searchTerm).then(() => {
			goto('/motions?search=' + searchTerm);
		});
	}}
>
	<div
		class="pt-1 px-1 border-b-2 font-bold text-pink-200 focus-within:text-gray-700 focus-within:bg-gray-200 focus-within:rounded focus-within:shadow-inner"
	>
		<input class="bg-transparent outline-none" bind:value={searchTerm} />
		<button
			type="button"
			class="text-2xl leading-3 text-red-500 {searchTerm.length == 0 ? 'invisible' : ''}"
			on:click={() => {
				searchTerm = '';
				goto('/motions');
			}}>×</button
		>
	</div>
	<button
		type="submit"
		class="ml-2 px-2 hover:text-gray-700 text-gray-100 bg-green-500 hover:bg-green-300 hover:ring-green-200 hover:ring-2
		 rounded inline-flex gap-2 items-center "><SearchIcon />Suchen</button
	>
</form>
