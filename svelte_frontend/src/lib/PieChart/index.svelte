<script lang="ts">
	import Pie from './pie.svelte';
	import { getPartyFacts } from '$lib/partyfacts';
	import type { VoteResult } from '$lib/types';

	export let vote: VoteResult, submitter: string;

	$: chartColor = getPartyFacts(submitter).color || '--accent-color';

	$: ({ contra, withheld, pro } = vote);

	
</script>

<div class="chart" style={`background-color: var(${chartColor})`}>
	{#if vote}
		<div class="pie-container pro">
			<Pie parties={pro || undefined} type={'pro'} />
		</div>
		<div class="pie-container contra">
			<Pie parties={contra || undefined} type={'contra'} />
		</div>
		<div class="pie-container wh">
			<Pie parties={withheld || undefined} type={'withheld'} />
		</div>
	{/if}
</div>

<style>
	.chart {
		padding: 0.1em;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 0.86fr 0.14fr 0.86fr;
		gap: 0em 0.1em;
		grid-auto-flow: row;
		grid-area: 1 /1 /1 /1;
		width: 100%;
		height: 100%;
	}

	.wh {
		grid-area: 2 / 1 / 4 / 3;
	}

	.pro {
		grid-area: 1 / 2 / 3 / 4;
	}

	.contra {
		grid-area: 2 / 3 / 4 / 5;
	}

	.pie-container {
		position: relative;
		overflow: hidden;
	}
</style>
