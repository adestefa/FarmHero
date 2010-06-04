 /** 
	jsGame Sound Manager
 
 */






/**
 
	Here we define the global game sounds for each action. we only care about
	defining the names, setting values will be handled by another module jsGame.sound.farm.profiles.js
 
 
 */
var GAME_SOUND_COIN;
var GAME_SOUND_CLICK;
var GAME_SOUND_PLANT;
var GAME_SOUND_HARVEST;
var GAME_SOUND_LOSE;
var GAME_SOUND_BUNDLE;
var GAME_SOUND_ERROR;
var GAME_SOUND_TOOLATE;
var GAME_SOUND_TOOEARLY;
var GAME_SOUND_BUYSEED;
var GAME_SOUND_BUYERROR;
var GAME_SOUND_ROTTEN;
var GAME_SOUND_NO_GROWTH_PENALTY;

/** jsGame sound profile container */
var gSoundProfiles;




/** return true if client is mobile safari */
function gIsMobileSafari(){
	if(navigator.userAgent.indexOf('iPod') != -1){return true;}
	if(navigator.userAgent.indexOf('iPhone') != -1){return true;}
	if(navigator.userAgent.indexOf('iPad') != -1){return true;}
	else{return false;}
}


/**
 * Return randNumber between 'limit' and 0
 *
 */
function randNum( limit){
           return randomnumber=Math.floor(Math.random()*limit);
    
}



/** play an audio file in sounds sub directory */
function gPlaySound( sound, loadTime ){
	/** we use phoneGap's audio manager when apple mobile devices found */
	if( gIsMobileSafari() ){
		jsGame.log("navigator.audio playing sound: sounds/"+sound);
		navigator.audio = new Media("sounds/"+sound);
		navigator.notification.activityStart();
		navigator.audio.play();
		
		
	/** use good old jQuery sound manager for all other useragents */
	}else{
		if(loadTime == 'undefined'){ loadTime = 0; }
		jsGame.log("jQuery.sound playing sound: sounds/"+sound);
		jQuery.sound.play("sounds/"+sound,{timeout:loadTime});
	}
	
	
}


function audioStop(){
	navigator.notification.activityStop();
	navigator.audio.stop();
}

/** given a valid soundFamily name -  play a random sound */
function gPlayRandomSound( soundFamily ){
	var r = randNum(Sounds[soundFamily].length);
	gPlaySound( Sounds[soundFamily][r] );
}

/** via prompt user can enter file name to play */
function gPlaySoundFromString( filename ){
	var fileToPlay = prompt("full file name without path");
	gPlaySound(fileToPlay);
}



function gSoundCoin(){
	gPlaySound(GAME_SOUND_COIN);
}

function gSoundClick(){
	gPlaySound(GAME_SOUND_CLICK);
}

function gSoundPlant(){
	gPlaySound(GAME_SOUND_PLANT);
}

function gSoundHarvest(){
	gPlaySound(GAME_SOUND_HARVEST);
}

function gSoundLose(){
	gPlaySound(GAME_SOUND_LOSE);
}

/** user creates a bundle */
function gSoundBundle(){
	gPlaySound(GAME_SOUND_BUNDLE);
}	

function gSoundError(){
	gPlaySound(GAME_SOUND_ERROR);
}

/** if you click after ripe */
function gSoundTooLate(){
	gPlaySound(GAME_SOUND_TOOLATE);
}

/** farmer has nothing growing */
function gSoundNoGrowthPenalty(){
	gPlaySound(GAME_SOUND_NO_GROWTH_PENALTY);
}
	
/** click before ripe */
function gSoundTooEarly(){
	gPlaySound(GAME_SOUND_TOOEARLY);
}

function gSoundBuySeed(){
	gPlaySound(GAME_SOUND_BUYSEED);
}

function gSoundBuyError(){
	gPlaySound(GAME_SOUND_BUYERROR);
}	

function gSoundRotten(){
	gPlaySound(GAME_SOUND_ROTTEN);
}