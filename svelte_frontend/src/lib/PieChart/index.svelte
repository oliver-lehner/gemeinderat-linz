<script lang="ts">
	import Pie from './pie.svelte';
	import { getColor } from '$lib/partyfacts';

	export let votes, submitter: string;

	$: chartColor = getColor(submitter) || '--accent-color';

	$: ({ pro, contra, withheld } = votes || {});
</script>

	<div class="chart" style={`background-color: var(${chartColor})`}>
		{#if votes}
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
		width: 20vw;
		height: 18.6vw;
		max-height: 9.3rem;
		max-width: 10rem;
		padding: 0.3rem;
		border-radius: 2vw;
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
