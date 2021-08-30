<script lang="ts">
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { displayData, displayDataItems } from '$lib/stores';

	import Card from '$lib/Card/index.svelte';

	let start: number, end: number;
</script>

{#if $displayData}
	<div class="h-screen">
    <VirtualList items={$displayDataItems} let:item bind:start bind:end>
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 mb-2">
        {#each Array(12) as _, i}
          {#if $displayData[item * 12 + i]}
            <Card motion={$displayData[item * 12 + i]} />
          {/if}
        {/each}
      </div>
    </VirtualList>
	</div>
{/if}

