/***
 *      _           _                 _            _    
 *     | |         | |               | |          | |   
 *     | |__   ___ | |__   ___     __| |_   _  ___| | __
 *     | '_ \ / _ \| '_ \ / _ \   / _` | | | |/ __| |/ /
 *     | | | | (_) | |_) | (_) | | (_| | |_| | (__|   < 
 *     |_| |_|\___/|_.__/ \___/   \__,_|\__,_|\___|_|\_\
 *                                                      
 * I wish you like this game, or find the script useful in some wway. 
 * If you have any question, drop me a line: yangkecoy@gmail.com
 * Engjoy coding.                                                      
 */
var hatchtime=2100;
var bubbletime=2700;
var money = 25;
var ducklingwords=0;
var rownum=0;
var dirnum=0;
var dir=[90,-270,270,450,-450,-630];
var hasrarefish=false;
var hasrareduck=false;
var rareducknum=0;
var rarefishnum=0;
var ducknum=2;//eggs, ducks and ducklings
var sellnum=0;//sold eggs
var vacantnum=0;
var hatchnum=0;//ducks and ducklings
var duckperRow=14;
var levelupducknum=2+duckperRow*rownum;
var rareduckmessage=true;
var hasvacant=false;
$('#moneybag').html(money);//init
var levelup=false;
// if you want to make this game more dynamic, you can add this
// var duckgroup =
// {
// duckdata:[],
// eggdata:[]
// };
$(".progressmessage").hide();
var progressmessage=[
	'Thanks for the elixir! You now have a rare mutant duck! A pair of them can produce really cool eggs!',
	'Wow, you are Level 2 now! You receive one silver coin for bonus!',
	'Wow, you are Level 3 now! You receive two gold coins for bonus!',
	'Congratulations! You are Level 4 now!You receive another three gold coins for bonus! Try the elixir!',
	'You got a pair of mutants! Feed them, and check their eggs!',
	'Catch the rare fish before they leave!<br> Feed your baby ducklings! Rare fish can turn your ducklings into a mutant.'
]
$('<div class="speakbubble small">Sell eggs to get cool items!</div>').insertBefore('#moneybag');
var randomquotes=["It takes more than one rare duck to make rare eggs!","When in doubt, mumble.","I intend to live forever. So far, so good.","Artificial intelligence is no match for natural stupidity.","Change is inevitable, except from a vending machine.",
"We never really grow up, we only learn how to act in public.","My creator thinks I am too cute to be real.","Laugh at your problems, everybody else does.","A clear conscience is usually the sign of a bad memory.",
"You're never too old to learn something stupid.","He who smiles in a crisis has found someone to blame."]

