$(document).ready(function(){

// Displaying random banner ads below the game
var bannerArray = [
	{"url":"https://www.youtube.com/watch?v=POnldqfm3Rw","banner":"img/trailerad.png"},
	{"url":"https://www.youtube.com/watch?v=POnldqfm3Rw","banner":"img/malloryad.png"},
	{"url":"https://twitter.com/hashtag/MakeFlappyWumpusGreatAgain?src=hash","banner":"img/electionad.png"},
	{"url":"https://soundcloud.com/cheesecast/its-time-to-softsoap","banner":"img/songad.png"},
	{"url":"https://www.youtube.com/watch?v=xUVz4nRmxn4","banner":"img/milliondollarsad.png"},
        {"url":"https://twitter.com/hashtag/MakeFlappyWumpusGreatAgain?src=hash","banner":"img/mfwgaad.png"}]

var selectBanner = bannerArray[Math.floor(Math.random()*bannerArray.length)];

$('#bottom-banner__inner').html('<a target="_blank" href="' + selectBanner.url + '"><img src="' + selectBanner.banner + '" alt="Random Banner" /></a>');

// Adding background audio + reducing volume
var backgroundAudio=new Audio('sounds/FlappilyWumped.mp3');
backgroundAudio.autoplay = true;
backgroundAudio.loop = true;
backgroundAudio.volume=0.5;
	
var iframeID = document.getElementById("modalIFrame"); 
//focus the IFRAME element 
$(iframeID).focus(); 
//use JQuery to find the control in the IFRAME and set focus 
$(iframeID).contents().find("#game-container").focus(); 

});
