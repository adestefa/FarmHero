
/**
	Game Level manager
	5/26/2010 2:29PM
*/





/** Define a new 'gLevels' container object wrapper for our level list */
function gLevels(){
	this.DATA = [];
}

/** Return level data for a given index */
gLevels.prototype.getLevel = function(levelIndex){
	if(levelIndex < this.DATA.length){
		return this.DATA[levelIndex];
	}else{
		console.log("Error, level "+levelIndex+" does not exist");
	}
		
}	


/** using level data override current global settings */
gLevels.prototype.loadLevel = function(levelIndex){
	
	/** load actual level data by index number */
	var levelData = this.getLevel(levelIndex);
	
    /** update global settings with new level data */
    GAME_SETTINGS_GROW_CYCLE_SPEED = levelData.CYCLE_SPEED;
    
    GAME_SETTINGS_CYCLE_CAN_HARVEST = levelData.CYCLE_CAN_HARVEST;
    
    GAME_SETTINGS_NUM_OF_NO_GROWTH_CYCLE_TRIGGER = levelData.PENALTY_CYCLE;
    
    GAME_SETTINGS_NO_GROWTH_PENALTY = levelData.NO_GROWTH_COST;
    
    GAME_SETTINGS_NUM_OF_ITEMS_IN_A_BUSHEL = levelData.NUM_ITEMS_IN_BUSHEL;
    
    GAME_SETTINGS_BUSHEL_BONUS = levelData.BUSHEL_BONUS;
    
	console.log(leveldata.NAME + " Loading complete.");
    
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
	"CYCLE_CAN_HARVEST":3,
	"NUM_ITEMS_IN_BUSHEL":2,
	"PENALTY_CYCLE":2,
	"NO_GROWTH_COST":5,
	"BUSHEL_BONUS":50
}





