function gIsMobileSafari(){
	if(navigator.userAgent.indexOf('iPod') != -1){return true;}
	if(navigator.userAgent.indexOf('iPhone') != -1){return true;}
	if(navigator.userAgent.indexOf('iPad') != -1){return true;}
	else{return false;}
}


/**
 * Return randNumber between 'limit' [and 'lowerLimit']
 *
 */
function randNum( limit){
           return randomnumber=Math.floor(Math.random()*limit);
    
}



/** game sounds */
Sounds = new Array();
Sounds['drink'] = ['drink.wav','glugglug.wav'];
Sounds['Error_Purchase'] = ['out_of_funds.caf','out_of_funds1.caf','out_of_funds2.caf'];


/** play a wav file in sounds/ sub directory */
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

function gPlaySoundFromString( filename ){
	var fileToPlay = prompt("full file name without path");
	gPlaySound(fileToPlay);
}

function gSoundCoin(){
	gPlaySound("smw_coin.caf");
}

function gSoundClick(){
	gPlaySound("click.caf");
}

function gSoundPlant(){
	gPlaySound("slash.caf");
}

function gSoundHarvest(){
	gPlaySound("smw_coin.caf");
}

function gSoundLose(){
	gPlaySound("doh.caf");
}

function gSoundBundle(){
	gPlaySound("you_got_it_1.caf");
}	

function gSoundError(){
	gPlaySound("ouch.caf");
}

/** nothing planted */
function gSoundTooLate(){
	gPlaySound("buyseed.caf");
}

function gSoundTooEarly(){
	gPlaySound("picklock.caf");
}

function gSoundBuySeed(){
	gPlaySound("buyseed.caf");
}

function gSoundBuyError(){
	gPlayRandomSound('Error_Purchase');
}	

function gSoundRotten(){
	gPlaySound("slap.caf");
}