<script>
	import formatTime from './formatTime';

	export let printer;
	let timeLeft = formatTime(printer.timer);
	// clear interval. IF not they dupe on refresh
	let clear;

	// update time left on printer
	const updateTimeLeft = () => {
		// updated time is 1000 ms less. so 1 sec less
		const updatedTime = printer.timer - 1000;
		// get updated formatted time left
		timeLeft = formatTime(updatedTime);
		// set printer.timer to updatedTime
		printer.timer = updatedTime;
	};

	// same as onmount
	$: {
		// clear interval onMount
		clearInterval(clear);
		// then set interval to updateTimeLeft Function
		clear = setInterval(updateTimeLeft, 1000); // runs every 1000 ms or 1 sec
	}
</script>

<button class="box" on:click>
	<img src={printer.img} alt="printer 1" class="image" />
	<h1 class="text">{printer.name}</h1>
	{#if printer.status === 'ready'}
		{#if printer.timer <= 0}
			<p>Ready</p>
		{:else}
			<p style="color: white;">{timeLeft}</p>
		{/if}
		<div class="meter">
			<span style="width: {printer.percentLeft}%" />
		</div>
	{:else}
		<p class="brokenmsg">out of order</p>
		<div class="broken">
			<span style="width:100" />
		</div>
	{/if}
	<p class="text">Ansvarlig for print: {printer.name}</p>
</button>

<style>
	.input-form {
		display: flex;
		row-gap: 20px;
		margin: 1rem 0;
	}

	input {
		background-color: #222222;
		padding: 10px 30px;
		border-radius: 1rem;
		font-weight: 600;
		border: none;
		color: #92959b;
	}

	:global(*) {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	:global(body) {
		background-color: #0f0f0f;
		background-image: url(bg.png);
		background-repeat: no-repeat;
		background-size: cover;
		text-decoration: none;
		height: 100vh;
		padding: 0 !important;
		margin: 0 !important;
	}

	.align {
		display: flex;
		align-items: center;
		height: 100%;
		width: 100%;
		margin: 0 auto;
	}

	.container {
		width: 100%;
		max-width: 1000px;
		margin: 0 auto;
	}

	.grid {
		display: grid;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 2rem;
	}

	.box {
		background-color: #222222;
		padding: 10px 30px;
		border-radius: 1rem;
	}

	.image {
		height: 8rem;
		object-fit: contain;
		margin: 0 auto;
		width: 100%;
	}

	.text {
		text-align: center;
		color: #92959b;
		margin: 10px 10px;
	}

	.meter {
		box-sizing: content-box;
		height: 15px;
		/* Can be anything */
		position: relative;
		background: #555;
		border-radius: 25px;
		padding: 5px;
		box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
	}

	.meter > span {
		display: block;
		height: 100%;
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
		background-color: rgb(43, 194, 83);
		background-image: linear-gradient(center bottom, rgb(43, 194, 83) 37%, rgb(84, 240, 84) 69%);
		box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3), inset 0 -2px 6px rgba(0, 0, 0, 0.4);
		position: relative;
		overflow: hidden;
	}

	.broken {
		box-sizing: content-box;
		height: 15px;
		/* Can be anything */
		position: relative;
		background: #555;
		border-radius: 25px;
		padding: 5px;
		box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
	}

	.broken > span {
		display: block;
		height: 100%;
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
		background-color: rgb(194, 43, 43);
		background-image: linear-gradient(center bottom, rgb(194, 43, 43) 37%, rgb(240, 84, 84) 69%);
		box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3), inset 0 -2px 6px rgba(0, 0, 0, 0.4);
		position: relative;
		overflow: hidden;
	}

	.timer {
		color: rgb(43, 194, 83);
		text-align: center;
		font-size: 14px;
	}

	.brokenmsg {
		text-align: center;
		font-size: 14px;
		color: rgb(194, 43, 43);
	}

	h1 {
		margin-bottom: 5px;
		font-size: 25px;
	}
</style>
