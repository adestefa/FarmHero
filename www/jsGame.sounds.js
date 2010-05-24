function gIsMobileSafari(){
	if(navigator.userAgent.indexOf('iPod') != -1){return true;}
	if(navigator.userAgent.indexOf('iPhone') != -1){return true;}
	if(navigator.userAgent.indexOf('iPad') != -1){return true;}
	else{return false;}
}



/** game sounds */
Sounds = new Array();
Sounds['drink'] = ['drink.wav','glugglug.wav'];



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
	var ranNum = randNum(Sounds[soundFamily].length);
	gPlaySound( Sounds[soundFamily][ranNum] );
}

function gPlaySoundFromString( filename ){
	var fileToPlay = prompt("full file name without path");
	gPlaySound(fileToPlay);
}

function gSoundCoin(){
	gPlaySound("smw_coin.wav");
}

function gSoundClick(){
	gPlaySound("click.wav");
}

function gSoundPlant(){
	gPlaySound("slash.wav");
}

function gSoundHarvest(){
	gPlaySound("smw_coin.wav");
}

function gSoundLose(){
	gPlaySound("crazy_fool.wav");
}

function gSoundBundle(){
	gPlaySound("you_got_it_1.wav");
}	

function gSoundError(){
	gPlaySound("boing_1.wav");
}
function gSoundTooLate(){
	gPlaySound("metal_clang.wav");
}

function gSoundTooEarly(){
	gPlaySound("picklock.wav");
}

function gSoundBuySeed(){
	console.log("play buy seed sound");
	gPlaySound("buyseed.wav");
}

function gSoundBuyError(){
	console.log("play buy seed sound ERROR");
}	

function gSoundRotten(){
	gPlaySound("slap.wav");
}