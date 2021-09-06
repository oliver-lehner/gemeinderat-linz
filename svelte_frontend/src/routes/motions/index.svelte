<script lang="ts">
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { displayData, displayDataItems } from '$lib/stores';
	import { page } from '$app/stores';
	import { search } from '$lib/search';
	import Card from '$lib/Card/index.svelte';

	let start: number;
	$: search($page.query.get('search'));
</script>

{#if $displayData && $displayData.length > 0}
	<VirtualList items={$displayDataItems} let:item bind:start>
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-2">
			{#each Array(12) as _, i}
				{#if $displayData[item * 12 + i]}
					<Card motion={$displayData[item * 12 + i]} />
				{/if}
			{/each}
		</div>
	</VirtualList>
{:else}
	<h1 class="mt-48">Leider konnten zu deiner Anfrage keine Anträge gefunden werden.</h1>
{/if}
