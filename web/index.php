<!--A Design by W3layouts
Author: W3layout
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/
-->
<?php

$page = 'dalam';
?> 
<?=$page?>
<!DOCTYPE HTML>
<html>
<head>
<base href="">
<title>AMEN</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
<!-- bxSlider Javascript file -->
<script src= "js/jquery-1.8.3.min.js"></script>
<script src="js/jquery.bxslider.min.js"></script>

<script src="js/amen.js"></script>

<link href="css/jquery.bxslider.css" rel="stylesheet" />
	<script>
		$(document).ready(function(){
			  $('.bxslider').bxSlider();
 			  
		});
	</script>
 <!-- start equalizer -->		  
<link href="css/jquery-ui.css" rel="stylesheet" type="text/css" media="all" />
<script src="js/jquery-ui.min.js"></script>
<script>var __links = document.querySelectorAll('a');function __linkClick(e) { parent.window.postMessage(this.href, '*');} ;for (var i = 0, l = __links.length; i < l; i++) {if ( __links[i].getAttribute('data-t') == '_blank' ) { __links[i].addEventListener('click', __linkClick, false);}}</script>
<script>
$(function() {
	 
	    $( "#eq > span" ).each(function() {	   
	      var value = parseInt( $( this ).text(), 10 );
	      $( this ).empty().slider({
	        value: value,
	        range: "min",
	        animate: true,
	        orientation: "vertical"
	      });
	    });
	  });
</script>
<script>
(function($){
	$.fn.percentPie = function(options){

		var settings = $.extend({
			width: 100,
			trackColor: "EEEEEE",
			barColor: "777777",
			barWeight: 30,
			startPercent: 0,
			endPercent: 1,
			fps: 60
		}, options);

		this.css({
			width: settings.width,
			height: settings.width
		});

		var	that = this,
			hoverPolice = false,
			canvasWidth = settings.width,
			canvasHeight = canvasWidth,
			id = $('canvas').length,
			canvasElement = $('<canvas id="'+ id +'" width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>'),
			canvas = canvasElement.get(0).getContext("2d"),
			centerX = canvasWidth/2,
			centerY = canvasHeight/2,
			radius = settings.width/2 - settings.barWeight/2;
			counterClockwise = false,
			fps = 1000 / settings.fps,
			update = .01;
			this.angle = settings.startPercent;

		this.drawArc = function(startAngle, percentFilled, color){
			var drawingArc = true;
			canvas.beginPath();
			canvas.arc(centerX, centerY, radius, (Math.PI/180)*(startAngle * 360 - 90), (Math.PI/180)*(percentFilled * 360 - 90), counterClockwise);
			canvas.strokeStyle = color;
			canvas.lineWidth = settings.barWeight;
			canvas.stroke();
			drawingArc = false;
		}

		this.fillChart = function(stop){
			var loop = setInterval(function(){
				hoverPolice = true;
				canvas.clearRect(0, 0, canvasWidth, canvasHeight);

				that.drawArc(0, 360, settings.trackColor);
				that.angle += update;
				that.drawArc(settings.startPercent, that.angle, settings.barColor);

				if(that.angle > stop){
					clearInterval(loop);
					hoverPolice = false;
				}
			}, fps);
		}

		this.mouseover(function(){
			if(hoverPolice == false){
				that.angle = settings.startPercent;
				that.fillChart(settings.endPercent);
			}
		});

		this.fillChart(settings.endPercent);
		this.append(canvasElement);
		return this;
	}
}(jQuery));

$(document).ready(function() {

	$('.google').percentPie({
		width: 100,
		trackColor: "444444",
		barColor: "71CF97",
		barWeight: 20,
		endPercent: .9,
		fps: 60
	});
  
  $('.moz').percentPie({
		width: 100,
		trackColor: "444444",
		barColor: "2EB0E2",
		barWeight: 20,
		endPercent: .75,
		fps: 60
	});
  
  $('.safari').percentPie({
		width: 100,
		trackColor: "444444",
		barColor: "#e51937",
		barWeight: 20,
		endPercent: .5,
		fps: 60
	});
    
});
</script>
 <!-- start price_bar  -->	
<link href="css/jquery.nouislider.css" rel="stylesheet">
<script src="js/jquery.nouislider.js"></script>
</head>
<body>
<div class="wrap">
<div class="main">
	<!-- start menu -->
	<ul class="menu">
		<li id="title_page"></li>
		
		<!--<li><a href="#">Portfolio</a></li>
		<li class="active"><a href="#">About us</a></li>
		<li><a href="#">clients</a></li>
		<li><a href="#">blog</a></li>
		<li><a href="#">Contact</a></li>-->
	</ul>
	<div class="clear"></div>
		<div class="top-nav">
		<nav class="clearfix">
				<ul>
					<li><a href="#">Portfolio</a></li>
					<li><a href="#">About me</a></li>
					<li><a href="#">works</a></li>
					<li><a href="#">clients</a></li>
					<li><a href="#">blog</a></li>
					<li><a href="#">Contact</a></li>
				</ul>
				<a href="#" id="pull">Menu</a>
			</nav>
		<!--nav-->
		<script>
				$(function() {
					var pull 		= $('#pull');
						menu 		= $('nav ul');
						menuHeight	= menu.height();
		
					$(pull).on('click', function(e) {
						e.preventDefault();
						menu.slideToggle();
					});
		
					$(window).resize(function(){
		        		var w = $(window).width();
		        		if(w > 320 && menu.is(':hidden')) {
		        			menu.removeAttr('style');
		        		}
		    		});
				});
		</script>
	</div>
	 
	

<div class="grid1_of_3_1" id="thank_you" style="display:none;">
			<div class="grid_img">
				<img alt="" src="images/taif.jpg">	
			</div>
			<div class="grid_text">
				<h3 class="style">TA'IF GOLD</h3>
				<h4 class="style">Thank you for booking!</h4>
				<ul class="package_details"><li>4 star hotel</li><li>Transportation</li><li>Activities</li><li>food</li></ul>
				<input type="submit" value="CLOSE" id="close_thanks" class="bg">
			</div>
		</div>
</body>
</html>