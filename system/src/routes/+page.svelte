<script>
	import Dialog from '../components/Dialog.svelte';
	/**
	 * @type {any}
	 */
	let activePrinter = null;

	let statusult1 = true;
	let statusult2 = false;
	let statusultex = false;
	let statusforge = true;

	let prints = [
		{
			hours: 0,
			minutes: 70,
			name: 'jonas',
			printer: 0
		},
		{
			hours: 0,
			minutes: 20,
			name: 'kram',
			printer: 1
		},
		{
			hours: 0,
			minutes: 1,
			name: 'jeff',
			printer: 2
		},
		{
			hours: 2,
			minutes: 0,
			name: 'maret',
			printer: 3
		}
	];

	let printers = [
		{
			time: 0,
			timeBar: 0,
			timeleft: 0,
			name: undefined,
			timerCount: 0
		},
		{
			time: 0,
			timeBar: 0,
			timeleft: 0,
			name: undefined,
			timerCount: 0
		},
		{
			time: 0,
			timeBar: 0,
			timeleft: 0,
			name: undefined,
			timerCount: 0
		},
		{
			time: 0,
			timeBar: 0,
			timeleft: 0,
			name: undefined,
			timerCount: 0
		}
	];

	function calcTimeLeft(timer) {
		return timer * 60;
	}

	function clean(i, cleanTime) {
		setTimeout(() => {
			printers[i].time = 0;
			printers[i].timeBar = 0;
			printers[i].timeLeft = 0;
			printers[i].name = undefined;
			printers[i].timeCount = 0;
		}, cleanTime);
	}

	function start(amount) {
		const i = amount.printer;

		printers[i].time = amount.minutes + amount.hours * 60;
		printers[i].name = amount.name;

		printers[i].timerCount = printers[i].time * 60;

		var barTimer = setInterval(() => {
			if (printers[i].timeBar >= 100) {
				clearInterval(barTimer);
				clean(i, 86400000);
			}
			printers[i].timeBar += 0.1;
		}, calcTimeLeft(printers[i].time));

		var leftTime = setInterval(() => {
			if (printers[i].timerCount > 0) {
				printers[i].timerCount--;
			} else {
				clearInterval(leftTime);
			}
		}, 1000);
	}

	start(prints[0]);
	start(prints[2]);
	start(prints[3]);
	start(prints[1]);
</script>

<Dialog isOpen={activePrinter !== null}>
	{#if activePrinter}
		<h1>Fyll in informasjonen for din print</h1>
		<form>
			<div class="input-form">
				<input type="text" placeholder="Ditt navn" required class="input" />
				<input type="text" placeholder="Ansvarlig" required class="input" />
				<input type="text" placeholder="Klasse" class="input" />
			</div>
			<input type="submit" class="submit input"/>
			<button on:click={() => (activePrinter = null)} class="input">Close</button>
		</form>
	{/if}
</Dialog>

<div class="align">
	<div class="container">
		<div class="grid">
			<button class="box" on:click={() => (activePrinter = { id: '1' })}>
				<img src="Ultimaker3.png" alt="printer 1" class="image" />
				<h1 class="text">Ultimaker 3D 3</h1>
				{#if statusult1 == true}
					{#if printers[0].timerCount >= 1}
						{#if printers[0].timerCount < 61}
							<p class="timer">{printers[0].timerCount} seconds left</p>
						{:else if printers[0].timerCount > 60 && printers[0].timerCount < 3600}
							<p class="timer">{Math.trunc(printers[0].timerCount / 60)} minutes left</p>
						{:else}
							<p class="timer">
								{Math.round((printers[0].timerCount / 3600) * 10) / 10} hours left
							</p>
						{/if}
					{:else}
						<p>Ready</p>
					{/if}
					<div class="meter">
						<span style="width: {printers[0].timeBar}%" />
					</div>
				{:else}
					<p class="brokenmsg">out of order</p>
					<div class="broken">
						<span style="width:100" />
					</div>
				{/if}

				<p class="text">Ansvarlig for print: {printers[0].name}</p>
			</button>

			<button class="box" on:click={() => (activePrinter = { id: '2' })}>
				<img src="Ultimaker3Extended.png" alt="printer 2" class="image" />
				<h1 class="text">Utlimaker Extended 3D 2</h1>
				{#if statusultex == true}
					{#if printers[1].timerCount >= 1}
						{#if printers[1].timerCount < 61}
							<p class="timer">{printers[1].timerCount} seconds left</p>
						{:else if printers[1].timerCount > 60 && printers[1].timerCount < 3600}
							<p class="timer">{Math.trunc(printers[1].timerCount / 60)} minutes left</p>
						{:else}
							<p class="timer">
								{Math.round((printers[1].timerCount / 3600) * 10) / 10} hours left
							</p>
						{/if}
					{:else}
						<p>Ready</p>
					{/if}
					<div class="meter">
						<span style="width: {printers[1].timeBar}%" />
					</div>
				{:else}
					<p class="brokenmsg">out of order</p>
					<div class="broken">
						<span style="width:100" />
					</div>
				{/if}
				<p class="text">Ansvarlig for print: {printers[1].name}</p>
			</button>

			<button class="box" on:click={() => (activePrinter = { id: '2' })}>
				<img src="Ultimaker3.png" alt="printer 3" class="image" />
				<h1 class="text">Ultimaker 3D 1</h1>
				{#if statusult2 == true}
					{#if printers[2].timerCount >= 1}
						{#if printers[2].timerCount < 61}
							<p class="timer">{printers[2].timerCount} seconds left</p>
						{:else if printers[2].timerCount > 60 && printers[2].timerCount < 3600}
							<p class="timer">{Math.trunc(printers[2].timerCount / 60)} minutes left</p>
						{:else}
							<p class="timer">
								{Math.round((printers[2].timerCount / 3600) * 10) / 10} hours left
							</p>
						{/if}
					{:else}
						<p>Ready</p>
					{/if}
					<div class="meter">
						<span style="width: {printers[2].timeBar}%" />
					</div>
				{:else}
					<p class="brokenmsg">out of order</p>
					<div class="broken">
						<span style="width:100" />
					</div>
				{/if}
				<p class="text">Ansvarlig for print: {printers[2].name}</p>
			</button>

			<button class="box" on:click={() => (activePrinter = { id: '2' })}>
				<img src="FlashforgeCreator3Pro.png" alt="printer 4" class="image" />
				<h1 class="text">Flashforge</h1>
				{#if statusforge == true}
					{#if printers[3].timerCount >= 1}
						{#if printers[3].timerCount < 61}
							<p class="timer">{printers[3].timerCount} seconds left</p>
						{:else if printers[3].timerCount > 60 && printers[3].timerCount < 3600}
							<p class="timer">{Math.trunc(printers[3].timerCount / 60)} minutes left</p>
						{:else}
							<p class="timer">
								{Math.round((printers[3].timerCount / 3600) * 10) / 10} hours left
							</p>
						{/if}
					{:else}
						<p>Ready</p>
					{/if}
					<div class="meter">
						<span style="width: {printers[3].timeBar}%" />
					</div>
				{:else}
					<p class="brokenmsg">out of order</p>
					<div class="broken">
						<span style="width:100" />
					</div>
				{/if}
				<p class="text">Ansvarlig for print: {printers[3].name}</p>
			</button>
		</div>
	</div>
</div>

<style>
	.input-form {
		display: flex;
		gap: 15px;
		margin: 1rem 0;
	}

	.input {
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
