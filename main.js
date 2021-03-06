//JAVASCRIPT FOR PATCH CLICKER
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//VARIABLES
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var gold = 0;
var pans = 0;
var rockers = 0;
var sluices = 0;

var clickBonus = 0; //+how many extra gold per click
var clickMultiplier = 1; //how much we multiply the click total value by;

var panDurability = 20;	//how much pan starts with when you buy one

function calcPanCostRate(number)
{var rate = Math.floor(10 * Math.pow(1.1, number)); return rate;};

function calcRockerCostRate(number)
{var rate = Math.floor(150 * Math.pow(1.1, number)); return rate;};

function calcSluiceCostRate(number)
{var rate = Math.floor(1800 * Math.pow(1.1, number)); return rate;};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCTIONS
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//cookieClick = for when something auto-gains gold for you
function cookieClick(number)
{
	gold = gold + number;
	document.getElementById('gold').innerHTML = prettify(gold);
};

//panGold = for when you click the pan gold button
function panGold()
{

	var earnings = prettify(Math.floor((Math.random() * 3) + 1)/10);
	//roll to see if we get lucky!
	var luckRoll = Math.floor((Math.random()*100)+1);
	if(luckRoll >99)
	{
		var secondLuckRoll = Math.floor((Math.random()*100)+1);
		if(luckRoll > 99)
		{
			console.log("YOU FOUND A HUGE NUGGET! Second Luck roll was " + secondLuckRoll);
			earnings = prettify(Math.floor((Math.random()*100)+360)/10);
		}
		else if(luckRoll > 80)
		{
			console.log("YOU FOUND A BIG NUGGET! Second Luck roll was " + secondLuckRoll);
			earnings = prettify(Math.floor((Math.random()*100)+80)/10);
		}
		else
		{
			console.log("YOU FOUND A DECENT NUGGET! Second Luck roll was " + secondLuckRoll);
			earnings = prettify(Math.floor((Math.random()*100)+30)/10);
		};

		//Make the prospector say something new
		newPhrase();
	}
	else if(luckRoll > 94)
	{
		//Make the prospector say something new
		newPhrase();

		console.log("YOU FOUND A SMALL NUGGET! Luck roll was " + luckRoll);
		earnings = prettify(Math.floor((Math.random()*100)+10.5)/10);
	};
	
	//calculate how much bonus we get per click based on clickBonus
	calculateClickBonus();
	earnings += clickBonus;
	
	console.log("you panned for gold and earned " + earnings);
	gold = gold + earnings;
	document.getElementById('gold').innerHTML = prettify(gold);
};

//calculateClickBonus = for when we have items that add to our base click value
function calculateClickBonus()
{
	///////////////////
	////////////////////
	/////////////CODE GOES HERE TOMORROW
	///////////////////
}

//buyPan = for when you click the Buy Pan button
function buyPan(number)
{
	var panCost = calcPanCostRate(pans);
	if(gold >= panCost)
	{
		pans += 1;
		gold = gold - panCost;
		document.getElementById('pans').innerHTML = Math.floor(pans);
		document.getElementById('gold').innerHTML = Math.floor(gold);
	};
	var nextCost = calcPanCostRate(pans);
	document.getElementById('panCost').innerHTML = Math.floor(nextCost);
};

//buyRockers = for when you click the Buy Rocker Boxes button
function buyRockers(number)
{
	var rockerCost = calcRockerCostRate(rockers);
	if(gold >= rockerCost)
	{
		rockers += 1;
		gold = gold - rockerCost;
		document.getElementById('rockers').innerHTML = Math.floor(rockers);
		document.getElementById('gold').innerHTML = Math.floor(gold);
	};
	var nextCost = calcRockerCostRate(rockers);
	document.getElementById('rockerCost').innerHTML = Math.floor(nextCost);
};

//buySluices = for when you click the Buy Sluice Boxes button
function buySluices(number)
{
	var sluiceCost = calcSluiceCostRate(sluices);
	if(gold >= sluiceCost)
	{
		sluices += 1;
		gold = gold - sluiceCost;
		document.getElementById('sluices').innerHTML = Math.floor(sluices);
		document.getElementById('gold').innerHTML = Math.floor(gold);
	};
	var nextCost = calcSluiceCostRate(sluices);
	document.getElementById('sluiceCost').innerHTML = Math.floor(nextCost);
};






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TIME SECTION FOR TIME INTERVALS///////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.setInterval(function()
{
	//this is basically the HTML version of a FixedUpdate() function :) :) :)
	//everything inside these braces will fire once every 1000ms or 1 second.
	//here we can execute code, call functions, do tests to see if conditions are met, etc.
	cookieClick(pans*.1);
	cookieClick(rockers*.3);
	cookieClick(sluices*.7);
	tick();
}, 1000);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SAVING AND STORAGE FUNCTIONS
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//our save data object :)
//access this save file and overwrite one or all of these properties, etc. etc. 


