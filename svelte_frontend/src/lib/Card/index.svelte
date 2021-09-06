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

	function getTextColorForAgendaItem(item: string): string {
		const colors = [
			'bg-rose-300',
			'bg-pink-300',
			'bg-purple-300',
			'bg-indigo-300',
			'bg-blue-300',
			'bg-sky-300',
			'bg-cyan-300',
			'bg-teal-300',
			'bg-emerald-300',
			'bg-green-300',
			'bg-lime-300',
			'bg-yellow-300',
			'bg-amber-300',
			'bg-orange-300',
			'bg-red-300'
		];
		const idx = item.charCodeAt(0);
		return colors[idx - 66];
	}
</script>

{#if motion}
	<div
		class="m-1 p-2 sm:m-2 sm:p-4 flex flex-col bg-gray-700 ring-1 ring-gray-300 rounded shadow-lg
			{expanded ? 'row-span-2' : ''}"
	>
		<div
			class="bg-gray-300 text-gray-700 -mx-2 -mt-2 sm:-mx-4 sm:-mt-4 sm:h-10 text-sm leading-4 rounded-t flex flex-col sm:flex-row shadow-md hyphens-auto"
		>
			<div class="w-1/3 pl-2 sm:pl-4  whitespace-nowrap sm:whitespace-normal">
				<p class="text-currentcolor">
					{`#${motion.meta.meetingNo}`}
					{`${new Date(motion.meta.date).toLocaleDateString('de-AT')} `}
				</p>
			</div>
			<div class="sm:w-2/3 pr-4 pl-1 py-0 {getTextColorForAgendaItem(motion.meta.agendaItem)}">
				<p class="line-clamp-2 text-gray-600 ">{motion.meta.agendaText}</p>
			</div>
		</div>
		<div class="sm:line-clamp-6 sm:h-24 my-4 sm:my-2">
			<a href={buildUrl(motion.url)} target="_blank"
				><h2 class="hover:text-blue-200 active:text-blue-300 hyphens-auto">{motion.title}</h2></a
			>
		</div>
		<div class="relative {expanded ? 'grid grid-cols-1 gap-2' : ''}">
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
					class="w-full h-8 z-10 hover:border-gray-300 border-green-500 border-4 border-double text-2xl leading-5 inline-flex place-items-center"
					on:click={() => {
						expanded = !expanded;
					}}
				>
					<p class="flex-1 pb-1 text-green-500 {expanded ? 'rotate-45' : ''}">+</p>
				</button>
			{/if}
		</div>
	</div>
{/if}
