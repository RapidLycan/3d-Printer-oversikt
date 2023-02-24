<script>
	import { onMount } from 'svelte';
	import Dialog from '../components/Dialog.svelte';
	import '../app.css';

	
	let activePrinter = null;
	let history = [];

	//last printer variable
	let lastPrinterOne = null;
	let lastPrinterTwo = null;
	let lastPrinterThree = null;
	let lastPrinterFour = null;

	let statusult1 = true;
	let statusult2 = false;
	let statusultex = false;
	let statusforge = true;

	const updateHistory = (newHistory) => {
		localStorage.setItem('history', JSON.stringify(newHistory));
		// find last printed by date
		let sorted = newHistory.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
		// finding the last printer with earlier sorting
		lastPrinterOne = sorted.find((item) => item.printer === '0');
		lastPrinterTwo = sorted.find((item) => item.printer === '1');
		lastPrinterThree = sorted.find((item) => item.printer === '2');
		lastPrinterFour = sorted.find((item) => item.printer === '3');
	};
	// syncs when u open page
	onMount(() => {
	// get storage
		const prevHistory = localStorage.getItem('history');
		// update history
		if (prevHistory) {
			history = JSON.parse(prevHistory);
			updateHistory(history);
		}
	});

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

	let name = '';
	let responsible = '';
	let classs = '';

	const handleSubmit = () => {
		// henter ut verdien som er lagret i localStorage
		const historyStorage = window.localStorage.getItem('history');
		// converterer string til array
		let historyArray = historyStorage ? JSON.parse(historyStorage) : [];

		if (!historyArray) historyArray = [];

		//Pusher tingene under
		historyArray.push({
			name,
			responsible,
			classs,
			date: new Date().toISOString(),
			printer: activePrinter.id
		});
		updateHistory(historyArray);
		// gjør arrayen tilbake til en string????????
		window.localStorage.setItem('history', JSON.stringify(historyArray));
		//reseter printer til null
		activePrinter = null;
	};

	start(prints[0]);
	start(prints[2]);
	start(prints[3]);
	start(prints[1]);
</script>

<Dialog isOpen={activePrinter !== null}>
	{#if activePrinter}
		<h1>Fyll in informasjonen for din print</h1>
		<form on:submit|preventDefault={handleSubmit}>
			<div class="input-form">
				<input type="text" bind:value={name} placeholder="Ditt navn" required class="input" />
				<input
					type="text"
					bind:value={responsible}
					placeholder="Ansvarlig"
					required
					class="input"
				/>
				<input type="text" bind:value={classs} placeholder="Klasse" class="input" />
			</div>
			<button class="submit input" type="submit"> Start print </button>
			<button on:click={() => (activePrinter = null)} class="input">Close</button>
		</form>
	{/if}
</Dialog>

<div class="align">
	<div class="container">
		<div class="grid">
			<button class="box" on:click={() => (activePrinter = { id: '0' })}>
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
				<p class="text">Ansvarlig for print: {lastPrinterOne?.responsible}</p>
			</button>

			<button class="box" on:click={() => (activePrinter = { id: '1' })}>
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
				<p class="text">Ansvarlig for print: {lastPrinterTwo?.responsible}</p>
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
				<p class="text">Ansvarlig for print: {lastPrinterThree?.responsible}</p>
			</button>

			<button class="box" on:click={() => (activePrinter = { id: '3' })}>
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
				<p class="text">Ansvarlig for print: {lastPrinterFour?.responsible}</p>
			</button>
		</div>
	</div>
</div>