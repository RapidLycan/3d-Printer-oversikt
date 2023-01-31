<script>
</script>

<h1>Fyll in informasjonen for din print</h1>
<form>
	<h2>Din informasjon</h2>
	<div>
		<input type="text" class="inputFields" placeholder="Ditt navn" required />
		<input type="text" class="inputFields" placeholder="Kontakt lærer / Ansvarlig lærer" required />
		<input type="text" class="inputFields" placeholder="Klasse" />
	</div>
	<h2>Hvor mye tid skal dere bruke</h2>
	<div>
		<input type="number" class="inputFields" placeholder="Timer" required min="0" />
		<input type="number" class="inputFields" placeholder="Minuter" required min="0" />
	</div>
	<div>
		<input type="submit" class="inputFields submit" />
		<button class="cancle">Kanseler prosses</button>
	</div>
</form>

<style>
	:global(html) {
		height: 100vh;
	}
	:global(body) {
		background-color: #000000;
		width: 100%;
		max-width: 80rem;
		max-height: 100vh;
		display: block;
		overflow: hidden;
		height: 100%;
		margin: 5rem auto;
		color: #92959b;
	}
	.inputFields {
		background-color: #222222;
		padding: 10px 30px;
		border-radius: 1rem;
		font-weight: 600;
		border: none;
		color: #92959b;
	}
	div {
		display: flex;
		gap: 2rem;
	}
	.cancle {
		background-color: red;
		padding: 10px 30px;
		border-radius: 1rem;
		font-weight: 600;
		border: none;
		color: white;
		margin-top: 4rem;
		place-self: start;
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
