<script>
	import "./page.css"
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
