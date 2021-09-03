<script lang="ts">
	import Segment from './segment.svelte';
	import { getPartyFacts } from '$lib/partyfacts';
	import proSVG from './static/pro.svg';
	import contraSVG from './static/contra.svg';

	export let parties: (string | string[] | (string | number)[])[];
	export let type = 'pro';

	const meta = {
		pro: { text: 'Stimmen dafür: ', bg: proSVG },
		contra: { text: 'Gegenstimmen: ', bg: contraSVG },
		withheld: { text: 'Enthaltungen: ', bg: contraSVG }
	};

	let segments, offset;

	$: if (parties) {
		segments = [];
		offset = 25;
		for (let party of parties) {
			const { color, percent } = getPartyFacts(party);
			segments.push({
				color: color,
				percent: percent,
				offset: offset
			});
			offset -= percent;
		}
	}

	//filter.update(()=>[type, parties]
</script>

<svg viewBox="0 0 42 42" width="100%" height="100%">
	{#if parties && parties.length > 0}
		<title>{meta[type].text + parties.join()}</title>
	{/if}
		<clipPath id="clip-path-circle">
			<circle cx="21" cy="21" r="17" />
		</clipPath>
	<image width="90%" height="90%" x="5%" y="5%" href={meta[type].bg} />
	{#if type === 'withheld'}
		<image
			width="90%"
			height="90%"
			x="5%"
			y="5%"
			transform="rotate(90, 21,21)"
			href={meta[type].bg}
		/>
	{/if}
	<g clip-path="url(#clip-path-circle)">
		{#if parties && parties.length > 0}
			{#each segments as segment}
				<Segment percent={segment['percent']} color={segment['color']} offset={segment['offset']} />
			{/each}
		{/if}
	</g>
</svg>

<style>
	svg {
		position: absolute;
		z-index: 30;
	}
</style>
