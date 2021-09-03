<script lang="ts">
	import SearchBox from '$lib/SearchBox/index.svelte';
	import Menu from '$lib/Menu/index.svelte';
</script>

<div class="w-full flex flex-col px-4 py-2 fixed top-0 z-50 bg-gray-600">
		<a sveltekit:prefetch href="/"><h1>Linzer Gemeinderat 2015-2021</h1></a>
	<div class="flex flex-col sm:flex-row gap-2">
		<Menu />
		<SearchBox />	
	</div>
</div>
