<script lang="ts">
	import SearchBox from '$lib/SearchBox/index.svelte';
	import Menu from '$lib/Menu/index.svelte';
	import FilterBuilder from '$lib/FilterBuilder.svelte';

	let filterVisible = false,
		filterActive = false;
</script>

<div class="w-full flex flex-col px-4 py-2 bg-gray-600">
	<a sveltekit:prefetch href="/"><h1 class="drop-shadow-md">Linzer Gemeinderat in Torten</h1></a>
	<div class="flex flex-col items-baseline sm:flex-row gap-x-2">
		<Menu />
		<SearchBox />
		<button on:click={() => filterVisible = !filterVisible}>Filter</button>
	</div>
</div>

<div class="absolute z-50 bg-gray-700 {filterVisible ? '' : 'hidden'}">
	<FilterBuilder />
</div>
