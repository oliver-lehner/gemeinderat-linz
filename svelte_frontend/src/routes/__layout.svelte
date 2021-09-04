<script lang="ts">
	import '../app.postcss';
	import Header from '$lib/Header/index.svelte';
</script>

<div class="flex flex-col h-screen">
	<div>
		<Header />
	</div>
	<div class="flex-1 overflow-y-auto px-4">
		<slot />
	</div>
</div>
