$(document).ready(function(){

var bannerArray = [{"url":"https://www.youtube.com/watch?v=POnldqfm3Rw","banner":"https://flappy.clubwump.us/img/trailerad.png"},{"url":"https://www.youtube.com/watch?v=POnldqfm3Rw","banner":"https://flappy.clubwump.us/img/trailerad.png"}]

var selectBanner = bannerArray[Math.floor(Math.random()*bannerArray.length)];

$('#random-banner').html('<a href="' + selectBanner.url + '"><img src="' + selectBanner.banner + '" alt="Random Banner" /></a>');

});
