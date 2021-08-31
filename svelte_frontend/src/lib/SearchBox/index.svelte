<script lang="ts">
	import { search, reset } from '$lib/search';
	import SearchIcon from './searchicon.svelte';

	let searchTerm = '';
	$: search(searchTerm);
	$: if (searchTerm.length == 0) {
		reset();
	}

</script>

<div class="flex flex-row items-center content-between text-pink-100">
	<SearchIcon />
	<div
		class="px-1 mr-1 flex-grow-0 focus-within:rounded focus-within:bg-gray-300  focus-within:text-gray-700"
	>
		<input
			class="w-full border-b-2 focus:rounded bg-transparent outline-none text-l"
			bind:value={searchTerm}
		/>
	</div>
		<button
			class="text-2xl leading-3 text-red-500 {searchTerm.length == 0 ? "invisible" : ""}"
			on:click={() => {
				searchTerm = '';
			}}>×</button
		>
</div>
