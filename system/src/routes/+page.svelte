<div class="container">
    <div class="grid">

        
        <a href="printer1">
            <div class="print1 box">
                <img src="Ultimaker3.png" alt="printer 1" class="image" />
                <h1 class="text">Printer 1</h1>
                {#if printers[0].timerCount >= 1}
                
            
                {#if printers[0].timerCount < 61}
                    <p>{printers[0].timerCount} seconds left</p>
                {:else if printers[0].timerCount > 60 && printers[0].timerCount < 3600}
                    <p>{Math.trunc(printers[0].timerCount/60)} minutes left</p>
                {:else}
                    <p>{Math.round((printers[0].timerCount/3600)* 10) / 10} hours left</p>
                {/if}

            {:else}
                <p>Ready</p>
            {/if} 
                <div class="meter">
                    <span style="width: {printers[0].timeBar}%" />
                </div>
                <p class="text">{printers[0].name}</p>
            </div>
        </a>
        

        <a href="">
            <div class="print2 box">
                <img src="Ultimaker3Extended.png" alt="printer 2" class="image" />
                <h1 class="text">Printer 2</h1>
                {#if printers[1].timerCount >= 1}
                
            
                {#if printers[1].timerCount < 61}
                    <p>{printers[1].timerCount} seconds left</p>
                {:else if printers[1].timerCount > 60 && printers[1].timerCount < 3600}
                    <p>{Math.trunc(printers[1].timerCount/60)} minutes left</p>
                {:else}
                    <p>{Math.round((printers[1].timerCount/3600)* 10) / 10} hours left</p>
                {/if}

            {:else}
                <p>Ready</p>
            {/if} 
                <div class="meter">
                    <span style="width: {printers[1].timeBar}%" />
			</div>
            <p class="text">{printers[1].name}</p>
		</div>
	</a>
    

	<a href="">
        <div class="print3 box">
            <img src="Ultimaker3.png" alt="printer 3" class="image" />
			<h1 class="text">Printer 3</h1>
            {#if printers[2].timerCount >= 1}
                
            
                {#if printers[2].timerCount < 61}
                    <p>{printers[2].timerCount} seconds left</p>
                {:else if printers[2].timerCount > 60 && printers[2].timerCount < 3600}
                    <p>{Math.trunc(printers[2].timerCount/60)} minutes left</p>
                {:else}
                    <p>{Math.round((printers[2].timerCount/3600)* 10) / 10} hours left</p>
                {/if}

            {:else}
                <p>Ready</p>
            {/if}  
			<div class="meter">
                <span style="width: {printers[2].timeBar}%" />
			</div>
			<p class="text">{printers[2].name}</p>
		</div>
	</a>
    

	<a href="">
        <div class="print4 box">
            <img src="FlashforgeCreator3Pro.png" alt="printer 4" class="image" />
			<h1 class="text">Printer 4</h1>
            {#if printers[3].timerCount >= 1}
                
            
                {#if printers[3].timerCount < 61}
                    <p>{printers[3].timerCount} seconds left</p>
                {:else if printers[3].timerCount > 60 && printers[3].timerCount < 3600}
                    <p>{Math.trunc(printers[3].timerCount/60)} minutes left</p>
                {:else}
                    <p>{Math.round((printers[3].timerCount/3600)* 10) / 10} hours left</p>
                {/if}

            {:else}
                <p>Ready</p>
            {/if} 
			<div class="meter">
                <span style="width: {printers[3].timeBar}%" />
			</div>
			<p class="text">{printers[3].name}</p>
		</div>
	</a>
</div>


</div>

<style>
    *{
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

	:global(body) {
		overflow: hidden;
		max-width: 1536px;
		margin: 40px auto;
		background-color: #0f0f0f;
        background-image: url(bg.png);
        background-repeat: no-repeat;
        background-size:cover
	}

	.container {
		width: 100%;
		max-width: 1920x;
		max-height: 100vh;
		display: block;
	}

	a {
		text-decoration: none;
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
		margin: 20px 0 20px 0; /* Just for demo spacing */
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

    p{
        color: rgb(43, 194, 83);
        text-align: center;
        font-size: 1.5rem;
    }

    h1{
        margin-bottom: 60px;
        font-size: 3rem;
    }
</style>

<script>

let prints = [
{
    hours: 0,
    minutes: 70,
    name: "jonas",
    printer: 0
},
{
    hours: 0,
    minutes: 20,
    name: "kram",
    printer: 1
},
{
    hours: 0,
    minutes: 1,
    name: "jeff",
    printer: 2
},
{
    hours: 2,
    minutes: 0,
    name: "maret",
    printer: 3
}
]

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
]

function calcTimeLeft(timer){
    return (timer * 60)
}

function clean(i, cleanTime) {
    setTimeout(()=> {
        printers[i].time = 0
        printers[i].timeBar = 0
        printers[i].timeLeft = 0
        printers[i].name = undefined
        printers[i].timeCount = 0
    }, cleanTime)
}

function start(amount){

    const i = amount.printer

    printers[i].time = amount.minutes + (amount.hours * 60)
    printers[i].name = amount.name

    printers[i].timerCount = printers[i].time * 60

    var barTimer = setInterval(()=> {
        if(printers[i].timeBar >= 100){
            clearInterval(barTimer)
            clean(i, 86400000)
        }
        printers[i].timeBar+=0.1
    }, calcTimeLeft(printers[i].time))
    
    var leftTime = setInterval(()=> {
        if(printers[i].timerCount > 0){
            printers[i].timerCount--
        }else {
            clearInterval(leftTime)
        }
    }, 1000)
   
}

start(prints[0])
start(prints[2])
start(prints[3])
start(prints[1])
    
</script>