//set seagrass
grass(200,0);
function progress(num){
			$(".progressmessage").html(progressmessage[num]);
			$(".progressmessage").show();
			$(".progressmessage").fadeOut(4500);
}
function eggholder(dirnum){
	var holderstring='<div class="holder newholder"><div class="floatingmaterial"></div><div class="floatingmaterial fmbottomleft"></div><div class="floatingmaterial fmbottomright"></div></div>';
	var marginstring='calc(50%';
	$(holderstring).insertAfter('.current');
	var num=dir[dirnum];
	if (num>0){
	marginstring=marginstring+' + '+ num+'px)';
	//console.log(marginstring);
	}
	else{
	num=Math.abs(num);
	marginstring=marginstring+' - '+ num+'px)';
	//console.log(marginstring);
	}
	$('.newholder').css('margin-left',marginstring);
	$('.holder').removeClass('newholder');
}
function grass(num,nutrient) {
var numberOfBlades = num;
var grass = document.getElementsByClassName('grass')[0];
function assignRandomStyles(blade) {
  var randomHeight =  Math.floor(Math.random() * 20)+nutrient;
  var randomLeft = Math.floor(Math.random() * (window.innerWidth - 8));
  var randomRotation = Math.floor(Math.random() * 10) - 5;
  blade.style.height = (randomHeight + 10) + 'px';
  blade.style.zIndex = randomHeight;
  blade.style.opacity = randomHeight * 0.02;
  blade.style.left = randomLeft + 'px';
  blade.style.transform = 'rotate(' + randomRotation + 'deg)';
}
for (var i = 0; i < numberOfBlades; i++) {
  var blade = document.createElement('div');
  assignRandomStyles(blade);
  grass.appendChild(blade);
}
}
//end of seagrass setting
function ballooninfo(){
	$('#ballooninfo').show();
	$('#ballooninfo').fadeOut(3000);	
}
function moneybaginfo(){
	$('#moneybaginfo').show();
	$('#moneybaginfo').fadeOut(3000);	
}
function floatinginfo(){
	$('#floatinginfo').show();
	$('#floatinginfo').fadeOut(3000);	
}
function elixirinfo(){
	$('#elixirinfo').show();
	$('#elixirinfo').fadeOut(3000);	
}
function shrimpinfo(){
	$('#shrimpinfo').show();
	$('#shrimpinfo').fadeOut(3000);	
}
function owlinfo(){
	$('#owlinfo').show();
	$('#owlinfo').fadeOut(3000);	
}
function owl(){
	cleanbubble();
	$('#owlinfo').remove();
	if (money>=2){
	money=money-2;
$('#wind').show();
$('.raven').remove();
$('.owlwrap').hide();
$('#moneybag').html(money);
setTimeout(function(){
					$('#wind').hide();
					$('<div class="raven">..</div>').appendTo('#birds');
					$('.owlwrap').show();}, 8000);
	}
	else {
		$('<div class="speakbubble small hint">Owl costs $2<br>Try something else!</div>').insertBefore('#moneybag');
	}
}
function fishgrow(){
	var randomsize1=Math.floor(Math.random()*20);
	var randomsize2=Math.floor((1-Math.random())*20);
	var fishsize1=$('.regularfish1').width()+randomsize1;
	var fishsize2=$('.regularfish2').width()+randomsize2;
	$('.regularfish1').width(fishsize1);
	$('.regularfish2').width(fishsize2);
}
function shrimp(){
cleanbubble();
$('#shrimpinfo').remove();
if (money>=5){
	money=money-5;
$('.shrimpwrap').addClass('rotatebag');
$('.shrimp').addClass('rotatedrop');
$('#moneybag').html(money);
setTimeout(function(){
					fishgrow();
					$('.shrimpwrap').removeClass('rotatebag');
					$('.shrimp').removeClass('rotatedrop');}, 1600);
	}
	else {
		$('<div class="speakbubble small hint">Shrimp costs $5<br>Try something else!</div>').insertBefore('#moneybag');
	}
}
function elixir(){
	cleanbubble();
	progress(5);
	$('#elixirinfo').remove();
	if (money>=20){
	money=money-20;
	hasrarefish=true;
 	$('#elixir').addClass('rotated');
 	$('.bottle_top').addClass('rotatespin');
 	$('.bottle_inner>.water').addClass('pour');
 	$('#moneybag').html(money);
 	$('<div class="waterout"><div class="clover dropleave"><div class="leaves"><i class="leave angleN"></i><i class="leave angleS"></i><i class="leave angleW"></i><i class="leave angleE"></i></div><i class="branch"></i></div><div class="dropleave"><div class="jellyfish"><div class="jellyfish_head"></div><div class="jellyfish_tail"><div class="jellyfish_tail_in"></div></div></div></div>').insertAfter('#elixir');
 	setTimeout(function(){
					 	$('#elixir').removeClass('rotated');
 						$('.bottle_top').removeClass('rotatespin');
 						$('.bottle_inner>.water').removeClass('pour');
 						$('<div class="veryrarefish"></div>').appendTo('.fishgroup1');
 						$('<div class="rarefish"></div>').appendTo('.fishgroup2');
 					}, 3000);
 setTimeout(function(){
 	$('.rarefish').remove();
	$('.veryrarefish').remove();
	//hasrarefish=false;
},30000);
	}
	else {
		$('<div class="speakbubble small hint">Elixir costs $20<br>Try something else!</div>').insertBefore('#moneybag');
	}
}
function birds(){
	var randomtime=Math.floor(Math.random() * bubbletime)+4000;
	var randomlocationX=Math.floor(Math.random() * 100);
	var randomlocationY=Math.floor(Math.random() * 200);
	function raven(){
		function init(t,x,y){
			setInterval(function(){
			$('.raven').show();
			$('.seagull').show();
			$('.raven').css({"left":1800,"top":y});
			$('.seagull').css({"left":-80,"top":x});
			$('.raven').animate({left:"-80",top:y},t, flyaway());
			$('.seagull').animate({left:"+=1000",top:x},t, flyaway());
			},4000);
		}
		function stealfish(){};
		function flyaway(){
			function gone(){
				$('.raven').fadeOut();
				$('.seagull').fadeOut();
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
		$('<div class="speakbubble choice"><button onClick="eatFish(e)">Eat</button> <button onClick="passFish(e)">Feed Others</button></div>').insertBefore(e);
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
	   hatchnum+=1;
		var imgUrlegg = 'img/break-egg.gif';
    	$(e).attr('src',imgUrlegg);
    	$(e).removeAttr('id');
    	$(e).removeClass('duckegg');
    	$(e).removeClass('newegg');
    	$(e).addClass("hatched");
    	$(e).addClass("nofish");
    	duckling(e);
   // if you want to make this game more dynamic, you can use this
   //  	duckgroup.duckdata.push (
   //  	{
   //  		id:hatchnum,
			// locationX:Math.floor(rownum),
			// locationY:hatchnum-Math.floor(rownum)*duckperRow,
   //  	}
   //  	);
   }
function digesting(e){
		if(($(e).width()<112) && (!$(e).hasClass("mature"))){
			grow(e);
		}
		else {
			$(e).removeClass("fleging");
 			$(e).addClass("mature");
 			duck(e);
			layEgg(e);
		}			
}
function duck(e){
		setTimeout(function(){
			if ($(e).hasClass('rareduck')){
			var imgUrlduck='img/rareduck.gif';
			if (rareduckmessage){
				progress(0);
				rareduckmessage=false;
			}
			if (rareducknum>1){
				progress(4);
			}
			}
			else{
			var imgUrlduck= 'img/duck.gif';
			}
			$(e).attr('src',imgUrlduck);
		},220);	
		setTimeout(function(){
			$('.holder-init').css("margin-top","-160px");
			//$('<div class="speakbubble">Yeah more!</div>').insertBefore(e);
			$('.holder-init >.fmleft').css("margin-top","60px");
			$('.holder-init >.fmright').css("margin-top","60px");
			$('.holder-init >.fmleft').css("transform","rotate(30deg)");
			$('.holder-init >.fmright').css("transform","rotate(-30deg)");
		},420);
		cleanbubble();	
		birds();
		poop(e);
		die();
	}
function duckling(e){
		setTimeout(function(){
			var imgUrlduckling= 'img/duckling.gif';
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
					$(e).animate({"height":"+=25px","margin-top":"-=12px"},500);
					$('.newrow').animate({"margin-top":"-=6px"});
					},1000);
}
function tip(text,e){
  	setTimeout(function(){
  		$(text).insertBefore(e);
  		},200);	
  	cleanbubble();
 }
 function ducktip(e){
  var randomtime=Math.random();
  var randomindex=Math.floor(randomtime*10);
  var randomquote='<div class="speakbubble">'+randomquotes[randomindex]+'</div>';
  cleanbubble();
  tip(randomquote,e);
  setTimeout(function(){
  		$('.speakbubble').remove()
  	},bubbletime);
}
function ducklingtip(e){
  var randomtime=Math.random();
  var randomindex=Math.floor(randomtime*10);
  var randomquote='<div class="speakbubble">'+randomquotes[randomindex]+'</div>';
  cleanbubble();
 switch (ducklingwords) {
  case 0:
  		tip('<div class="speakbubble">Kwak! Feed me please! Kwak!</div>',e);
		ducklingwords++;
	break;
  
  case 1:
 		tip('<div class="speakbubble">I can catch fish! I can grow!</div>',e);
		ducklingwords++;
		break;
  case 2:
  		tip('<div class="speakbubble">When I grow up I can lay eggs! Kwak!</div>',e);
  		ducklingwords++;
  		break;
 case 3:
  		tip('<div class="speakbubble">When I grow up I can lay eggs! Kwak!</div>',e);
  		ducklingwords++;
  		break;
  default:
  		tip(randomquote,e);
  		break;
 }
  setTimeout(function(){
  		$('.speakbubble').remove()
  	},bubbletime);
}
function sellEgg(e) {
	sellnum+=1;
	vacantnum+=1;
	cleanbubble();
	$(e).parent().parent().addClass('hasvacant');
	hasvacant=true;
	$('.coin').remove();
	ducknum=ducknum-1;
	$(e).fadeOut("slow",shake(50,e,4,8));
	$(e).addClass("sold");
  	
  	$('.small').fadeOut();
  	if ($(e).hasClass("veryrareduck")){
  		money+=5;
		releaseCoin.gold();
  	}
  	else if ($(e).hasClass("rareduck")) {
  		money+=2;
		releaseCoin.silver();
  	}
  	else {
  		money+=1;
  		releaseCoin.bronze();
  	}
  	setTimeout(function(){
  	$('#moneybag').html(money);},600);
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
				$('.poop').remove();
				$('<div class="poop">.</div>').insertBefore(e); 
				setTimeout(function(){
					$('.poop').fadeOut('slow');
  					}, 4000);
		}, 4000);
	}
}

