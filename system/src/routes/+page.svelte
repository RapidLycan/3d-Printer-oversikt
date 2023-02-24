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

	import { json } from "@sveltejs/kit";


	let statusult1 = true;
	let statusult2 = false;
	let statusultex = true;
	let statusforge = false;

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

/* 		const whatPrinterReturns = [
			{
				"uuid":"f4456e11-985a-4606-92c9-c801971cec0f",
				"name":"UM3E_FAFO_Desk_Plate",


				"created_at":"2023-02-13T10:03:34.853302",
				"started":true,
				
				"status":"printing",
				"printer_uuid":"a6dc50a3-9fbb-4840-a7f4-b42f799eafff",
				"configuration":[{"extruder_index":0,
				"material":{"guid":"506c9f0d-e3aa-4bd4-b2d2-23e2425b1aa9",
				"brand":"Generic",
				
				"material":"PLA",

				"color":"Generic"},
				"print_core_id":"AA 0.4",
				"material_used":10624}],
				"machine_variant":"Ultimaker 3 Extended",
				"constraints":{"require_printer_name":"ultimakersystem-ccbdd3000b92"},
				
				"time_elapsed":7886,
				"time_total":8482,
				
				"last_seen":6.831140885013156,
				"network_error_count":0,
				"force":true,
				"assigned_to":null,
				"owner":"USB",
				"build_plate":{"type":"glass"},
				"configuration_changes_required":[],
				"impediments_to_printing":[],
				"compatible_machine_families":[],
				"printed_on_uuid":null,
				"deleted_at":null,
				"cloud_job_id":null
			}
		]
 */
 
 
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

/* 	function update(Url) {
			fetch(`${Url}`)
		.then(Response => Response.json())
		.then(response => {
			console.log(response);
			setTimeout(()=> {
				return(response)
			}, 1000)
		}, error => {
			console.log(error);
		});
		} */

	function start(machine) {
		
		let printUrl;
		if(machine == 0){
			printUrl = "http://10.229.242.19/cluster-api/v1/print_jobs/printing"
		} else if (machine == 1){
			printUrl == "http://10.229.242.36/cluster-api/v1/print_jobs/printing"
		} else if (machine == 2){
			printUrl == "http://10.229.x.x/cluster-api/v1/print_jobs/printing"
		} else if (machine == 3){
			printUrl == "http://10.229.x.x/cluster-api/v1/print_jobs/printing"
		}
		const i = machine

		/* const fetchUrl = async (url) => {
        const response = await fetch(url);
        console.log('status: ', response.status);
        // if(!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        console.log(data);
		return(data.promised)
    	};
		
		const data = fetchUrl(printUrl)
		console.log(data); */


		async function fetchData(url){
			try {
				const response = await fetch(url);
				const data = await response.json();
				return data;
			} catch (error) {
				console.log(error);
			}
		}

		async function main() {
			const data = await fetchData(printUrl);
			console.log(data);



			printers[i].time = data[0].time_total;
	
			printers[i].timerCount = data[0].time_total - data[0].time_elapsed;
			printers[i].timeBar = (data[0].time_elapsed / data[0].time_total) * 100

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

		main();
	}
  
	let name = '';
	let responsible = '';
	let classs = '';

	const handleSubmit = () => {
		start(activePrinter.id)
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