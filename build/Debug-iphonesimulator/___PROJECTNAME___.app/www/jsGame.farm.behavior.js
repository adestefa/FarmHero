  
  
   /**
    * jsGame.farm.behavoir.js
    * Anthony DeStefano - Jan 28 2010
    *
    * Speed Farming
    *  - (n) Gardens each of a type of crop
    *  - Purchase and plant seeds
    *  - Harvest and cash in
    *  - Miss harvest and plunder your investment
    *
    */
  
    
    var jsGame = new jsGame();
    jsGame.debug = 0;
   
    /** Main game loop boolean game is running when true */
    var GAME_RUN_LOOP_ON = 1;
   
    /** total number of growth cycles */
    var GAME_DATA_NUM_GROWTH_CYCLES_PAST = 0;
    
    /** cost and value of each crop */
    var GAME_VALUE_SEED_CORN = 5;
    /** value sold after harvest */
    var GAME_VALUE_HARVEST_CORN = 10;
    /** keep track of how many items harvested without a miss */
    var GAME_DATA_CORN_ITEMS_IN_A_ROW = 0;
    
 
    var GAME_VALUE_SEED_BERRIES = 15;
    var GAME_VALUE_HARVEST_BERRIES = 30;
    var GAME_DATA_STRAWBERRIES_ITEMS_IN_A_ROW = 0;
   
    var GAME_VALUE_SEED_WHEAT = 3;
    var GAME_VALUE_HARVEST_WHEAT = 8;
    var GAME_DATA_WHEAT_ITEMS_IN_A_ROW = 0;
    
    /** Actions */
    var GAME_ACTIONS = ["Plant","Water","Pesticide","Harvest"];
    var GAME_CURRENT_ACTION = "Plant";
  
    /** Player  */
    var GAME_PLAYER_MONEY = 50;
    var GAME_PLAYER_MONEY_LOSS = 0;
    var GAME_PLAYER_MONEY_PROFIT = 0;
    var GAME_PLAYER_SEEDS_CORN = 0;
    var GAME_PLAYER_SEEDS_BERRIES = 0;
    var GAME_PLAYER_SEEDS_WHEAT = 0;
 
    /** images */
    var GAME_ICON_SEED = ".";
    var GAME_ICON_MONEY = "images/icon_money.png";
    var GAME_ICON_LOSS = "images/errIcon.png";
    var GAME_ICON_CORN = "images/corn.jpg";
    var GAME_ICON_STRAWBERRY = "images/strawberry.jpg";

    /** Initialize Game */
    jQuery(document).ready(function(){
		gInitializeAndPlay();
	});

	/** setup and play game */
	function gInitializeAndPlay(){
		GAME_PLAYER_MONEY = 50;
		gUpdatePlayerMoney();
		gShowPlayerSeeds();
		gShowSeedPrices();
		gSetCursorPlant(); 
		GAME_RUN_LOOP_ON = 1;
		gStart();
	}

