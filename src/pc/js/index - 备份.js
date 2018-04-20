var socket = io();
var idArr = [];
var randomNumLeft;
var randomNumTop;
var round;
var currentColor = 'blue';
var myTop;
var shakeSpend = 0;

// socket.on('loginSuccess',function(msg){
// 	var temp = msg.phoneId;
// 	idArr[temp] = msg.color;
// 	currentColor = idArr[temp];
// 	// console.log(msg);
// });

socket.on('ballPosition',function(msg){
	var temp = msg.phoneId;
	idArr[temp] = msg.color;
	currentColor = idArr[temp];
	randomNumLeft = Math.random() * 1920;
	randomNumTop = Math.random() * 1080;
	round = Math.random() * 100;
	var nowTimeId = new Date().getTime();
	var mydiv = document.createElement('div');
	// console.log(1212);
	// console.log(mydiv);
	$(mydiv).addClass('balls demo'+nowTimeId).css({
		'position':'absolute',
		'width':round,
		'height':round,
		'border-radius':'50%',
		'box-shadow': '0 0 6px' + currentColor,
		'left':randomNumLeft,
		'top':'100vh',
		'background-color':currentColor,
		'opacity':'0.5',
		'transition':'all 5s'
	});
	$('#box').append(mydiv);
	setTimeout(function(){
		$('.demo'+nowTimeId).attr('finished','true');
	},5000);
	// console.log($('.demo'+nowTimeId).css('top'));
	setTimeout(function(){
		$('.demo'+nowTimeId).css('top','-100vh');
	},10);

});
setInterval(function(){
	$('.balls[finished=true]').remove();
},3000);



