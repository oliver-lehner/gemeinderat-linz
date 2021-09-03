<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav>
	<ul class="flex flex-row text-l font-semibold gap-4">
		<li
			class=" {$page.path == '/motions'
				? 'text-yellow-300'
				: 'text-gray-100'}"
		>
			<a sveltekit:prefetch href="/motions" >Anträge</a>
		</li>
		<li
			class="{$page.path == '/help'
				? 'text-yellow-300'
				: 'text-gray-100'}"
		>
			<a sveltekit:prefetch href="/help">Hilfe & Infos</a>
		</li>
	</ul>
	<ul />
</nav>
