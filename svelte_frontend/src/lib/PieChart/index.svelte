<script lang="ts">
	import Pie from './pie.svelte';
	import { getColor } from '$lib/partyfacts';
	import type { VoteResult } from '$lib/types';

	export let vote: VoteResult, submitter: string;

	$: chartColor = getColor(submitter) || '--accent-color';

	$: ({ contra, withheld } = vote);
	$: pro = ['SPÖ', 'FPÖ', 'ÖVP', 'Die Grünen', 'NEOS', 'KPÖ'].filter((value) => {
		return !(contra && contra.includes(value) || withheld && withheld.includes(value));
	});
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
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 0.86fr 0.14fr 0.86fr;
		gap: 0px 0px;
		grid-auto-flow: row;
		grid-area: 1 /1 /1 /1;
		width: 100%;
		height:100%;
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
