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
	// console.log(msg);
	var temp = msg.phoneId;
	idArr[temp] = msg.color;
	currentColor = idArr[temp];
	randomNumLeft = Math.random() * 480;
	randomNumTop = Math.random() * 1080;
	round = Math.random() * 100;
	if(msg.netId == 1){
		console.log(11111);
		var nowTimeId1 = new Date().getTime();
		var mydiv1 = document.createElement('div');
		$(mydiv1).addClass('balls1 demo1'+nowTimeId1).css({
			'position':'absolute',
			'width':round,
			'height':round,
			'border-radius':'50%',
			'box-shadow': '0 0 6px' + currentColor,
			'left':randomNumLeft,
			'top':'100vh',
			'background-color':currentColor,
			'opacity':'1',
			'transition':'all 5s'
		});
		$('#box1').append(mydiv1);
		setTimeout(function(){
			$('.demo1'+nowTimeId1).attr('finished','true');
		},5000);
		setTimeout(function(){
			$('.demo1'+nowTimeId1).css('top','-100vh');
		},10);
	}
	if(msg.netId == 2){
		console.log(22222);
		var nowTimeId2 = new Date().getTime();
		var mydiv2 = document.createElement('div');
		$(mydiv2).addClass('balls2 demo2'+nowTimeId2).css({
			'position':'absolute',
			'width':round,
			'height':round,
			'border-radius':'50%',
			'box-shadow': '0 0 6px' + currentColor,
			'left':randomNumLeft,
			'top':'100vh',
			'background-color':currentColor,
			'opacity':'1',
			'transition':'all 5s'
		});
		$('#box3').append(mydiv2);
		setTimeout(function(){
			$('.demo2'+nowTimeId2).attr('finished','true');
		},5000);
		setTimeout(function(){
			$('.demo2'+nowTimeId2).css('top','-100vh');
		},10);
	}
	// var nowTimeId = new Date().getTime();
	// var mydiv = document.createElement('div');
	// // console.log(1212);
	// // console.log(mydiv);
	// $(mydiv).addClass('balls demo'+nowTimeId).css({
	// 	'position':'absolute',
	// 	'width':round,
	// 	'height':round,
	// 	'border-radius':'50%',
	// 	'box-shadow': '0 0 6px' + currentColor,
	// 	'left':randomNumLeft,
	// 	'top':'100vh',
	// 	'background-color':currentColor,
	// 	'opacity':'1',
	// 	'transition':'all 5s'
	// });
	// $('#box1').append(mydiv);
	// setTimeout(function(){
	// 	$('.demo'+nowTimeId).attr('finished','true');
	// },5000);
	// console.log($('.demo'+nowTimeId).css('top'));
	// setTimeout(function(){
	// 	$('.demo'+nowTimeId).css('top','-100vh');
	// },10);

});

var timer = setInterval(function(){
	$('.balls1[finished=true]').remove();
},3000);
setInterval(function(){
	$('.balls2[finished=true]').remove();
},3000);

setInterval(function(){
	var mytimeHours = new Date().getHours();
	var mytimeMinures = new Date().getMinutes();
	var mytimeSeconds = new Date().getSeconds();
	if(mytimeHours == 16 && mytimeMinures == 50 && mytimeSeconds == 50){
		$('.box_video').fadeOut('slow/400/fast', function() {
			$('.box_video').get(0).pause();
			$('.box_video').get(1).pause();
			$('.box_video').get(2).pause();
			$('.box_video').get(3).pause();
		});
	}
},1000);
setInterval(function(){
	var mytimeHours = new Date().getHours();
	var mytimeMinures = new Date().getMinutes();
	var mytimeSeconds = new Date().getSeconds();
	if(mytimeHours == 15 && mytimeMinures == 32 && mytimeSeconds == 50){
		$('.box_video').fadeIn('slow/400/fast', function() {
			$('.box_video').get(0).play();
			$('.box_video').get(1).play();
			$('.box_video').get(2).play();
			$('.box_video').get(3).play();
		});
	}
},1000);

