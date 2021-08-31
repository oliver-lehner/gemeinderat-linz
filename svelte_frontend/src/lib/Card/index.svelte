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
			'text-rose-300',
			'text-pink-300',
			'text-purple-300',
			'text-indigo-300',
			'text-blue-300',
			'text-sky-300',
			'text-cyan-300',
			'text-teal-300',
			'text-emerald-300',
			'text-green-300',
			'text-lime-300',
			'text-yellow-300',
			'text-amber-300',
			'text-orange-300',
			'text-red-300',
		];
		const idx = item.charCodeAt(0);
		return colors[idx - 66];
	}
</script>

{#if motion}
	<div
		class="m-2 p-4 flex flex-col bg-gray-700 ring-1 ring-gray-300 rounded shadow-lg
{expanded ? 'row-span-2' : ''}"
	>
		<div class=" bg-gray-300 -mx-4 -mt-4 px-4 py-1 text-sm rounded-t">
			{`Sitzung #${motion.meta.meetingNo} am ${new Date(motion.meta.date).toLocaleDateString(
				'de-AT'
			)} `}
		</div>
		<div
			class=" {getTextColorForAgendaItem(
				motion.meta.agendaItem
			)} -mx-4 px-4 pt-1 text-xs text-color line-clamp-2"
		>
			{motion.meta.agendaText}
		</div>
		<div class="line-clamp-4 h-24 my-2">
			<a href={buildUrl(motion.url)}
				><h2 class="hover:text-blue-200 active:text-blue-300">{motion.title}</h2></a
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
