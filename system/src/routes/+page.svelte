<script>
	import { json } from "@sveltejs/kit";
	import "./page.css"

	let statusult1 = true;
	let statusult2 = false;
	let statusultex = false;
	let statusforge = true;

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


	start(0);

</script>

<div class="container">
	<div class="grid">
		<div class="box">
			<img src="Ultimaker3.png" alt="printer 1" class="image" />
			<h1 class="text">Ultimaker 3D 3</h1>
			{#if statusult1 == true}
				{#if printers[0].timerCount >= 1}
					{#if printers[0].timerCount < 61}
						<p>{printers[0].timerCount} seconds left</p>
					{:else if printers[0].timerCount > 60 && printers[0].timerCount < 3600}
						<p>{Math.trunc(printers[0].timerCount / 60)} minutes left</p>
					{:else}
						<p>{Math.round((printers[0].timerCount / 3600) * 10) / 10} hours left</p>
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
		</div>

		<div class="box">
			<img src="Ultimaker3Extended.png" alt="printer 2" class="image" />
			<h1 class="text">Utlimaker Extended 3D 2</h1>
			{#if statusultex == true}
				{#if printers[1].timerCount >= 1}
					{#if printers[1].timerCount < 61}
						<p>{printers[1].timerCount} seconds left</p>
					{:else if printers[1].timerCount > 60 && printers[1].timerCount < 3600}
						<p>{Math.trunc(printers[1].timerCount / 60)} minutes left</p>
					{:else}
						<p>{Math.round((printers[1].timerCount / 3600) * 10) / 10} hours left</p>
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
		</div>

		<div class="box">
			<img src="Ultimaker3.png" alt="printer 3" class="image" />
			<h1 class="text">Ultimaker 3D 1</h1>
			{#if statusult2 == true}
				{#if printers[2].timerCount >= 1}
					{#if printers[2].timerCount < 61}
						<p>{printers[2].timerCount} seconds left</p>
					{:else if printers[2].timerCount > 60 && printers[2].timerCount < 3600}
						<p>{Math.trunc(printers[2].timerCount / 60)} minutes left</p>
					{:else}
						<p>{Math.round((printers[2].timerCount / 3600) * 10) / 10} hours left</p>
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
		</div>

		<div class="box">
			<img src="FlashforgeCreator3Pro.png" alt="printer 4" class="image" />
			<h1 class="text">Flashforge</h1>
			{#if statusforge == true}
				{#if printers[3].timerCount >= 1}
					{#if printers[3].timerCount < 61}
						<p>{printers[3].timerCount} seconds left</p>
					{:else if printers[3].timerCount > 60 && printers[3].timerCount < 3600}
						<p>{Math.trunc(printers[3].timerCount / 60)} minutes left</p>
					{:else}
						<p>{Math.round((printers[3].timerCount / 3600) * 10) / 10} hours left</p>
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
		</div>
	</div>
</div>
