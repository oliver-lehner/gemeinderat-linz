<script lang="ts">
	import {fade} from 'svelte/transition';
	
	import { getPartyNames } from '$lib/partyfacts';
	import { filter } from '$lib/stores';
	import Pie from '$lib/PieChart/pie.svelte';


	const parties = getPartyNames();
	let partyStates: { party: string; checked: boolean }[] = parties.map((value) => {
		return { party: value, checked: false };
	});
	$: selectedParties = partyStates.filter((state) => state.checked).map((state) => state.party);

	let selectedType, excludeUnisono;

	$: $filter = {
		side: selectedType,
		parties: parties.filter((party) => {
			return partyStates.findIndex((value) => value.party == party && value.checked == true) > -1;
		}),
		excludeUnisono: excludeUnisono
	};
</script>

<div class="flex mt-1 mr-4 bg-gray-700 rounded-b px-2 py-1 shadow-md">
	<div class="flex flex-col max-w-sm">
		<div class="flex mb-1">
			<div class="flex flex-wrap">
				{#each partyStates as state (state.party)}
					<label
						for={`party${state.party}`}
						class="inline-flex items-center gap-1 mr-2 text-gray-100"
					>
						<input type="checkbox" bind:checked={state.checked} />
						{state.party}
					</label>
				{/each}
			</div>
			<div class="mx-2 flex items-center">
				<div class="w-12 h-12">
					{#if selectedType && selectedType != 'none'}
					<div transition:fade class="w-full h-full relative">
						<Pie parties={selectedParties} type={selectedType} />
						</div>
					{/if}
				</div>
			</div>
		</div>
		<select
			bind:value={selectedType}
			name="side"
			id="side"
			class="bg-yellow-500 border-0 text-gray-700 shadow-md py-1
		 rounded"
		>
			<option value="none">Filter auswählen...</option>
			<option value="pro">stimmen dafür</option>
			<option value="withheld">enthalten sich</option>
			<option value="contra">stimmen dagegen</option>
		</select>
		{#if selectedType == 'pro'}
			<label class="text-gray-100 text-sm inline-flex items-center gap-1">
				<input type="checkbox" bind:checked={excludeUnisono}  />
				Einstimmige ausblenden</label
			>
		{/if}
		<button
			on:click={() => {
				partyStates = partyStates.map((state) => {
					return { party: state.party, checked: false };
				});
				selectedType = 'none';
			}}
			class="bg-red-500 rounded text-gray-100 font-bold self-end mt-1 px-2 hover:bg-red-300 hover:text-gray-700">Zurücksetzen</button
		>
	</div>
</div>

<style lang="postcss">
	input[type=checkbox] {
		@apply text-yellow-500 rounded focus:ring-1 focus:ring-yellow-300 focus:ring-offset-0;
	}
</style>