/**
	Sound Profile Manager
	May 27, 2010
 */




/** Define a new 'gSoundProfiles' container object wrapper for our sound profile list */
function gSoundProfile(){
	this.DATA = [];
}

/** Return sound data for a given index */
gSoundProfile.prototype.getProfile = function(profileIndex){
	if(profileIndex < this.DATA.length){
		return this.DATA[profileIndex];
	}else{
		console.log("Error, sound profile "+profileIndex+" does not exist");
	}
	
}	


/** using level data override current global settings */
gSoundProfile.prototype.loadProfile = function(profileIndex){
	
	/** load actual level data by index number */
	var profileData = this.getProfile(profileIndex);
	
	GAME_SOUND_COIN		= profileData.COIN;
	GAME_SOUND_CLICK	= profileData.CLICK;
	GAME_SOUND_PLANT	= profileData.PLANT;
	GAME_SOUND_HARVEST	= profileData.HARVEST;
	GAME_SOUND_LOSE		= profileData.LOSE;
	GAME_SOUND_BUNDLE	= profileData.BUNDLE;
	GAME_SOUND_ERROR	= profileData.ERROR;
	GAME_SOUND_TOOLATE	= profileData.TOOLATE;
	GAME_SOUND_TOOEARLY	= profileData.TOOEARLY;
	GAME_SOUND_BUYSEED	= profileData.BUYSEED;
	GAME_SOUND_BUYERROR	= profileData.BUYERROR;
	GAME_SOUND_ROTTEN   = profileData.ROTTEN;
	GAME_SOUND_NO_GROWTH_PENALTY = profileData.NO_GROWTH_PENALTY;
     
	console.log( profileData.NAME + " Loading complete.");
    
}



gSoundProfiles = new gSoundProfile();

gSoundProfiles.DATA[0] =	{
	"NAME":"Sound Profile 1",
	"COIN":"smw_coin.caf",
	"CLICK":"click.caf",
	"PLANT":"slash.caf",
	"HARVEST":"smw_coin.caf",
	"LOSE":"doh.caf",
	"BUNDLE":"you_got_it_1.caf",
	"ERROR":"ouch.caf",
	"TOOLATE":"buyseed.caf",
	"TOOEARLY":"picklock.caf",
	"BUYSEED":"buyseed.caf",
	"BUYERROR":"out_of_funds.caf",
	"ROTTEN":"rotten.wav",
	"NO_GROWTH_PENALTY":"attention.caf"
}


gSoundProfiles.DATA[1] =	{
	"NAME":"Sound Profile 2",
	"COIN":"coin2.wav",
	"CLICK":"click.caf",
	"PLANT":"slash.caf",
	"HARVEST":"coin2.wav",
	"LOSE":"doh.caf",
	"BUNDLE":"bundle.wav",
	"ERROR":"error.wav",
	"TOOLATE":"rotten.wav",
	"TOOEARLY":"picklock.caf",
	"BUYSEED":"buyseed.caf",
	"BUYERROR":"out_of_funds.caf",
	"ROTTEN":"rotten.wav",
	"NO_GROWTH_PENALTY":"nogrowth.wav"

	
}



/** load sound profile into memory */
gSoundProfiles.loadProfile(1);


