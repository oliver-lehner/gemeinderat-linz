<script lang="ts">
	import { getPartyNames, getPartyFacts } from '$lib/partyfacts';
	import { filter } from '$lib/stores';

	const parties = getPartyNames();
	const partyStates: { party: string; checked: boolean }[] = parties.map((value) => {
		return { party: value, checked: false };
	});

	let selected;

	$: $filter = {
		side: selected,
		parties: parties.filter((party) => {
			return partyStates.findIndex((value) => value.party == party && value.checked == true) > -1;
		})
	};

	function handleSubmit(e) {
		console.log(partyStates);
	}
</script>

<div class="flex flex-col w-48">
	<select
		bind:value={selected}
		name="side"
		id="side"
		class="bg-yellow-500 border-0 text-gray-700 shadow-md py-1
		 rounded"
	>
		<option value="pro">Stimmen dafür:</option>
		<option value="withheld">Stimmenthaltung:</option>
		<option value="contra">Gegenstimmen:</option>
	</select>
	<div class="flex flex-wrap">
		{#each partyStates as state (state.party)}
			<div class="flex items-center gap-1 mr-2">
				<input type="checkbox" bind:checked={state.checked} class="text-yellow-500 rounded" />
				<label for={`party${state.party}`} class="text-gray-100">{state.party}</label>
			</div>
		{/each}
	</div>
</div>