function saveToDisk()
{
	
	//cleanup gold before saving
	gold = prettify(gold);
	//grab save data from current memory
	var save = {
		gold: gold,
		pans: pans,
		rockers: rockers,
		sluices: sluices
	};
	
	//save to local storage as JSON string
	localStorage.setItem("save", JSON.stringify(save));
	
	//check if we saved successfully and can access the save
	if(localStorage.save !== "undefined")
	{
		console.log("GAME SAVED");
	}
};

function load()
{
	//grab savegame data from local storage
	var savegame = JSON.parse(localStorage.getItem("save"));
	//check if any values are undefined
	if(typeof savegame.gold !== "undefined") {gold = savegame.gold; 	document.getElementById('gold').innerHTML = prettify(gold);};
	if(typeof savegame.pans !== "undefined") {pans = savegame.pans; 	document.getElementById('pans').innerHTML = prettify(pans);};
	if(typeof savegame.rockers !== "undefined") {rockers = savegame.rockers; 	document.getElementById('rockers').innerHTML = rockers;};
	if(typeof savegame.sluices !== "undefined") {sluices = savegame.sluices; 	document.getElementById('sluices').innerHTML = sluices;};
	console.log("Save Game Loaded");
	//quick check to see what gold we have saved
	console.log("gold = " + gold + " from previous savegame");
	
	//Update The Costs Fields
	updateCosts();
};

function reset()
{
	localStorage.removeItem("save");
};


//CHECK FOR HTML5 LOCAL STORAGE
if(supports_html5_storage())
{
	console.log("HTML5 STORAGE SUPPORTED");
};
function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DEBUG FUNCTIONS
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//HELPER FUNCTIONS

function choose(arr) {return arr[Math.floor(Math.random()*arr.length)];}

function showStuff(boxid){
	document.getElementById(boxid).style.visibility="visible";
}
function hideStuff(boxid){
	document.getElementById(boxid).style.visibility="hidden";
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PROSPECTOR VOICE TICKER
function newPhrase()
{
	document.getElementById('prospector-ticker').innerHTML = "&quot;"+choose(tickerQuotes)+"&quot;";
}

var tickerQuotes = [];
tickerQuotes = [
"There&rsquo;s a snake in my boots!",
"Ol&rsquo; Patches found some gold!",
"Somebody&rsquo;s poisoned the waterhole...",
"Eureka!",
"I&rsquo;m going to be rich, y&rsquo;hear me?!?!",
"People will know my name...",
"No time like the present!",
"I&rsquo;m going to be famous...",
"I&rsquo;m going to disrupt the way we think about prospecting. Ever been to Churning Man?",
"Comes straight out of the ground if you just click hard enough.",
"Money is a great servant but a bad master.",
"The way to wealth depends on just two words, industry and frugality",
"The more you learn, the more you earn",
"An investment in knowledge always pays the best interest... or just buy better prospecting equipment.",
"To acquire money requires valor, to keep money requires prudence, and to spend money well is an art.",
"More people should learn to tell their dollars where to go instead of asking them where they went",
"To get rich, you have to be making money while you&rsquo;re asleep",
"Wealth is largely the result of habit",
"The only difference between a rich person and a poor person is how they use their time",
"Never spend money before you have it",
"Prospecting is simple, but not easy.",
"Happiness is not in the mere possession of money; it lies in the joy of achievement, in the thrill of creative effort",
"Formal education will make you a living; self-education will make you a fortune",
"Success is one-half working for gold nuggets, and one-half working those nuggets",
"The greatest single source of wealth is between your ears."
];


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TICK INFORMATION AND DEBUG LOGGING PER INTERVAL
var intervals = 0;
function tick()
{
	intervals++;
	document.getElementById('intervals').innerHTML = intervals;
	//console.log("Gold: " + gold);
	//console.log("intervals % 5 = " + intervals % 5);
	var goldRate = pans*.1 + rockers*.3 + sluices*.7;
	document.getElementById('goldRate').innerHTML = prettify(goldRate);
	
	//autosave every 5 seconds
	if(intervals % 5 == 0)
	{
		saveToDisk();
	}
};

//cleanup javascript handling of floating point deep decimals
function prettify(input)
{
	var output = Math.round(input * 1000000)/1000000;
	return output;
};

//UPDATE ALL COSTS
function updateCosts()
{
	var pCost = calcPanCostRate(pans);
	document.getElementById('panCost').innerHTML = Math.floor(pCost);
	var rCost = calcRockerCostRate(rockers);
	document.getElementById('rockerCost').innerHTML = Math.floor(rCost);
	var sCost = calcSluiceCostRate(sluices);
	document.getElementById('sluiceCost').innerHTML = Math.floor(sCost);
};


//////////////////////////////////////////////////////////////////////////////////////
//COUNTER STUFF
