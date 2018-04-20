window.onload = function(){
	var speed = 25;
	var last_update = 0;
	var x, y, z, last_x = 0, last_y = 0, last_z = 0;
	var mposition = {
	    x: 0,
	    y: 0,
	    z: 0,
	}
	var Aspeed = {
	    x: 0,
	    y: 0,
	    z: 0,
	}
	var nposition = {
	    beta: 0,// 设备在Beta方向上旋转的角度, 范围为-180-180
	    alpha: 0,// 设备在alpha方向上旋转的角度, 范围为0-360
	    gamma: 0,//设备在Gamma方向上旋转的角度, 范围为-90-90
	}
	var phoneId = new Date().getTime();
	var netHref = window.location.href;
	var idIndex = netHref.indexOf('id')+3;
	var netId = netHref.slice(idIndex, idIndex + 1);
	var socket = io.connect();
	var shake_message = {};
	var click_message = {};
	var waterColor = 'red';
	var emit_message = {
		'color': waterColor,
		'phoneId':phoneId,
		'netId':netId
	};
	socket.emit('login',phoneId);

	socket.on('loginSuccess',function(users){//登陆成功
		console.log(users)
	});

	socket.on('loginOut',function(users){//有人断开
		console.log('----');
		console.log(users);
	});

	//点击
	$('.colorBt').on('click touchend', function(event) {
		event.preventDefault();
		$(this).css({
			'transform': 'scale3d(1.5,1.5,1.5)'
		}).siblings().css({
			'transform': 'scale3d(1,1,1)'
		});
		waterColor = $(this).css('background-color');
		emit_message.color = waterColor;
		$('.water').css('background-color',waterColor);
	});

// 颜色轮播
	var startX = 0;
	var endX = 0;
	var moveLeft = 0;
	var window_width = $(window).width();
	var max_move_lfet = (window_width / 4) * 3;
	$('.colorBox').on('touchstart ',function(event){
		event.preventDefault();
		startX = event.originalEvent.changedTouches[0].clientX;
	});

	$('.colorBox').on('touchmove',function(event){
		event.preventDefault();
		endX = event.originalEvent.changedTouches[0].clientX;
		var distance = endX - startX;
		moveLeft = moveLeft + distance;
		if(moveLeft < -max_move_lfet){
			moveLeft = -max_move_lfet;
		}else if(moveLeft>0){
			moveLeft = 0;
		}
		$('.colorCont').css('left',moveLeft);
		startX = endX;
		console.log(moveLeft);

	});
	$('.colorBox').on('touchend',function(event){
		event.preventDefault();
	});

	//摇一摇
	//运动事件监听
	if (window.DeviceMotionEvent) {
	  window.addEventListener('devicemotion',deviceMotionHandler,false);
	} else {
	  alert("你的设备不支持位置感应");
	}

	function deviceMotionHandler(eventData) {
	    var macceleration =eventData.accelerationIncludingGravity;
	    mposition = {
	        x: macceleration.x,
	        y: macceleration.y,
	        z: macceleration.z,
	    }
	    Aspeed = {
	        x: Math.abs(mposition.x - last_x),
	        y: Math.abs(mposition.y - last_y),
	        z: Math.abs(mposition.z - last_z),
	    }
	    shake_message = {
	    	'Aspeed': Aspeed,
	    	'phoneId': phoneId,
	    	'netId': netId
	    }
	    if(Math.abs(mposition.x - last_x) > speed || Math.abs(mposition.y - last_y) > speed) {
	        socket.emit('mshake',emit_message);
	    }
	    var zxc = Math.abs(mposition.x - last_x);
	    var zxcv = Math.abs(mposition.y - last_y);
	    last_x = mposition.x;
	    last_y = mposition.y;
	    last_z = mposition.z;
	    $('#q1').html(zxc);
	    $('#q2').html(zxcv);
	    $('#q3').html(mposition.x - last_x);
	 }
}

// 点击互动涂鸦
$('.enterBtn').on('click',function(){
	show('content');
});
function show(name){
	switch (name){
		case 'login':
			$('.login').fadeIn(1000);
			$('.content').fadeOut();
			break;
		case 'content':
			$('.login').fadeOut();
			$('.content').fadeIn(1000);
			break;
	}
}