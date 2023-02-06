<script>
</script>

<div>
		<h1>Fyll in informasjonen for din print</h1>
		<form>
			<h2>Din informasjon</h2>
			<div class="flexGap">
				<input type="text" placeholder="Ditt navn" required />
				<input type="text" placeholder="Ansvarlig" required />
				<input type="text" placeholder="Klasse" />
			</div>
			<h2>Hvor mye tid skal dere bruke</h2>
			<div class="flexGap">
				<input type="number" placeholder="Timer" required min="0" />
				<input type="number" placeholder="Minuter" required min="0" />
			</div>
			<div class="flexGap">
				<input type="submit" class="submit" />
				<button class="cancle">Kanseler prosses</button>
			</div>
		</form>
		<button class="log">Log</button>
</div>

<style>
	:global(html) {
		height: 100vh;
	}
	:global(body) {
		margin: 5rem auto;
		color: #92959b;
		background-color: #0f0f0f;
		background-image: url(bg.png);
		background-repeat: no-repeat;
		background-size: cover;
		text-decoration: none;
		max-width: 80rem;
	}

	.log {
		background-color: #222222;
		padding: 10px 30px;
		border-radius: 1rem;
		font-weight: 600;
		border: none;
		color: #92959b;
	}

	input {
		background-color: #222222;
		padding: 10px 30px;
		border-radius: 1rem;
		font-weight: 600;
		border: none;
		color: #92959b;
	}

	.flexBetween {
		display: flex;
		justify-content: space-between;
	}

	.flexGap {
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
