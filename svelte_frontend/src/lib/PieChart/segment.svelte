<script lang="ts">
	export let percent: number, color: string, offset: number
</script>

<circle
	id={"pie-segment"}
	cx="21"
	cy="21"
	r="15.91549430918954"
	fill="transparent"
	stroke={`var(${color})`}
	stroke-width="32"
	stroke-dasharray={`${percent} ${100 - percent}`}
	stroke-dashoffset={offset}
/>