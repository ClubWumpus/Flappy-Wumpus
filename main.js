$(document).ready(function(){

	var $vm = new Vue({
		el: '#sound-control',
		data:{
			sound_control: 50,
			backgroundAudio: null,
			playing: true,
		},
		computed:{
			real_sound_level: function(){
				return this.sound_control/100;
			}
		},
		watch: {
			'real_sound_level': function (newVolume) {
				this.backgroundAudio.volume = newVolume;
			},
		},
		methods:{
			toggleAudio(){
				this.playing = ! this.playing;

			},
		},

		mounted(){
			this.backgroundAudio = new Audio('sounds/FlappilyWumped.mp3');
			this.backgroundAudio.autoplay = true;
			this.backgroundAudio.loop = true;
			this.backgroundAudio.volume = this.real_sound_level;
		}
	});

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
	
var iframeID = document.getElementById("modalIFrame"); 
//focus the IFRAME element 
$(iframeID).focus(); 
//use JQuery to find the control in the IFRAME and set focus 
$(iframeID).contents().find("#game-container").focus();

});


