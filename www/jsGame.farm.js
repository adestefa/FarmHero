
   
  
  
    /**
     * jsGame layer for Speed Farming object model 
     * Anthony DeStefano 2/27/2010
     * 	 
     * - each crop will have the following phases:
     *   -  buy seed
     *   -  plant seed
     *   -  Grow
     *   -  harvest
     *   -  or die
     *
     *
     */
    
    /**
     * Track number of growth cycles
     */
    jsGame.prototype.growthCycles = 0;
    
	jsGame.prototype.getGrowthCycles = function(){
		return this.growthCycles;
    }
   

	jsGame.prototype.recordGrowthCycle = function(){
	
		this.growthCycles = this.growthCycles + 1;
    }
    
    /**
     *	Track number of cycles where nothing is planted
     */
    jsGame.prototype.noGrowthCycles = 0;
    
	jsGame.prototype.getNoGrowthCycles = function(){
		return this.noGrowthCycles;
    }
   
	jsGame.prototype.recordNoGrowthCycle = function(){
	
		this.noGrowthCycles = this.noGrowthCycles + 1;
    }
    
	jsGame.prototype.clearNoGrowthCycles = function(){
		this.noGrowthCycles=0;
    }
 
    
    /**
     * Add container property and method in Cell prototype to hold crop object
     */
    Cell.prototype.crop = "";
    Cell.prototype.setCrop = function (crop){
	this.crop = crop;
    }
  
    /**
     * Crop Object
     *  - Must be able to keep track of age, growth stage and
     *     other important qualities of heatlh
     *  - TODO: support for own harvest stage
     */
    function Crop(str){
		this.name=str;
		this.id=0;
		this.age=0;
		this.alive=0;
		this.stage=0;
		this.needWater=0;
		this.hasInsects=0;
		this.harvestTime=0;
		this.wasHarvested=0;
		this.value=0;
    }
    
    /**
     * increment age/stage of this crop 
     * 
     */
    Crop.prototype.grow = function(){
		this.age++;
		this.stage++;
		// TODO: logic relationship between age and stage
    }

    /** Mark this crop harvested */
    Crop.prototype.harvest = function(){
		this.wasHarvested = 1;
    }
   
    /** report properties of this crop to console */ 
    Crop.prototype.report = function(){
		console.group("Crop Report:");
		console.log("NAME:"+this.name);
		console.log("ID:"+this.id);
		console.log("AGE:"+this.age);
		console.log("STAGE:"+this.stage);
		console.log("ALIVE:"+this.alive);
		console.log("NEED WATER:"+this.needWater);
		console.log("HAS INSECTS:"+this.hasInsects);
		console.log("Harvest time:"+this.havestTime);
		console.log("Was harvested:"+this.wasHarvested);
		console.log("VALUE:"+this.value);
		console.groupEnd("Crop Report");
    }
  
    function makeSeed(str,value){
		var c = new Crop(str);
		c.id=1;
		c.age=1;
		c.alive=1;
		c.stage=1;
		c.value=value;
		return c;
    }
    
  
  
    /**
     *
     * BOARD FEATURES FOR FARMVILLES TYPE
     *
     *
     */
    
   
    /** board needs to store color of growth stages for it's crop type */
    Board.prototype.colors = ['','yellow','orange','pink','red','brown','black'];
    
    /** method to return crop color based on stage int */
    Board.prototype.getColor = function(num){
		var n = parseInt(num);
		if(num > this.colors.length){
			return this.colors[this.colors.length];
		}else{
			return this.colors[num];
		}
    }
    
    /** render cell as color */
    Board.prototype.renderCell = function(id){
		var str = id.split("_");
		var i = parseInt(str[1]);
		var color = this.getColor(this.board[i].clicks);
		jQuery("#"+id).css('border-color','black').css('background-color', color).html("");
	}
    
    
    
    
       /** render cell as color */
    Board.prototype.renderSeed = function(id){
		var str = id.split("_");
		var i = parseInt(str[1]);
		jQuery("#"+id).css('border-color','black').css('text-algin','center').css('top','2px').css('background-color', 'white').html("*");
	 }
    
    /** store click counts for each crop cell */
    Board.prototype.clicker = function(id){
		var str = id.split("_");
		var i = parseInt(str[1]);
		this.board[i].clicks++;
		jsGame.log(id+":["+this.board[i].clicks+"]");    
    }
    
 
 
    
  
