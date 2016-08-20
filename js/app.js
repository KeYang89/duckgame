var hatchtime=2100;
var bubbletime=2700;
var money = 15;
var count=0;
$('#moneybag').html(money);//init
$('<div class="speakbubble small">Sell eggs to get cool items!</div>').insertBefore('#moneybag');

function goodies(){
}

function elixir(){
	cleanbubble();
	if (money>=20){
	money=money-20;
 	$('#elixir').addClass('rotated');
 	$('.bottle_top').addClass('rotatespin');
 	$('.bottle_inner>.water').addClass('pour');
 	$('#moneybag').html(money);
 	setTimeout(function(){
					 	$('#elixir').removeClass('rotated');
 						$('.bottle_top').removeClass('rotatespin');
 						$('.bottle_inner>.water').removeClass('pour');}, 3000);
	}
	else {
		$('<div class="speakbubble small hint">Elixir costs 20$<br>Try something else!</div>').insertBefore('#moneybag');
	}
}
function birds(){
	var randomtime=Math.floor(Math.random() * bubbletime)+4000;
	var randomlocationX=Math.floor(Math.random() * 100);
	var randomlocationY=Math.floor(Math.random() * 200);
	function raven(){
		function init(t,x,y){
			$('.raven').remove();
			$('<div class="raven">··</div>').appendTo('#birds');
			$('#birds').css({"left":x,"top":y});
			$('#birds').animate({left:"+=1200",top:y},t, flyaway());
		}
		function stealfish(){};
		function flyaway(){
			function gone(){
				$('.raven').fadeOut();
				};
	  			setTimeout(gone,randomtime);
			};

		init(randomtime,randomlocationX,randomlocationY);
	};
   setTimeout(raven,randomtime);
}
function cleanbubble() {
	$('.speakbubble').addClass('past');
	$('.past').remove();	
}
function choice(e){
	function eggChoice(e) {
	 	this.e=e;
	 	cleanbubble();
	 	if (!$(e).hasClass("sold")){
		 $('<div class="speakbubble choice"><button onClick="hatchEgg(e)">Hatch</button> <button onClick="sellEgg(e)">Sell</button></div>').insertBefore(e);
	 	}
	}
	function ducklingChoice(e) {
	 	this.e=e;
	 	cleanbubble();
		$('<div class="speakbubble choice"><button onClick="eatFish(e)">Eat</button> <button onClick="passFish(e)">Pass to Others</button></div>').insertBefore(e);
	}
	if ( $(e).hasClass("duckegg")) {eggChoice(e);}
	else if ($(e).hasClass("hatched") && $(e).hasClass("hasfish")) {ducklingChoice(e);}
	else if ($(e).hasClass("nofish")) {catchFish(e);}
	else {
	//duckchoice
	}
}
function hatchEgg(e) {
	   cleanbubble();
		var imgUrlegg = 'img/break-egg.gif';
    	$(e).attr('src',imgUrlegg);
    	$(e).removeAttr('id');
    	$(e).removeClass('duckegg');
    	$(e).addClass("hatched");
    	$(e).addClass("nofish");
    	duckling(e);
   }
function digesting(e){
		if($(e).width()<120){
			grow(e);
		}
			layEgg(e);
			
}
function duckling(e){
		setTimeout(function(){
			var imgUrlduckling= 'img/ducklingInSea.gif';
			$(e).attr('src',imgUrlduckling);
			ducklingtip(e);
		},hatchtime);
		birds();
		poop(e);
		die();
	}
function grow(e){
	$(e).addClass("fleging");
	setTimeout(function() {
					$(e).animate({"height":"+=25px","top":"-=12px"},500)
					},1000);	
	layEgg(e);
}
function tip(text,e){
  	setTimeout(function(){
  		$(text).insertBefore(e);
  		},200);	
  	cleanbubble();
 }
