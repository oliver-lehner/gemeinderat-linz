<script lang="ts">
	import Pie from './pie.svelte';
	import { getPartyFacts } from '$lib/partyfacts';
	import type { VoteResult } from '$lib/types';
	import { debug } from 'svelte/internal';
	import { get } from 'svelte/store';

	export let vote: VoteResult, submitter: string;

	$: chartColor = getPartyFacts(submitter).color || '--accent-color';

	$: ({ contra, withheld } = vote);

	$: pro = ['SPÖ', 'FPÖ', 'ÖVP', 'Die Grünen', 'NEOS', 'KPÖ']
		//this function was 3 lines long before NEOS and their splits came along
		/* 	
		if(Array.isArray(value)){
			return !(contra && contra.includes(value[0]) || withheld && withheld.includes(value[0]));
		}
		return !(contra && contra.includes(value) || withheld && withheld.includes(value));
 		*/
		.map((party) => {
			const contraIdx = contra
				? contra.findIndex((cParty) =>
						Array.isArray(cParty) ? cParty[0] == party : cParty == party
				  )
				: undefined;
			const withheldIdx = withheld
				? withheld.findIndex((wParty) =>
						Array.isArray(wParty) ? wParty[0] == party : wParty == party
				  )
				: undefined;
			let proCount = getPartyFacts(party).delegates;
			if (contraIdx >= 0 && Array.isArray(contra[contraIdx])) {
				proCount -=
					contra.reduce(
						(accumulator, currentValue) => accumulator + (Array.isArray(currentValue) ? 1 : 0),
						0
					);
			} else if (contraIdx >= 0) {
				return undefined;
			}
			if (withheldIdx >= 0 && Array.isArray(withheld[withheldIdx])) {
				proCount -=
					withheld.reduce(
						(accumulator, currentValue) => accumulator + (Array.isArray(currentValue) ? 1 : 0),
						0
					);
			} else if (withheldIdx >= 0) {
				return undefined;
			}
			if (proCount < getPartyFacts(party).delegates) return [party, proCount];
			return party;
		})
		.filter((value) => value != undefined);
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
