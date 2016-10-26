$(document).ready(function(){

var bannerArray = [{"url":"https://www.youtube.com/watch?v=POnldqfm3Rw","banner":"img/trailerad.png"},{"url":"https://www.youtube.com/watch?v=POnldqfm3Rw","banner":"img/malloryad.png"},{"url":"https://clubwump.us/","banner":"img/electionad.png"},{"url":"https://soundcloud.com/cheesecast/its-time-to-softsoap","banner":"img/songad.png"},{"url":"https://www.youtube.com/watch?v=xUVz4nRmxn4","banner":"img/adplacement.png"}]

var selectBanner = bannerArray[Math.floor(Math.random()*bannerArray.length)];

$('#bottom-banner__inner').html('<a target="_blank" href="' + selectBanner.url + '"><img src="' + selectBanner.banner + '" alt="Random Banner" /></a>');

    var backgroundAudio=document.getElementById("bg-audio");
    backgroundAudio.volume=0.5;
  
});
