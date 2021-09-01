<script lang="ts">
	import '../app.postcss';
	import Header from '$lib/Header/index.svelte';
</script>

<header>
	<Header />
</header>
<main class="bg-gray-800">
	<div class="h-screen container mx-auto relative mt-20 sm:mt-10">
	<slot />
	</div>
</main>
