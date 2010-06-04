
-------------------
External frameworks
-------------------
	jQuery-1-4-2.js
	phonegap.js



--------------
jsGame.core.js
==============
	jsGame object constructor
		* timestamp
		* debug
		* init()
	
	- JSON parser
	- Board
	- Cell

-----------------------
jsGame.sound.manager.js
=======================
	Wrapper for audio frameworks
	- gSoundPlay( soundFile )
	- gPlayRandomSound( soundFamily );
	- gAudioStop()

 

--------------
jsGame.farm.js
==============
	Overload and extend jsGame object for FarmHero game.
		- Board
		- Cell
		- Crop
		- growthCycles()
		- getGrowthCycles()
		- recordGrowthCycle()
		- clearNoGrowthCycles()

		

-----------------------
jsGame.farm.behavior.js
=======================
	Define FarmHero rules and core actions
		- gUpdatePlayerMoney()
		- gShowPlayerSeeds()
		- gSHowSeedPricesFull()
		- gShowSeedPrices()
		- gSetCursorPLant()
		- gSetCursorHarvest()
		-



---------------------
jsGame.farm.levels.js
=====================
	Define gLevel object to define game variables which change based on skill level.
		- gLevels()
		- getLevel()
		- loadLevel()
		- gLEVELS.DATA[]
		


-----------------------------
jsGame.farm.sound.profiles.js
=============================
	Define gSoundProfile object which has a single array to store all game sounds.
		- gSoundProfiles
		- getProfile(profileIndex)
		- loadProfile(profileIndex)
			- DATA[]
		


----------------
jsGame_board.css
================
	CSS styles responsible for game layout and look and feel.
	
	
