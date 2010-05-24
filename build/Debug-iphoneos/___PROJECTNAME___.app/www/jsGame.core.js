 
 /**
  *
  *	jsGame Grid Engine
  *	Anthony DeStefano 2/27/2010
  *
  *	Build a simple grid 'board' of n Cells. Each Cell can contain any object
  *	Each Board object will have a simple API for accessing and updating any Cell on the board.
  *     Different functionality can be added by prototyping Cell and Board objects.
  *
  */
 
 
 
    /**
     *	jsGame Object
     *
     *
     */
    function jsGame(){
		this.timestamp;
		this.debug = 1;
		this.init();
    }
    
    /** write text to web kit console log */
    jsGame.prototype.log = function(str){
		if(this.debug){
			if(window.console && window.console.log){
              console.log(str);
			}
		}
    }
   
    jsGame.prototype.init = function(){
		this.timestamp = this.gDateStamp();
		this.log("New Game Started: "+this.timestamp);
	
    }
   
    /** Return randNumber between 'limit' [and 'lowerLimit'] */
    jsGame.prototype.gRandNum = function( limit , lowerLimit){
        if(lowerLimit > 0){
          return randomnumber=Math.floor((limit - 1)*Math.random()) + lowerLimit;
        }else{
          return randomnumber=Math.floor(Math.random()*limit);
        }
    }
   
    /** return timestamp */
    jsGame.prototype.gDateStamp = function(){
        var d=new Date();
        var weekday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
        var monthname=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
        return weekday[d.getDay()] + " " + d.getDate() + ". " + monthname[d.getMonth()] + " "+d.getFullYear();
    }


    /** serialize object into JSON */
    jsGame.prototype.makeJSON = function( obj ){
	return JSON.stringify(obj);
    }
    /** unserialize JSON back into obj */
    jsGame.prototype.readJSON = function( json_str ){
	var OBJ = JSON.parse( json_str );
	
    }



 
  /**
     * CELL Object 
     *  - playable tile each cell must have a unique id that matches the div id on the board
     *
     */
    function Cell(id){
        this.id = id;
	this.clicks = 0;
    }
     
    
    
    
    
    

    /**
     *	Board Object 
     *	 - creates grid of cells (table cells) and API to manipulate them
     *	 * A 'wrapperDiv' is given a unique name (for positioning) 
     *	 * The created table is given a unique grid name: '<gridName>-table'
     */ 
    function Board(wrapperDiv, gridName, rows, cols, width){
	this.debug = 1;
	this.name = "";
	this.wrapperDiv = wrapperDiv;
	this.gridName = gridName;
	if( (typeof rows === "undefined") && (typeof cols === "undefined") ){
	    this.boardRows = 15;
	    this.boardCols = 26;
	}else{
	    this.boardRows = rows;
	    this.boardCols = cols;
	}
	if(typeof width === "undefined"){
	    //this.boardWidth = (this.boardCols * 20);
	
		this.boardWidth = 400;
	}else{
	    this.boardWidth = width;
	    
	}
	this.board = new Array();
	this.init();
    }
    
    /**
     * Setup board memory and render on screen
     */
    Board.prototype.init = function(){
        this.board = this.makeBoard(this.boardRows,this.boardCols);
        this.renderBoard(this.boardRows,this.boardCols);
	   
    }
 
    /**
     * you can have an element above the grid to hold a desc title
     *  - add element with class name of 'pageTitle'
     */
    Board.prototype.setTitle = function( str ){
	this.name = str;
	var target = '#'+this.wrapperDiv+' .pageTitle';
	jQuery(target).html(str);
    }
   
   
    /**
    * Make a simple matrix into a linear list
    *  Board = (rows * cols) = number of Cells
    *   - each cell can have a state and tracks content based on 'Cell prototype'
    *     Note: the "board" is also the actual table cells which must be rendered per state of the memory "cell" state
    *   * here we setup board memeory as a list and load each one with a Cell object
    */
    Board.prototype.makeBoard = function(rows,cols){
	    var b = Array();
	    var count = 0;
	     for(r=0;r<rows;r++){
		for(c=0;c<cols;c++){
	    		b[count] = new Cell(count);
			count++;
		    }
		    
		}
	    return b;
	}
        
	
    /**
    * create and add board HTML to the DOM
    *  - empty table cells with unique ids.
    *  param: rows - int
    *  param: cols - int
    */
    Board.prototype.renderBoard = function(rows, cols){
	var fog = " ";
	var str = "<table id='"+this.gridName+"-table' border='1' class='board-table-style' cellpadding='0' cellspacing='0' width='"+this.boardWidth+"' >";
	var count=0;
        for(r=0;r<rows;r++){
	    str = str + "<tr>";
	    for(c=0;c<cols;c++){
		str = str + "<td valign='center' align='center'  id='"+this.gridName+"_"+count+"' class='cell'>"+fog+"</td>";
		count++;
	    }
	str = str + "</tr>";
	}
	str += "</table>";
	jQuery('#'+this.wrapperDiv+' #'+this.gridName).append(str);
    }

    
    /** style all cells on the board to "on" */
    Board.prototype.showCells = function(){
        jQuery('#'+this.gridName+'-table td').each(function(){
	    var id = jQuery(this).attr('id');
	    jQuery(this).html(id).css('border-color','black');
	});
    }
    
    
    /** hide all cells on the board */
    Board.prototype.hideCells = function(){
        jQuery('#'+this.gridName+'-table td').each(function(){
	    jQuery(this).html("&nbsp;").css('border-color','white');
	});
    }
 
    /**
     * given a string id of format'<gridName>_<num>' split id and update cell 
     *
     **/ 
    Board.prototype.renderCell = function(id){
	var str = id.split("_");
	var i = parseInt(str[1]);
	jQuery('#'+this.gridName+"_"+i).css('border-color','black').html(this.board[i].id);
	
    }
    
    /**
     * Count and store clicks of a tile in it's Cell object
     */
    Board.prototype.clicker = function(id){
	var str = id.split("_");
	var i = parseInt(str[1]);
	this.board[i].clicks++;
	this.log(id+":["+this.board[i].clicks+"]");    
	    
            
    }
    
    
    /**
     * Print this Board Object's board memory to console log
     */
    Board.prototype.report = function(){
	var len = this.board.length;
	for(var z = 0; z < len; z++){
	    console.log(this.board[z].id);
	}
	
    }
 
    
 

    
  