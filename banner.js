$(document).ready(function(){

var bannerArray = [
  {"url":"https://www.youtube.com/watch?v=POnldqfm3Rw","banner":"https://flappy.clubwump.us/img/trailerad.png"},
  {"url":"https://www.youtube.com/watch?v=POnldqfm3Rw","banner":"https://flappy.clubwump.us/img/malloryad.png"},
  {"url":"https://clubwump.us/","banner":"https://flappy.clubwump.us/img/electionad.png"}]

var selectBanner = bannerArray[Math.floor(Math.random()*bannerArray.length)];

$('#bottom-banner__inner').html('<a href="' + selectBanner.url + '"><img src="' + selectBanner.banner + '" alt="Random Banner" /></a>');

});
