<script lang="ts">
	import '../app.postcss';
	import Header from '$lib/Header/index.svelte';
</script>

<header>
	<Header />
</header>
<main class="bg-gray-800">
	<slot />
</main>