function age() {
//to be continued
}
function addrow(){
	var growRate=1.0/duckperRow;
	rownum=rownum+growRate;
	if (ducknum<levelupducknum-2) {
		//if eggs wore sold on lower rows

	}
	else {
	if (Math.floor(rownum)<Math.floor(rownum+growRate)){
		rownum=Math.floor(rownum+growRate);
		levelup=true;
		var progressindex=rownum;
		progress(progressindex);
				rowClass='row'+rownum;
				rowMarginTop=rownum*(-120)+'px';
				$('<div class="newrow"></div>').appendTo('.ducks-offspring');
				$('.newrow:nth-last-of-type(1)').addClass(rowClass);
				$('.newrow:nth-last-of-type(1)').css("margin-top",rowMarginTop);
		}
	}
}
function layEgg(e) {
	cleanbubble();
 	ducknum=ducknum+1;
 	var eggobj={
 		regular:'<div class="eggwrap newegg"><img draggable="true" src="img/egg-female.png" class="duckegg" onClick="choice(this)"></div>',
 		rare: '<div class="eggwrap newegg"><img draggable="true" src="img/rareEgg.gif" class="duckegg rareduck" onClick="choice(this)"></div>'
 	}
 	if (vacantnum>0) {
 		vacantnum-=1;
 		if (rareducknum<2){
 		setTimeout(function(){$(eggobj.regular).appendTo('.hasvacant')},400); 
 		}
 		else {
		setTimeout(function(){$(eggobj.rare).appendTo('.hasvacant')},400); 
		}
		//hasvacant=false;
 	}
 	else {
 		if (rareducknum<2){
 		setTimeout(function(){$(eggobj.regular).appendTo('.newrow:nth-last-of-type(1)')},400); 
		}
		else {
		setTimeout(function(){$(eggobj.rare).appendTo('.newrow:nth-last-of-type(1)')},400); 
		}
	}
	
	if (dirnum < 6){
	eggholder(dirnum);
	//eggholder for the first row
	rownum=rownum+1.0/duckperRow;
	dirnum=dirnum+1;
	}
	else {
		if (rownum < 4){
			addrow();
				if (levelup && rownum==1){
				
				releaseCoin.silver();
				money+=2;
				$('#moneybag').html(money);
				levelup=false;
				}
		
				if (levelup && rownum==2){
				
				releaseCoin.gold();
				money+=10;
				$('#moneybag').html(money);
				levelup=false;
				}

				if (levelup && rownum==3){
				
				releaseCoin.gold();
				money+=15;
				$('#moneybag').html(money);
				levelup=false;
				}
			}
		else {
			gameover();
			}
	}
shake(200,'.newegg',2,30);	
}
function gameover() {
	$('.balloonstaticwrap').addClass('balloonwrap');
	$('.balloonwrap').removeClass('balloonstaticwrap');
	$('<div id="gameovermessage"><img src="img/duckling.gif"  width="100" align="left"><p>The game is over, and I hope you enjoy it.<img src="img/fish_left.gif"  width="80" align="right"><img src="img/fish_right.gif"  width="80" align="right"></p><iframe src="https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Fwww.narrativecard.com%2Fduckgame&layout=button_ducklingwords&size=large&mobile_iframe=true&width=83&height=28&appId" width="83" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe></div>').appendTo("#sea");		
}
function passFish(e) {
	$('.choice').remove();
	if ($(e).hasClass('mature')){
		if ($(e).hasClass('rareduck')){
		var imgUrlpass= 'img/rareduck.gif';
		}
		else {
		var imgUrlpass= 'img/duck.gif';
		}
	}
	else{
	var imgUrlpass= 'img/duckling.gif';
	}
    	$(e).attr('src',imgUrlpass);
    	$(e).addClass("nofish");
    	$(e).removeClass("hasfish");
	}
