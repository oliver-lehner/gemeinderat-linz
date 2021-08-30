<script lang="ts">
	import Vote from './vote.svelte';
	import type { Motion } from '$lib/types';
	import { fade, fly } from 'svelte/transition';

	export let motion: Motion;
	let charts: Element;
	let expanded = false;

	function buildUrl(id: string) {
		const urlWortprotokoll = 'https://www.linz.at/Politik/GRSitzungen/GPSearch/ResultDetail?';
		const urlSitzung = 'https://www.linz.at/Politik/GRSitzungen/GrSitzungen/GrDetail?';
		const urlAnfrage = 'https://www.linz.at/Politik/GRSitzungen/GrSitzungen/GetAnfrageAntrag?';

		if (id.includes('TopId')) {
			return urlWortprotokoll + id;
		} else if (id.includes('GrId')) {
			return urlSitzung + id;
		} else if (id.includes('AnfrageAntragId')) {
			return urlAnfrage + id;
		} else {
			return undefined;
		}
	}
</script>

<div
	class="m-4 p-4 flex flex-col  bg-gray-700 border-2 border-blue-200 shadow-lg
{expanded ? 'col-span-2' : ''}"
>
	<div class="line-clamp-4 h-28 mb-2">
		<a href={buildUrl(motion.url)}><h2 class="text-gray-200 font-semibold">{motion.title}</h2></a>
	</div>
	<div class="relative {expanded ? 'grid grid-cols-2 gap-2' : ''}">
		<Vote vote={motion.votes[0]} submitter={motion.submitter} />

		{#if expanded}
			{#each motion['votes'] as vote, index}
				{#if index > 0}
					<Vote {vote} submitter={motion.submitter} />
				{/if}
			{/each}
		{/if}
		{#if motion.votes.length > 1}
			<button
				class="absolute top-0 right-0 z-10 bg-gray-400 hover:bg-gray-300 rounded-full w-8 h-8 text-2xl leading-5 inline-flex place-items-center"
				on:click={() => {
					expanded = !expanded;
				}}
			>
				<p class="flex-1 pb-1 {expanded ? 'rotate-45' : ''}">+</p>
			</button>
		{/if}
	</div>
</div>

<style>

</style>
