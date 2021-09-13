<script lang="ts">
	import { page } from '$app/stores';
	import SearchBox from '$lib/SearchBox/index.svelte';
	import Menu from '$lib/Menu/index.svelte';
	import { filteredDataCount } from '$lib/stores';
	import FilterBuilder from '$lib/FilterBuilder.svelte';

	let filterVisible = false;
</script>

<header class="w-full flex flex-col px-4 py-1 sm:pt-2 bg-gray-600">
	<a sveltekit:prefetch href="/"><h1 class="drop-shadow-md text-base sm:text-lg">Linzer Torten</h1></a>
	<div class="flex flex-col items-baseline sm:flex-row gap-x-2">
		<Menu />
		<div class="flex flex-col items-end sm:flex-row gap-x-2 gap-y-1 sm:h-8">
			<SearchBox />
			<div class="{$page.path != '/motions' ? 'h-0 invisible' : 'h-6'} transition-all">
				<div class="flex items-baseline gap-2">
					<div class="text-gray-100 line-clamp-1 text-sm overflow-clip">
						{$filteredDataCount} Anträge
					</div>
					<button
						on:click={() => (filterVisible = !filterVisible)}
						class="bg-yellow-300 w-24 h-6 sm:h-auto rounded inline-flex justify-between items-center gap-2 text-gray-700 px-2 hover:bg-yellow-200 hover:ring-1 hover:ring-yellow-500"
						>Filter <div
							class="border-gray-700 border-b-2 border-l-2 h-2 w-2  {filterVisible
								? 'rotate-135 -mb-1 animate-pulse'
								: '-rotate-45 mb-1'}"
						/></button
					>
				</div>
				<div class="absolute z-50 {filterVisible ? 'opacity-95' : 'opacity-0'} transition-all">
					<FilterBuilder />
				</div>
			</div>
		</div>
	</div>
</header>
