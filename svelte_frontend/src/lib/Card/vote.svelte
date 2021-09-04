<script lang="ts">
	import PieChart from '$lib/PieChart/index.svelte';
	import type { VoteResult } from '../../../../node_offline_backend/types';
	export let vote: VoteResult, submitter: string;
</script>

{#if vote}
	<div
		class="w-full p-2 grid gap-1 grid-cols-3 sm:grid-cols-1 sm:justify-items-center bg-gray-200 shadow-inner border-4 border-white"
	>
		<div
			class="h-24 w-24 sm:w-36 sm:h-36 border-2 row-span-2 border-white shadow-md relative justify-self-center sm:justify-self-start"
		>
			<PieChart {vote} {submitter} />
			<div class="absolute inset-0 z-10 bg-transparent shadow-inner" />
		</div>
		<h3 class="line-clamp-2 col-span-2 leading-5 h-10 ml-2 mb-1 overflow-hidden text-gray-700">{vote.subject}</h3>
		{#each vote.meta as metaInfo}
			<div
				class="{metaInfo.includes('angenommen') || metaInfo.includes('zugewiesen')
					? 'bg-green-500'
					: metaInfo.includes('abgelehnt')
					? 'bg-red-500'
					: 'bg-gray-500'} w-full rounded sm:ml-0 p-2 col-start-2 col-span-2 ml-2 sm:col-start-1 shadow-md sm:mt-2 order-2 "
			>
				<p class="text-sm text-white hyphens-auto">{metaInfo}</p>
			</div>
		{/each}
	</div>
{/if}