function eatFish(e) {
	cleanbubble();
	if($(e).hasClass("hasfish")){
	$('<div class="speakbubble">Yummmm</div>').insertBefore(e);
	$('.speakbubble').fadeOut('slow');
	digesting(e);
	if ($(e).hasClass('mature')){
		if($(e).hasClass('rareduck')){
		var imgUrleat= 'img/rareduckEat.gif';
		var eatTime=1200;
		}
	    else{
		var imgUrleat= 'img/duckEat.gif';
		var eatTime=1000;
		}
	}
	else{
	var imgUrleat= 'img/ducklingEat.gif';
	var eatTime=800;
		if (hasrarefish) {
			hasrarefish=false;
			hasrareduck=true;
			if (!$(e).hasClass('rareduck')){
					$(e).addClass('rareduck');
					rareducknum=rareducknum+1;
				}	
			$('.rarefish').remove();
		}				
	}
    	$(e).attr('src',imgUrleat);
    	setTimeout(function(){
    	imgUrleat=imgUrleat.replace("Eat", "");$(e).attr('src',imgUrleat);},eatTime);
    	$(e).addClass("nofish");
    	$(e).removeClass("hasfish");
    }
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
  		if ($(target1).hasClass('mature')){
  			if ($(target1).hasClass('rareduck')){
				var imgUrlcatch= 'img/rareduckCatchFish.gif';
			}
			else {
				var imgUrlcatch= 'img/duckCatchFish.gif';
			}
		}
		else{
			var imgUrlcatch= 'img/ducklingCatchFish.gif';
			}
    	setTimeout(function(){$(target1).attr('src',imgUrlcatch);},200);
    	$(target1).addClass("hasfish");
    	$(target1).removeClass("nofish");

	}
}