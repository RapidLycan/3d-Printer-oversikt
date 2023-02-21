<script>
	import { fade } from 'svelte/transition';

	export let isOpen = false;
</script>

{#if isOpen}
	<button class="dialog" in:fade={{ duration: 300 }}>
		<div class="dialog-box">
			<slot />
		</div>
	</button>
{/if}	

<style>
	.dialog {
		background-color: #ffffff50;
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		max-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.dialog-box {
		padding: 15px 20px;
		background-color: #0f0f0f;
		width: 100%;
		max-width: 800px;
		max-height: 80vh;
		overflow-y: scroll;
		border-radius: 15px;
		color: #92959b;
		z-index: 200;
		text-align: start;

		/* add shadow here */
	}
</style>
