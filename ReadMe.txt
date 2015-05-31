

After witnessing the wild success of both Guitar Hero and Farmville, I started playing with the idea of mixing them together 
into something new. I wanted to combine fun parts that stand out of each game. I liked the timed selection of colored patterns from Guitar Hero, with economy and actions of farming. Play cycles through the player purchasing seeds, stratigically planting them, waiting for them to grow, then harvesting them at the right time and onced enough collected they can sell them at a profit. Crops grow by the cycle of the Sun at the top of the screen. Each time the Sun moves across the field all crops grow and change color. Crops grow at different rates based on their type. They also have different value at the market for sale so selecting and buying the right seeds, while also being fast enough to harvest all you plant before they die has a big impact on success of the farmer.This game does not use Flash or HTML5, just simple HTML, CSS and custom JavaScript library
I developed. I ported the code using PhoneGap for the iPhone and iPad platforms.

![alt tag](https://adestefawp.files.wordpress.com/2015/05/farmhero.png)




An early playable version can be found here: http://adestefa.com/farmhero/



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
	
	
