/*
	HUMANIZED MESSAGES 1.0
	idea - http://www.humanized.com/weblog/2006/09/11/monolog_boxes_and_transparent_messages
	home - http://humanmsg.googlecode.com
*/

var humanMsg = {
	setup: function(appendTo, logName, msgOpacity, noBinding) {
		humanMsg.msgID = 'humanMsg';
		humanMsg.logID = 'humanMsgLog';
		humanMsg.noBinding = noBinding;
		
		// appendTo is the element the msg is appended to
		if (appendTo == undefined)
			appendTo = 'body';

		// The text on the Log tab
		if (logName == undefined)
			logName = 'Message Log';

		// Opacity of the message
		humanMsg.msgOpacity = .9;

		if (msgOpacity != undefined) 
			humanMsg.msgOpacity = parseFloat(msgOpacity);

		// Inject the message structure
		jQuery(appendTo).append('<div id="'+humanMsg.msgID+'" class="humanMsg"><p></p></div> ');
		// remove log
		//<div id="'+humanMsg.logID+'"><p>'+logName+'</p><ul></ul></div>
		
		// remove Log
		/*
		jQuery('#'+humanMsg.logID+' p').click(
			function() { jQuery(this).siblings('ul').slideToggle() }
		)*/
	},

	displayMsg: function(msg, timeout, overlay) {
		if (msg == '')
			return;
		
		if (timeout == undefined)
			timeeout = true;
		
		if (overlay == undefined)
			overlay = false;

		if (timeout){
			clearTimeout(humanMsg.t2);
		}
		
		// Inject message
		jQuery('#'+humanMsg.msgID+' p').html(msg);
	
		// Show message
		jQuery('#'+humanMsg.msgID+'').show().animate({ opacity: humanMsg.msgOpacity}, 200, function() {
			
		
			// hide log
			//jQuery('#'+humanMsg.logID)
			//	.show().children('ul').prepend('<li>'+msg+'</li>')	// Prepend message to log
			//	.children('li:first').slideDown(200)				// Slide it down
		
			/*
			if ( jQuery('#'+humanMsg.logID+' ul').css('display') == 'none') {
				jQuery('#'+humanMsg.logID+' p').animate({ bottom: 40 }, 200, 'linear', function() {
					jQuery(this).animate({ bottom: 0 }, 300, 'easeOutBounce', function() { jQuery(this).css({ bottom: 0 }) })
				})
			}*/
			
		});

		if (timeout){
			// Watch for mouse & keyboard in .5s
			humanMsg.t1 = setTimeout(function(){humanMsg.bindEvents();}, 700);
			// Remove message after 5s
			humanMsg.t2 = setTimeout(function(){humanMsg.removeMsg();}, 4000);
		}else{
			if(overlay){
				humanMsg.t1 = setTimeout(function(){humanMsg.bindEvents();}, 2500);
			}
			//
			
		}
	},

	bindEvents: function() {
	// Remove message if mouse is moved or key is pressed
		jQuery(window)
			.mousemove(humanMsg.removeMsg)
			.click(humanMsg.removeMsg)
			.keypress(humanMsg.removeMsg);
		
		
	},

	removeMsg: function() {
		// Unbind mouse & keyboard
		jQuery(window)
			.unbind('mousemove', humanMsg.removeMsg)
			.unbind('click', humanMsg.removeMsg)
			.unbind('keypress', humanMsg.removeMsg);

		// If message is fully transparent, fade it out
		if (jQuery('#'+humanMsg.msgID).css('opacity') >= (humanMsg.msgOpacity-0.05))
			jQuery('#'+humanMsg.msgID).animate({ opacity: 0 }, 500, function() { jQuery(this).hide(); });
		
		if (jQuery('#login-overlay').css('opacity') >= 0)
			jQuery('#login-overlay').animate({ opacity: 0 }, 700, function() { jQuery(this).hide(); });
	}
};

jQuery(document).ready(function(){
	humanMsg.setup();
});