var cloudCycles = 1;
function moveCloud(){
	if(jQuery('#cloud').position().left == 300){
		//console.log("move right cycles:"+cloudCycles);
		if(cloudCycles < 3){
			jQuery('#cloud').animate({left: "400px"}, GAME_SETTINGS_GROW_CYCLE_SPEED + 3000 );
			cloudCycles++;
		}else{
			jQuery('#cloud').animate({left: "800px"}, GAME_SETTINGS_GROW_CYCLE_SPEED + 3000 );
			cloudCycles = 1;
		}
	}else{  
		//console.log("move left");
		jQuery('#cloud').animate({left: "300px"}, GAME_SETTINGS_GROW_CYCLE_SPEED + 3000);
	}  	
}
   
    var GAME_INTERVAL; 
	    
	function gStart(){
		 /** Main game loop - growing time begins in the garden */
		gCycle();
		jsGame.recordGrowthCycle();
		
		if(jQuery('#sun').position().left == 300){
			//console.log("move right");
		    jQuery('#sun').animate({left: "700px"}, GAME_SETTINGS_GROW_CYCLE_SPEED );
		}else{  
			//console.log("move left");
		    jQuery('#sun').animate({left: "300px"}, GAME_SETTINGS_GROW_CYCLE_SPEED );
		}  
		moveCloud();
	
		if(GAME_RUN_LOOP_ON){
			
			GAME_INTERVAL = setTimeout("gStart()", GAME_SETTINGS_GROW_CYCLE_SPEED);
		}else{
			clearTimeout(GAME_INTERVAL);
		}	
    }
    	
	function gStop(){
		//console.log("clear interval");
		//clearTimeout(GAME_INTERVAL);
		GAME_RUN_LOOP_ON = 0;
	}
    
	function gPause(){
		jsGame.log("Game paused...");
		gStop();
	}

	function gContinue(){
		jsGame.log("Continue game");
		gStart();
	}
    
    
   
    /**  display player's money totals */
    function gUpdatePlayerMoney(ani){
		var currentMoney = parseInt(jQuery('#PLAYER_MONEY').html().substr(0));
		//console.log("CURRENT MONEY:"+currentMoney+ "REAL MONEY:"+GAME_PLAYER_MONEY);
		//if(currentMoney > GAME_PLAYER_MONEY){
	  	//	}else{
	    
		//}
		if(typeof ani !== "undefined"){
			jQuery('#PLAYER_MONEY').css({fontSize: "16px", color: "red"})
			.animate({fontSize: "2em"}, 600 )
			.animate({fontSize: "16px", color: ""}, 300 );
		}
		jQuery('#PLAYER_MONEY').html(GAME_PLAYER_MONEY).css({fontSize: "16px", color: "black"});
		jQuery('#PLAYER_MONEY_LOSS').html(GAME_PLAYER_MONEY_LOSS);
		jQuery('#PLAYER_MONEY_PROFIT').html(GAME_PLAYER_MONEY_PROFIT);
    }
 
    /** display player seed report */
    function gShowPlayerSeeds(){
		jQuery("#cornCount").html("["+GAME_PLAYER_SEEDS_CORN+"]");
		jQuery("#wheatCount").html("["+GAME_PLAYER_SEEDS_WHEAT+"]");
		jQuery("#berriesCount").html("["+GAME_PLAYER_SEEDS_BERRIES+"]");
	
    }
    
    /** display seed store show ['price of seed' / 'value of harvest'] */ 
    function gShowSeedPricesFull(){
		jQuery("#cornPrice").html("[$"+GAME_VALUE_SEED_CORN+"/$"+GAME_VALUE_HARVEST_CORN+"]");
		jQuery("#wheatPrice").html("[$"+GAME_VALUE_SEED_WHEAT+"/$"+GAME_VALUE_HARVEST_WHEAT+"]");
		jQuery("#berriesPrice").html("[$"+GAME_VALUE_SEED_BERRIES+"/$"+GAME_VALUE_HARVEST_BERRIES+"]");
	}
    
    /** display seed store show ['price of seed' / 'value of harvest'] */ 
    function gShowSeedPrices(){
		jQuery(".cornPrice").html("$"+GAME_VALUE_SEED_CORN);
		jQuery(".wheatPrice").html("$"+GAME_VALUE_SEED_WHEAT);
		jQuery(".berriesPrice").html("$"+GAME_VALUE_SEED_BERRIES);
		jQuery(".cornValue").html("$"+GAME_VALUE_HARVEST_CORN);
		jQuery(".wheatValue").html("$"+GAME_VALUE_HARVEST_WHEAT);
		jQuery(".berriesValue").html("$"+GAME_VALUE_HARVEST_BERRIES);
	}
    
    /** update cursor over garden when planting */
    function gSetCursorPlant(){
		jQuery('#corns').attr('class','').attr('class','cursor-plant');
		jQuery('#strawberries').attr('class','').attr('class','cursor-plant');
		jQuery('#wheat').attr('class','').attr('class','cursor-plant');
    }
    
    /** update cursor over garden when harvesting */
    function gSetCursorHarvest(){
		jQuery('#corns').attr('class','').attr('class','cursor-harvest');
		jQuery('#strawberries').attr('class','').attr('class','cursor-harvest');
		jQuery('#wheat').attr('class','').attr('class','cursor-harvest');
    }
    
    
    
   
   /**	
    *    Mother Earth Growing Cycle ( Sun ) 
    *
    *    We want to track how much the farmer has gained and lost during each growth cycle.
    *
    *	 A crop can either grow or die during a cycle. A farmer has to know the right color to pick.
    *    
    *    Every time a crop is harvested we add the gain to GAME_PLAYER_MONEY_PROFIT
    *    Every time a crop dies we add the lost value to GAME_PLAYER_MONEY_LOSS
    *
    *    A farmer only has 2 cycles he can go without anything growing (in the ground) before he loses money.
    *
    */
    function gCycle(){
	
	
	
	
	GAME_DATA_NUM_GROWTH_CYCLES_PAST++;
	//	console.log("RUN LOOP:"+GAME_RUN_LOOP_ON)=
	//console.log("Growth cycle "+ GAME_DATA_NUM_GROWTH_CYCLES_PAST +" begins..");
	
		//console.log("GAME_SETTINGS_GROW_CYCLE_SPEED:"+GAME_SETTINGS_GROW_CYCLE_SPEED);
	
	var foundCrop = 0;
	
	/** walk over number of cells in a garden */
	for(i=0;i<54;i++){
	   
	   /**
	    * - grow any crops in garden by one growth cycle 
	    * - record any dead crops (expired past harvest)
	    */
	 
	   
	    /** only grow corn if it is alive and not harvested */
	    if(CORN.board[i].crop.alive && !CORN.board[i].crop.wasHarvested){
		jsGame.log("Corn crop found:"+i);
		var dead = gGrowCrop(CORN,i);
		/** did corn miss harvest and die ? */
		if(dead){
		    GAME_PLAYER_MONEY_LOSS = (GAME_PLAYER_MONEY_LOSS - GAME_VALUE_HARVEST_CORN);
		    gUpdatePlayerMoney("animate");
		    gAddLostHarvestToBin('corn',GAME_VALUE_HARVEST_WHEAT);
			gSoundRotten();
		}
		    foundCrop = foundCrop + 1;
	    }
	    
	    if(BERRIES.board[i].crop.alive && !BERRIES.board[i].crop.wasHarvested){
		jsGame.log("Strawberry crop found:"+i);
		var dead = gGrowCrop(BERRIES,i);
		if(dead){
		    GAME_PLAYER_MONEY_LOSS = (GAME_PLAYER_MONEY_LOSS - GAME_VALUE_HARVEST_BERRIES);
		    gUpdatePlayerMoney("animate");
		    gAddLostHarvestToBin('berries',GAME_VALUE_HARVEST_WHEAT);
			gSoundRotten();
		}
		foundCrop = foundCrop + 1;
	    }
	    
	    if(WHEAT.board[i].crop.alive && !WHEAT.board[i].crop.wasHarvested){
		jsGame.log("Wheat crop found:"+i);
		var dead = gGrowCrop(WHEAT,i);
		if(dead){
		    GAME_PLAYER_MONEY_LOSS = (GAME_PLAYER_MONEY_LOSS - GAME_VALUE_HARVEST_WHEAT);
		    gUpdatePlayerMoney("animate");
		    gAddLostHarvestToBin('wheat',GAME_VALUE_HARVEST_WHEAT);
			gSoundRotten();
		}
		foundCrop = foundCrop + 1;
	    }	
	}
	
	/** the farmer has nothing in the ground! */
	if(!foundCrop){
	    jsGame.recordNoGrowthCycle();
	    jsGame.log("No growth this cycle! num:"+jsGame.noGrowthCycles);
	    
	    if(jsGame.noGrowthCycles >= GAME_SETTINGS_NUM_OF_NO_GROWTH_CYCLE_TRIGGER){
			GAME_PLAYER_MONEY = (GAME_PLAYER_MONEY - GAME_SETTINGS_NO_GROWTH_PENALTY);
			if(GAME_PLAYER_MONEY < 0){
				GAME_PLAYER_MONEY = 0;
				gUpdatePlayerMoney();
				gOutput("GAME OVER");
			//	console.log("Game over calling stop");
				gStop();
			}else{
				gUpdatePlayerMoney("animate");
				gSoundNoGrowthPenalty();
				gOutput("Plant something or your farm will continue to lose money!");
			}
	    }else if (jsGame.noGrowthCycles == 1){
			gOutput("A farmer has to have something growing at all times, plant something!")
			
	    }
	  	
	    
	}else{
	    jsGame.clearNoGrowthCycles();
	}
	
	
	
    }

	function gClearCell(boardName, id){
		//console.log(boardName+":"+id);
		
		setTimeout(function(){
				   jQuery("#"+boardName+"_"+id).css('background-color', "white").css('color','black').html("");
				   }, 5000);		   
		
	}	
    
    /** Grow crop on given board at given cell id */
    function gGrowCrop(board,id){
	
		if(board.board[id].crop.alive && !board.board[id].crop.wasHarvested){
		
			// Age crop (right now stage and age are set together)	
			board.board[id].crop.stage++;
			board.board[id].crop.age++;
		
			// change crop color to new stage	
			var color = board.getColor(board.board[id].crop.stage);
			jQuery("#"+board.gridName+"_"+id).css('border-color','black').css('background-color', color).html("");
	    
			//console.log(board.board[id].crop.name+" crop in Cell:"+id+" has grown and is now:"+ board.board[id].crop.age + " years old");
			
			
			/** Capture when a crop dies (5th cycle) GAME_SETTINGS_CYCLE_CAN_HARVEST */
			if(board.board[id].crop.stage === 6){
				board.board[id].crop.alive=0;
				jsGame.log(board.board[id].crop.name+" crop in Cell:"+id+" has died!");
				jQuery("#"+board.gridName+"_"+id)
				.css('background-color', "white")
				.css('color','red')
				.html("-$"+board.board[id].crop.value);
				
				gClearCell(board.gridName,id);
								
				
				return 1;
				
			/** flash cell border when ripe */
			}else if(board.board[id].crop.stage === GAME_SETTINGS_CYCLE_CAN_HARVEST){
				gFlashCell(board.gridName,id);
			
			}else{
				return 0;
			}
		}
		return 0;
    }

	/** turn the cell's border on */
	function gSetCellFlashOn(boardName, id){
			jQuery("#"+boardName+"_"+id).css('border-color','black').css('border-width','1px');
	}
	/** turn the cell's border off */
	function gSetCellFlashOff(boardName, id){
		jQuery("#"+boardName+"_"+id).css('border-color','black').css('border-width','0px');
	}	
		
	/** flash cell border */
	function gFlashCell(boardName, id){
		
		/** here we flash the cell's border a few times */
		
		setTimeout(function(){
				   gSetCellFlashOn(boardName,id);
				   },0);
		
		setTimeout(function(){
				   gSetCellFlashOff(boardName,id);
			},500);
		
		setTimeout(function(){
				   gSetCellFlashOn(boardName,id);
				   },1000);
		
		setTimeout(function(){
				   gSetCellFlashOff(boardName,id);
				   },1500);
	
				
	
	
	}
   
    /** Purchase Seed */
    function gBuySeed(type){

	    // clean up player money if below 0
	    if(GAME_PLAYER_MONEY < 1){GAME_PLAYER_MONEY = 0;}
	    
	    /** Buy a corn seed */
	    if(type == "Corn"){
		if(GAME_PLAYER_MONEY >= GAME_PLAYER_SEEDS_CORN){
		    GAME_PLAYER_MONEY = (GAME_PLAYER_MONEY - GAME_VALUE_SEED_CORN);
		    GAME_PLAYER_SEEDS_CORN++;
		     var last = jQuery('#cornSeeds').html();
		    jQuery('#cornSeeds').html(last + gMakeSeedGlyph(1) );
			gSoundBuySeed();
			
		}else{
		    gOutput("Not enough funds!");
			gSoundBuyError();
		}
	  
	    /** Buy a strawberry seed */
	    }else if(type === "Strawberries"){
		if(GAME_PLAYER_MONEY >= GAME_PLAYER_SEEDS_BERRIES){	
		    GAME_PLAYER_MONEY = (GAME_PLAYER_MONEY - GAME_VALUE_SEED_BERRIES);
		    GAME_PLAYER_SEEDS_BERRIES++;
		    var last = jQuery('#berrySeeds').html();
		    jQuery('#berrySeeds').html( last + gMakeSeedGlyph(1) );
			gSoundBuySeed();
		}else{
		    gOutput("Not enough funds!");
			gSoundBuyError();
		}
	    
	    /** Buy a wheat seed */    
	    }else if(type === "Wheat"){
		if(GAME_PLAYER_MONEY >= GAME_PLAYER_SEEDS_WHEAT){	
		    GAME_PLAYER_MONEY = (GAME_PLAYER_MONEY - GAME_VALUE_SEED_WHEAT);
		    GAME_PLAYER_SEEDS_WHEAT++;
		    var last = jQuery('#wheatSeeds').html();
		    jQuery('#wheatSeeds').html(last + gMakeSeedGlyph(1) );
			gSoundBuySeed();
		}else{
		    gOutput("Not enough funds!");
			gSoundBuyError();
		}
	    }
	    
	    gUpdatePlayerMoney();
	    gShowPlayerSeeds();
	    return 1;
	
    }
    
    /** send text message to screen */
    function gOutput(str){
	jQuery('#display').html(str);
    }
    
    /** format seed for planting on screen */
    function gMakeSeedGlyph( num ){
	var out="", i;
	for(i=0;i<num;i++){
	    out += '<span class="seedglyph">'+GAME_ICON_SEED+'</span>';
	}
	return out;
    }
    
    
    
    /**
     *	Plant Crop Seed
     *	 - here we are creating a new crop object
     *	    and setting it into the selected cell object from the board
     *
     */
    function gPlantCrop(board,id){
	var str = id.split("_");
	var i = parseInt(str[1]);
	
	//if(board.board[i].crop == "" || !board.board[i].crop.alive || board.board[i].crop.wasHarvested ){
	   gSoundPlant(); // Play sound
	
		if(board.gridName === "corns"){
			var cornSeed = makeSeed("Corn",GAME_VALUE_HARVEST_CORN);
			board.board[i].setCrop(cornSeed);
			var last = jQuery('#cornSeeds .seedglyph').length;
			var seeds = gMakeSeedGlyph( last -1 );
			jQuery('#cornSeeds').html(seeds);
	    }
	
	    if(board.gridName === "strawberries"){
			var berry = makeSeed("Strawberries",GAME_VALUE_HARVEST_BERRIES);
			board.board[i].setCrop(berry );
			var last = jQuery('#berrySeeds .seedglyph').length;
			var seeds = gMakeSeedGlyph( last -1 );
			jQuery('#berrySeeds').html(seeds);
	    }
	
	    if(board.gridName === "wheat"){
			var wheat = makeSeed("Wheat",GAME_VALUE_HARVEST_WHEAT);
			board.board[i].setCrop(wheat );
			var last = jQuery('#wheatSeeds .seedglyph').length;
			var seeds = gMakeSeedGlyph( last -1 );
			jQuery('#wheatSeeds').html(seeds);
	    }
	
	//}
	jsGame.log("Add crop:"+board.board[i].crop.name);
    }
   
    /**
     * Harvest a crop 
     *
     */
    function gHarvestCrop(board, id){
	var str = id.split("_");
	var i = parseInt(str[1]);
	board.board[i].crop.harvest();
	gSoundHarvest(); // Play sound
	// show corp value in green as replacement
	jQuery("#"+id)
	    .css('background-color', "white")
	    .css('color','green')
	    .html("+$"+board.board[i].crop.value);
	jsGame.log("Add crop:"+board.board[i].crop);
	// fade value out after some time
	
    }
     
    
     
     
    /** Add Sold harvest to bin */
    function gAddHarvestToBin(type,value) {
	var markup;
	var currVal = jQuery('#bin-'+type).html();
	//var markup = '<span style="color:green">+$'+value+'</span>';
	
	
		
	if(type == "corn"){
	    markup = '<img width="18" height="18" src="'+GAME_ICON_CORN+'" />';
	    
	    GAME_DATA_CORN_ITEMS_IN_A_ROW = GAME_DATA_CORN_ITEMS_IN_A_ROW  + 1;
	    
	    /** check if farmer harvested enough items to make a bushel */
	    if(GAME_DATA_CORN_ITEMS_IN_A_ROW >= GAME_SETTINGS_NUM_OF_ITEMS_IN_A_BUSHEL){
		
			gOutput("You made a Corn Bushel worth "+GAME_SETTINGS_BUSHEL_BONUS+"!!");
			var currVal = jQuery('#bin-'+type).html();
			var markup = '<img width="18" height="18" src="'+GAME_ICON_CORN+'" />';
			jQuery('#bin-'+type).css('color','green').html(currVal + markup);
			gSoundBundle();
			animateBushel('corn');
	      }
	      
	      
	}else if(type == "berries"){
	     markup = '<img width="18" height="18" src="'+GAME_ICON_STRAWBERRY+'" />';
	     GAME_DATA_STRAWBERRIES_ITEMS_IN_A_ROW = GAME_DATA_STRAWBERRIES_ITEMS_IN_A_ROW  + 1;
	     
		/** check if farmer harvested enough items to make a bushel */
		if(GAME_DATA_STRAWBERRIES_ITEMS_IN_A_ROW >= GAME_SETTINGS_NUM_OF_ITEMS_IN_A_BUSHEL){
		
			gOutput("You made a strawberry Bushel worth "+GAME_SETTINGS_BUSHEL_BONUS+"!!");
			
			var currVal = jQuery('#bin-'+type).html();
			var markup = '<img width="18" height="18" src="'+GAME_ICON_STRAWBERRY+'" />';
			jQuery('#bin-'+type).css('color','green').html(currVal + markup);
			gSoundBundle();	
			animateBushel('berries');
		}
	      
	      
	}else if(type == "wheat"){
	     markup = '<img width="18" height="18" src="'+GAME_ICON_MONEY+'" />';
	     GAME_DATA_WHEAT_ITEMS_IN_A_ROW = GAME_DATA_WHEAT_ITEMS_IN_A_ROW  + 1;
	       /** check if farmer harvested enough items to make a bushel */
	    if(GAME_DATA_WHEAT_ITEMS_IN_A_ROW >= GAME_SETTINGS_NUM_OF_ITEMS_IN_A_BUSHEL){
		
			gOutput("You made a wheat Bushel worth "+GAME_SETTINGS_BUSHEL_BONUS+"!!");
			var currVal = jQuery('#bin-'+type).html();
			var markup = '<img width="18" height="18" src="'+GAME_ICON_MONEY+'" />';
			jQuery('#bin-'+type).css('color','green').html(currVal + markup);
			gSoundBundle();
			animateBushel('wheat');
	      }
	     
	     
	}
	jQuery('#bin-'+type).css('color','green').html(currVal + markup);
    }
    
    function animateBushel(type){
		//gStop(); // pause growing cycle
		jsGame.log("Animate Bushel:"+type);
		jQuery('#bin-'+type+' img').fadeOut('fast').fadeIn('fast').fadeOut('slow').fadeIn('slow');
	
		setTimeout(function(){
				   jQuery('#bin-'+type+' img:visible').eq(4).fadeOut('fast');
	    
				   }, 100);
		setTimeout(function(){
				   jQuery('#bin-'+type+' img:visible').eq(3).fadeOut('fast');
	
				   }, 300);
		setTimeout(function(){
				   jQuery('#bin-'+type+' img:visible').eq(2).fadeOut('fast');
	    
				   }, 400);
		setTimeout(function(){
				   jQuery('#bin-'+type+' img:visible').eq(1).fadeOut('fast');
	 
				   }, 500);
		setTimeout(function(){
	    
				   jQuery('#bin-'+type+' img:visible').fadeOut('fast');
				   jQuery('#bin-'+type).html("<img src='images/c.gif' width='1' height='20' />");

				   }, 700);
		gOutput("You created a "+type+" Bushel worth $50!");
	
	
		gResetBushelCount(type);
	
		setTimeout(function(){
	
				   jQuery('#icon-'+type+' img').animate({height: "50px", width: "50px"}, 300 ).animate({height: "30px", width: "30px"}, 300 );
	    
	    
				   GAME_PLAYER_MONEY = (GAME_PLAYER_MONEY + GAME_SETTINGS_BUSHEL_BONUS);
				   gUpdatePlayerMoney("animate");
				   var bushels = jQuery('#bushel-'+type).html();
				   jQuery('#bushel-'+type).html( parseInt(bushels) + 1);
					}, 900);
	
    }
    
	function gResetBushelCount(type){
		if(type == "corn"){
			GAME_DATA_CORN_ITEMS_IN_A_ROW=0;
		}else if(type == "berries"){
			GAME_DATA_STRAWBERRIES_ITEMS_IN_A_ROW=0;
		}else if(type == "wheat"){
			GAME_DATA_WHEAT_ITEMS_IN_A_ROW=0;
		}
    }
    
    
    function gHarvestBinBonus(){
	var CornCount = jQuery('#bin-corn img[src="images/corn.jpg"]').length;
	// LOGIC TO COUNT HOW MANY TYPE IN A ROW WITHOUT ROTTEN
    }
    
    /** Add Lost harvest to bin */
    function gAddLostHarvestToBin(type,value) {
	var currVal = jQuery('#bin-'+type).html();
	if(type == "corn"){
	    GAME_DATA_CORN_ITEMS_IN_A_ROW = 0;
	}else if(type === "berries"){
	     GAME_DATA_STRAWBERRIES_ITEMS_IN_A_ROW = 0;
	}else if(type === "wheat"){
	     GAME_DATA_WHEAT_ITEMS_IN_A_ROW = 0;
	}
	//var markup = '<span style="color:red;">-$'+value+'</span>';
	var markup = '<img width="18" height="18" src="'+GAME_ICON_LOSS+'" />';
	//jQuery('#bin-'+type).css('color','red').html(currVal + markup);
	jQuery('#bin-'+type).css('color','red').html(markup);
    }
    

    function gRenderBoard(board){
	var len = board.board.length;
	for(var i=0; i < len;i++){
	    if(board.board[i].crop && board.board[i].crop.alive && !board.board[i].crop.wasHarvested){
		var color = board.getColor(board.board[i].clicks);
		jQuery("#"+board.gridName).css('border-color','black').css('background-color', color).html("");
	    }
	}
	
    }
    
    
    
    /** CELL CLICK HANDLER  */
    function clicks(board,id){
	
	/** display action current selected */
	jQuery('#action').html(GAME_CURRENT_ACTION);
	
	
	/** Action: 'Plant' */
	if(GAME_CURRENT_ACTION == "Plant"){
	   
		
		
	    /** Plant Corn */
	    if(board.name == "Corn"){
			
			if(GAME_PLAYER_SEEDS_CORN > 0){
		        board.clicker(id);      // record click for this cell
				board.renderSeed( id ); // show cell on screen
				
				
				GAME_PLAYER_SEEDS_CORN--;// use up a seed of this type from player
				gShowPlayerSeeds();      // update player seed count display
			
				gPlantCrop(board,id);// add crop object to this cell
			
				gOutput("You planted a Corn seed!");
				setTimeout(function(){
						   gOutput("Remember Corn is Yellow when ripe!");
						   }, 3000);
			}else{
				gOutput("You don't have any Corn seeds to plant!");
			}
	    
	    
	    
	    
		
	    /** Plant Strawberries */
	    }else if(board.name == "Strawberries"){
		if(GAME_PLAYER_SEEDS_BERRIES > 0){
		        board.clicker(id);      // record click for this cell
			board.renderSeed( id ); // show cell on screen
			
			GAME_PLAYER_SEEDS_BERRIES--;// use up a seed of this type from player
			gShowPlayerSeeds();      // update player seed count display
			
			gPlantCrop(board,id);// add crop object to this cell
			
			gOutput("You planted a Corn seed!");
			setTimeout(function(){
			    gOutput("Remember Strawberries are  Red when ripe!");
			}, 3000);
		}else{
		    gOutput("You don't have any Strawberry seeds to plant!");
		}
		
		
		
	    	    /** Plant Strawberries */
	    }else if(board.name == "Wheat"){
		if(GAME_PLAYER_SEEDS_WHEAT > 0){
		        board.clicker(id);      // record click for this cell
			board.renderSeed( id ); // show cell on screen
			
			GAME_PLAYER_SEEDS_WHEAT--;// use up a seed of this type from player
			gShowPlayerSeeds();      // update player seed count display
			
			gPlantCrop(board,id);// add crop object to this cell
			
			gOutput("You planted a Wheat seed!");
			setTimeout(function(){
			    gOutput("Remember Wheat is gold when ripe!");
			}, 3000);
		}else{
		    gOutput("You don't have any Wheat seeds to plant!");
		}
	    }	
		
	
	/** Action: Water crop */	
	}else if(GAME_CURRENT_ACTION == "Water"){
	
	/** Action: Kill bugs */
	}else if(GAME_CURRENT_ACTION == "Pesticide"){
	
	
	/** Action: Harvest crop */
	}else if(GAME_CURRENT_ACTION == "Harvest"){
	    
	    /** parse id into int */
	    var str = id.split("_");
	    var i = parseInt(str[1]);

	    /** only care about cells which have a crop object planted */
	    if(board.board[i].crop && !board.board[i].crop.wasHarvested){
		
		/** get stage number this crop is currently in */
		var stage = board.board[i].crop.stage;
		
		
		/** Picking corn are we? */
		if(board.name == "Corn"){
		    
		    /** You can only pick corn that is rip enough (maybe change this later) */
		    if( stage == GAME_SETTINGS_CYCLE_CAN_HARVEST){
			
								
				gHarvestCrop(board,id); // update crop object it has been harvested and change icon on screen
			
				// add value of this harvest to player's money
				GAME_PLAYER_MONEY = (GAME_PLAYER_MONEY + GAME_VALUE_HARVEST_CORN);
				GAME_PLAYER_MONEY_PROFIT = (GAME_PLAYER_MONEY_PROFIT + GAME_VALUE_HARVEST_CORN);
			
				gUpdatePlayerMoney();
		    	
				/** display harvest under garden */		
				gAddHarvestToBin("corn",GAME_VALUE_HARVEST_CORN);
				
				 gClearCell(board.gridName,str[1]);
			
			
				jsGame.log("Harvest crop:"+id);
		    }else if( stage > GAME_SETTINGS_CYCLE_CAN_HARVEST){
				gOutput("Your Corn is Rotten!!");
				gSoundTooLate();
			}else if( stage < GAME_SETTINGS_CYCLE_CAN_HARVEST){
				gOutput("Not ripe yet!");
				gSoundTooEarly();
		    }
		}
		
		if(board.name == "Strawberries"){
		    if( stage == GAME_SETTINGS_CYCLE_CAN_HARVEST ){
			
				
				gHarvestCrop(board,id); // update crop object it has been harvested and change icon on screen
			
				// add value of this harvest to player's money
				GAME_PLAYER_MONEY = (GAME_PLAYER_MONEY + GAME_VALUE_HARVEST_BERRIES);
				GAME_PLAYER_MONEY_PROFIT = (GAME_PLAYER_MONEY_PROFIT + GAME_VALUE_HARVEST_BERRIES);
			
				gUpdatePlayerMoney();
				gAddHarvestToBin("berries",GAME_VALUE_HARVEST_BERRIES);
			
						   gClearCell(board.gridName,str[1]);
				
				
				jsGame.log("Harvest crop:"+id);
		    }else if( stage > GAME_SETTINGS_CYCLE_CAN_HARVEST){
				gOutput("Your Srawberries are Rotten!!");
				gSoundTooLate();
		    }else if( stage < GAME_SETTINGS_CYCLE_CAN_HARVEST){
				gOutput("Not ripe yet!");
				gSoundTooEarly();
				
		    }
		}
		
		if(board.name == "Wheat"){
		    if( stage == GAME_SETTINGS_CYCLE_CAN_HARVEST){
		   
				gHarvestCrop(board,id); // update crop object it has been harvested and change icon on screen
		    
				// add value of this harvest to player's money
				GAME_PLAYER_MONEY = (GAME_PLAYER_MONEY + GAME_VALUE_HARVEST_WHEAT);
				GAME_PLAYER_MONEY_PROFIT = (GAME_PLAYER_MONEY_PROFIT + GAME_VALUE_HARVEST_WHEAT);
		    
				gUpdatePlayerMoney();
				gAddHarvestToBin("wheat",GAME_VALUE_HARVEST_WHEAT);
		    
				
				gClearCell(board.gridName,str[1]);
										
				jsGame.log("Harvest crop:"+id);
			}else if( stage > GAME_SETTINGS_CYCLE_CAN_HARVEST){
				gOutput("Your Wheat is Rotten!!");
				gSoundTooLate();
		    }else if( stage < GAME_SETTINGS_CYCLE_CAN_HARVEST){
				gOutput("Not ripe yet!");
				gSoundTooEarly();
		    }
		}
	
	    }
	}  
	
    }


	
      

    

    
    
    