function ducklingtip(e){
  var randomtime=Math.floor(Math.random())+1;
  cleanbubble();
 switch (count) {
  case 0:
  		tip('<div class="speakbubble">Kwak! Feed me please! Kwak!</div>',e);
		count++;
	break;
  
  case 1:
 		tip('<div class="speakbubble">I can catch fish! I can grow!</div>',e);
		count++;
  case 2:
  		tip('<div class="speakbubble">When I grow up I can lay eggs! Kwak!</div>',e);
  		count++;
  default:
  		tip('<div class="speakbubble">I can also feed my friends, and fish...</div>',e);

 }
  setTimeout(function(){
  		$('.speakbubble').remove()
  	},bubbletime);
}
function sellEgg(e) {
	cleanbubble();
	$('.coin').remove();
	$(e).fadeOut("slow",shake(50,e,4,8));
	$(e).addClass("sold");
  	
  	$('.small').fadeOut();
  	if ($(e).hasClass("veryrare")){
  		money+=5;
		releaseCoin.gold();
  	}
  	else if ($(e).hasClass("rare")) {
  		money+=2;
		releaseCoin.silver();
  	}
  	else {
  		money+=1;
  		releaseCoin.bronze();
  	}
  	$('#moneybag').html(money);
}
var releaseCoin ={

 	bronze: function() { tip('<div class="coin bronze"><p>1</p></div>',$('#moneybag'));},
    silver: function() {tip('<div class="coin silver"><p>2</p></div>',$('#moneybag'));},
 	gold: function() {tip('<div class="coin gold"><p>5</p></div>',$('#moneybag'));}
}
function catchFish(e) {
	$('.fish').click(dive(400,e,1,100));
    //poop(e,"bigpoop");
}
function poop(e,size) {
	if (size=="bigpoop"){
			$('<div class="poop" id="bigpoop">.</div>').insertBefore(e); 
				setTimeout(function(){
					$('#bigpoop').fadeOut('slow');
  					$('#bigpoop').remove();}, 3000);
	}
	else {
			setInterval(function(){ 
				$('<div class="poop">.</div>').insertBefore(e); 
				setTimeout(function(){
					$('.poop').fadeOut('slow');
  					$('.poop').remove();}, 5000);
		}, 4000);
	}
}

function age() {
//to be continued
}
function layEgg(e) {
	if($(e).width()>120){
 	$(e).removeClass("fleging");
 	$(e).addClass("mature");
 	$('<div class="eggwrap newegg"><img draggable="true" src="img/egg-female.png" class="duckegg" onClick="choice(this)"></div>').appendTo('.ducks-offspring'); 
	}
	shake(200,'.newegg',2,30);
}
function passFish(e) {
	$('.choice').remove();
	var imgUrlpass= 'img/ducklingInSea.gif';
    	$(e).attr('src',imgUrlpass);
    	$(e).addClass("nofish");
    	$(e).removeClass("hasfish");
}
function eatFish(e) {
	cleanbubble();
	$('<div class="speakbubble">Yummmm</div>').insertBefore(e);
	$('.speakbubble').fadeOut('slow');
	digesting(e);
	var imgUrleat= 'img/ducklingInSea.gif';
    	$(e).attr('src',imgUrleat);
    	$(e).addClass("nofish");
    	$(e).removeClass("hasfish");
}
function die() {
	//to be continued
}
function shake(i,e,t,d) {
    var interval = i;                                                                                                 
    var distance = d;                                                                                                  
    var times = t;                                                                                                      

    $(e).css('position','relative');                                                                                  

    for(var iter=0;iter<(times+1);iter++){                                                                              
        $(e).animate({ 
            left:((iter%2==0 ? distance : distance*-1))
            },interval);                                   
    }//for                                                                                                              

    $(e).animate({ left: 0},interval); 
}
function dive(i,e,t,d) {
    var interval = i;                                                                                                 
    var distance = d;                                                                                                  
    var times = t;                                                                                                      

    $(e).css('position','relative');                                                                                  
	$(e).css('transform','perspective(100px) rotateX(-60deg);');
    for(var iter=0;iter<(times+1);iter++){                                                                              
        $(e).animate({ 
            top:((iter%2==0 ? distance : 0))
            },interval);                                   
    }                                                                                                             
    $(e).animate({ top: 0},interval, checkCollisions(e,$('.fish'))); 
}
function getPositions(box) {
  var $box = $(box);
  var pos = $box.offset();
  var width = $box.width();

  return pos.left;
}
        
function comparePositions(p1, p2) {
  var enoughClose= p1-p2;
  if (enoughClose < 50){
  	return true;
	}
  else {
  	return false;
  }
}

function checkCollisions(target1,target2){
  var pos = getPositions(target1);
  var pos2 = getPositions(target2);
  var horizontalMatch = comparePositions(pos, pos2);          
  var match = horizontalMatch;

  if (match&&$(target1).hasClass("nofish")) {
	var imgUrlcatch = 'img/duckEatFish.gif';
    	setTimeout(function(){$(target1).attr('src',imgUrlcatch);},400);
    	$(target1).addClass("hasfish");
    	$(target1).removeClass("nofish");

	}
}