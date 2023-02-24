<script>
	import { onMount } from 'svelte';

	let printerOne = [];
	let printerTwo = [];
	let printerThree = [];
	let printerFour = [];

	const getPrinter = (id) => {
		switch (id) {
			case '0':
				return printerOne;
			case '1':
				return printerTwo;
			case '2':
				return printerThree;
			case '3':
				return printerFour;
			default:
				return [];
		}
	};

	onMount(() => {
		const history = window.localStorage.getItem('history');
		if (!history) return;
		const parsed = JSON.parse(history);
		const sorted = parsed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		printerOne = sorted.filter((x) => x.printer === '0');
		printerTwo = sorted.filter((x) => x.printer === '1');
		printerThree = sorted.filter((x) => x.printer === '2');
		printerFour = sorted.filter((x) => x.printer === '3');
	});

	let tags = [
		{
			id: '0',
			name: 'Ultimaker 1'
		},
		{
			id: '1',
			name: 'Ultimaker Extended'
		},
		{
			id: '2',
			name: 'Ultimaker 2'
		},
		{
			id: '3',
			name: 'Flashforge'
		}
	];
	let activeTag = tags[0].id;
</script>

<div class="tags">
	{#each tags as tag}
		<button
			class="tag {activeTag === tag.id ? 'bg-variant tag-active' : ''} text-sm"
			on:click={() => (activeTag = tag.id)}
		>
			{tag.name}
		</button>
	{/each}
</div>

<table id="log">
	<tr>
		<th>Navn</th>
		<th>Ansvarlig for print</th>
		<th>Dato</th>
		<th>Klasse / Lærer</th>
	</tr>
	{#each getPrinter(activeTag) as log}
		<tr>
			<td>{log.name}</td>
			<td>{log.responsible}</td>
			<td>{new Date(log.date).toLocaleString('nb-NO')}</td>
			<td>{log.class}</td>
		</tr>
	{/each}
</table>

<style>
	:global(body) {
		background-color: #0f0f0f;
		background-image: url(bg.png);
		background-repeat: no-repeat;
		background-size: cover;
		text-decoration: none;
		height: 100vh;
		padding: 0 !important;
		margin: 0 auto !important;
		max-width: 70rem;
	}

	.tags {
		display: flex;
		gap: 1rem;
		margin-top: 4rem;
		margin-bottom: 4rem;
		justify-content: center;
	}
	.tag {
		padding: 1rem 2rem;
		background-color: #222222;
		border: none;
		border-radius: 25px;
		color: #92959b;
	}
	.tag:hover {
		padding: 1rem 2rem;
		background-color: #333333;
		border: none;
		border-radius: 25px;
	}
	.tag-active {
		padding: 1rem 2rem;
		background-color: #444444;
		border: none;
		border-radius: 25px;
	}
	#log {
		font-family: Arial, Helvetica, sans-serif;
		border-collapse: collapse;
		width: 100%;
		background-color: #222222;
		color: #92959b;
	}

	#log th{
		border: 1px solid #222222;
		padding: 8px;
		background-color: green;
	}
	#log td {
		border: 1px solid #222222;
		padding: 8px;
	}

	#log tr:nth-child(even) {
		background-color: #191919;
	}

	#log tr:hover {
		background-color: #333333;
	}

	#log th {
		padding-top: 12px;
		padding-bottom: 12px;
		text-align: left;
		background-color: #0000	;
		color: white;
	}
</style>
