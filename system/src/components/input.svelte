<script>
	/* import Dialog from '@smui/dialog';
	export let open = false; */
	
</script>

<!-- <Dialog bind:open aria-labelledby="simple-title" aria-describedby="simple-content">
 --><div class="body">
	<div class="inputContainer box">
		<h1>Fyll in informasjonen for din print</h1>
		<form>
			<h2>Din informasjon</h2>
			<div class="flexGap">
				<input type="text" placeholder="Ditt navn" required />
				<input type="text" placeholder="Ansvarlig" required />
				<input type="text" placeholder="Klasse" />
			</div>
				<input type="submit" class="submit" />
		</form>
	</div>
</div>
<!-- </Dialog>
 -->

<style>
	.body {
		background-color: rgb(34, 34, 34, 0.9);
		z-index: 10;
		backdrop-filter: blur(5px);
		position: absolute;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
	}
	.inputContainer {
		margin-left: auto;
		margin-right: auto;
		max-width: 900px;
	}
	.box {
		background-color: #0f0f0f;
		color: #92959b;
		border-radius: 1rem;
		padding: 2rem;
		width: 100%;
		max-height: 500px;
	}

	input {
		background-color: #222222;
		padding: 10px 30px;
		border-radius: 1rem;
		font-weight: 600;
		border: none;
		color: #92959b;
	}

	
	.submit {
		margin-top: 4rem;
		place-self: start;
	}

	.submit:hover {
		background-color: #333333;
	}

	form {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
