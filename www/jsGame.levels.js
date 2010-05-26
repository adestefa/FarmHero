
/**
	Game Level manager
	5/26/2010 2:29PM
*/





/** Define a new 'gLevels' container object wrapper for our level list */
function gLevels(){
	this.DATA = [];
}

/** Return level data for a given index */
gLevels.prototype.loadLevel = function(levelIndex){
	if(levelIndex < this.DATA.length){
		return this.DATA[levelIndex];
	}else{
		console.log("Error, level "+levelIndex+" does not exist");
	}
		
}	



var gLEVELS = new gLevels();

gLEVELS.DATA[0] =	{
	"NAME":"Level 1",
	"CYCLE_SPEED":3000,
	"CYCLE_CAN_HARVEST":5,
	"NUM_ITEMS_IN_BUSHEL":5,
	"PENALTY_CYCLE":2,
	"NO_GROWTH_COST":5,
	"BUSHEL_BONUS":10
}



gLEVELS.DATA[1] =	{
	"NAME":"Level 2",
	"CYCLE_SPEED":2000,
	"CYCLE_CAN_HARVEST":5,
	"NUM_ITEMS_IN_BUSHEL":5,
	"PENALTY_CYCLE":2,
	"NO_GROWTH_COST":5,
	"BUSHEL_BONUS":10
}





