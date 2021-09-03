<script lang="ts">
	import { goto, prefetch } from '$app/navigation';
	import { page } from '$app/stores';
	import SearchIcon from './searchicon.svelte';

	let searchTerm = $page.query.get("search") ?? '';
</script>

<div class="flex flex-row items-center content-between text-gray-100">
	<SearchIcon />
	<div
		class="px-1 ml-2 mr-1 flex-grow-0 focus-within:rounded focus-within:bg-gray-300  focus-within:text-gray-700 focus-within:shadow-md"
	>
		<form
			on:submit|preventDefault={() => {
				prefetch('/motions?search='+searchTerm).then(() => {
					goto('/motions?search='+searchTerm);
				});
			}}
		>
			<div class="flex w-full group focus:rounded">
				<input class=" bg-transparent border-b-2 outline-none text-l" bind:value={searchTerm} />
				<button
					type="submit"
					class="text-sm ring-1 bg-green-300 invisible group-focus:visible rounded">Suchen</button
				>
			</div>
		</form>
	</div>

	<button
		class="text-2xl leading-3 text-red-500 {searchTerm.length == 0 ? 'invisible' : ''}"
		on:click={() => {
			searchTerm = '';
			goto('/motions');
		}}>×</button
	>
</div>
