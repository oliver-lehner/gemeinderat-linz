<script lang="ts">
	import PieChart from '$lib/PieChart/index.svelte';
	import type { VoteResult } from '../../../../node_offline_backend/types';
	export let vote: VoteResult, submitter: string;
</script>

{#if vote}
	<div class="w-full p-2 flex flex-col items-center bg-gray-200 shadow-inner border-4 border-white">
		<h3 class="line-clamp-2 leading-5 h-10 mb-1 overflow-hidden">{vote.subject}</h3>
		<div class="w-28 h-28 md:w-36 md:h-36 border-2 border-white shadow-md relative">
			<PieChart {vote} {submitter} />
			<div class="absolute inset-0 z-10 bg-transparent shadow-inner" />
		</div>
		{#each vote.meta as metaInfo}
			<div
				class="{metaInfo.includes('angenommen') || metaInfo.includes('zugewiesen')
					? 'bg-green-500'
					: metaInfo.includes('abgelehnt')
					? 'bg-red-500'
					: 'bg-gray-500'} w-full rounded p-2 shadow-md mt-2"
			>
				<p class="text-sm text-white">{metaInfo}</p>
			</div>
		{/each}
	</div>
{/if}
