<script lang="ts">
	import '../app.postcss';
	import Header from '$lib/Header/index.svelte';
</script>

<header>
	<Header />
</header>
<main>
	<div class="h-screen container mx-auto">
	<slot />
	</div>
</main>
