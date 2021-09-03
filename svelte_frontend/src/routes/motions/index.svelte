<script context="module" lang="ts">
	import { search } from '$lib/search';
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		if (page.query.has('search')) search(page.query.get('search'));
    console.log("load")
    return {}
	}

</script>

<script lang="ts">
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { displayData, displayDataItems } from '$lib/stores';

	import Card from '$lib/Card/index.svelte';

	let start: number, end: number;
</script>

{#if $displayData}
	<VirtualList items={$displayDataItems} let:item bind:start bind:end>
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 sm:p-2">
			{#each Array(12) as _, i}
				{#if $displayData[item * 12 + i]}
					<Card motion={$displayData[item * 12 + i]} />
				{/if}
			{/each}
		</div>
	</VirtualList>
{/if}
