<script>
</script>

<div class="grid">
	<a href="printer1">
		<div class="print1 box">
			<img src="Ultimaker-3.png" alt="printer 1" class="image" />
			<h1 class="text">Printer 1</h1>
			<div class="meter">
				<span style="width: 25%" />
			</div>
			<p class="text">Administrator</p>
		</div>
	</a>

	<a href="">
		<div class="print2 box">
			<img src="Ultimaker-3-Extended.png" alt="printer 2" class="image" />
			<h1 class="text">Printer 2</h1>
			<div class="meter">
				<span style="width: 25%" />
			</div>
			<p class="text">Administrator</p>
		</div>
	</a>

	<a href="">
		<div class="print3 box">
			<img src="Ultimaker-3.png" alt="printer 3" class="image" />
			<h1 class="text">Printer 3</h1>
			<div class="meter">
				<span style="width: 25%" />
			</div>
			<p class="text">Administrator</p>
		</div>
	</a>

	<a href="">
		<div class="print4 box">
			<img src="Flashforge-Creator-3.png" alt="printer 4" class="image" />
			<h1 class="text">Printer 4</h1>
			<div class="meter">
				<span style="width: 25%" />
			</div>
			<p class="text">Administrator</p>
		</div>
	</a>
</div>

<style>
	:global(body) {
		overflow: hidden;
		max-width: 1536px;
		margin-left: auto;
		margin-right: auto;
		background-color: #0f0f10;
	}
	.grid {
		display: grid;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 5rem;
	}
	.mx-auto {
		margin-left: auto;
		margin-right: auto;
	}

	.box {
		background-color: #222222;
		padding: 10px 30px;
		border-radius: 1rem;
	}
	.image {
		height: 14rem;
		object-fit: contain;
		margin: 0 auto;
		width: 100%;
	}
	.text {
		text-align: center;
		color: #92959b;
	}

	.meter {
		box-sizing: content-box;
		height: 20px; /* Can be anything */
		position: relative;
		margin: 60px 0 20px 0; /* Just for demo spacing */
		background: #555;
		border-radius: 25px;
		padding: 10px;
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
</style>
