/*!
 * Copyright (c) 2000-2008 Liferay, Inc. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 *  Common JavaScript Library Function for nc.session
 *  2009 nc 
 *
 *--------------------------------------------------------------------------*/

nc.session = {
	
	autoExtend: false,
	sessionTimeout: 0,
	sessionTimeoutWarning: 0,
	redirectOnExpire: false,
	multiplierMilisecond: 60000,
	alertTime: nc.globalSessionTimeout * 1000,
	intervalCycle: 1000,
	alertInit: false,

	
	init: function(params) {
		
		
		var instance = this;
		instance._cookieKey = 'nc_SESSION';
		instance._sesExtCookieKey = 'nc_SESSION_EXTEND';
		
		
		params = params || {};
		instance.autoExtend = params.autoExtend || instance.autoExtend;
		//jQuery.cookie(instance._sesExtCookieKey, null);
		
		instance._timeout = params.timeout || instance.sessionTimeout;
		instance._warning = params.timeoutWarning || instance.sessionTimeoutWarning;
		//instance._timeout = instance._timeout * instance.multiplierMilisecond;
		//instance._warning = instance.timeoutWarning * instance.multiplierMilisecond;
		
		
		instance.sessionTimeout = parseFloat(instance._timeout) * parseFloat(instance.multiplierMilisecond);
		instance.sessionTimeoutWarning = parseFloat(instance._warning) * parseFloat(instance.multiplierMilisecond);
		instance._timeoutDiff = parseFloat(instance.sessionTimeout) - parseFloat(instance.sessionTimeoutWarning);
		/*nc.out('init session delete cookie '+instance._sesExtCookieKey
				+'-sessionTimeout:'+instance.sessionTimeout
				+'_timeout'+instance._timeout
				+'instance.multiplierMilisecond-'+instance.multiplierMilisecond
				+'sessionTimeoutWarning-'+instance.sessionTimeoutWarning
				+'time-'+(new Date).getTime())
				*/
		instance._currentTime = instance.sessionTimeoutWarning;

		instance.redirectOnExpire = params.redirectOnExpire || instance.redirectOnExpire;

		
		
		
		instance.banner = new jQuery;

		var urlBase = nc.hostname + '/action/base/';

		instance._sessionUrls = {
			expire: urlBase + 'expire_session',
			extend: urlBase + 'extend_session'
		};
		
		
		nc.out("sessionTimeout:"+instance.sessionTimeout)
		nc.out("multiplierMilisecond:"+instance.multiplierMilisecond)
		nc.out("_warning:"+instance._warning)
		nc.out("sessionTimeoutWarning:"+instance.sessionTimeoutWarning)
		nc.out("_timeoutDiff:"+instance._timeoutDiff)
		instance._stateCheck = setTimeout(
			function() {
				instance.checkState();
			},
			instance._timeoutDiff);

		var timeoutMinutes = instance._timeout;
		var timeLeft = instance._warning;

		instance._warningText = 'Warning! Due to inactivity, your session will expire in <span id="timeout_counter"></span>. To extend your session another <span id="timeout"></span> minutes, please press the <b>ok</b> button. <input type="button" name="accept" value="Extend" onclick="nc.session.extendClick();" />';
		instance._expireText = 'Your session has expired. Please save your works, kindly please and click <a href="'+nc.hostname+'/action/security/loginSetup" target="_parent">here</a> to login';
		
		instance._toggleText = {
			hide: 'hide',
			show: 'show'
		};

		instance._expiredText = 'warning-your-session-has-expired';
		instance._extendText = 'extend';

		instance.setCookie();
	},

	checkState: function() {
		var instance = this;

		var currentTime = new Date().getTime();
		var sessionState = instance.getCookie();
		var newWaitTime = instance.sessionTimeoutWarning;
		var timeDiff = 0;
		instance.autoExtend = instance.getSessionExtendCookie();
		
		clearTimeout(instance._stateCheck);
		//nc.out('sessionState'+sessionState);
		if (sessionState == 'expired') {
			instance.expire('checkState');
		}
		else {
			timeDiff = currentTime - sessionState;

			if (!instance.autoExtend) {
				if ((timeDiff + 100) >= instance.sessionTimeoutWarning) {
						instance.warn();
				}
				else {
					newWaitTime = (instance.sessionTimeoutWarning - timeDiff) + instance.alertTime;
					instance._stateCheck = setTimeout(
						function() {
							instance.checkState();
						},
					newWaitTime);
				}
			}
			else {
				instance.extend();
			}
		}
	},

	getCookie: function() {
		var instance = this;
		return jQuery.cookie(instance._cookieKey) || 0;
	},

	expire: function(from) {
		//nc.out('expire from:'+from);
		var instance = this;

		document.title = instance._originalTitle;
		
		//nc.setDialog();
		$('#portal-alert-notice')
			.removeClass('portal-alert-notice')
			.addClass('portal-alert-error')
			.html(instance._expireText).prepend('<img src="'+nc.hostname+'/images/icons/exclamation.png"/>');
		
		$('.accept','#facebox').unbind('click').click(function(){
			$.facebox.close();
		});
		
		$('.reject','#facebox').hide();		
			
		
		
		jQuery.ajax(
			{
				url: instance._sessionUrls.expire,
				success: function() {
					if (instance.redirectOnExpire) {
						nc.logout();
					}
				}
			}
		);

		instance.setCookie('expired');
	},

	extendClick: function() {
		var instance = this;
		jQuery.cookie(instance._sesExtCookieKey, 'extended');
		nc.session.extend();
	},
	
	extend: function() {
		var instance = this;

		$(".portal-alert-notice").slideUp('fast');
		
		if (instance._countdownTimer) {
			clearInterval(instance._countdownTimer);
		}
		//nc.out('instance._countdownTimer'+instance._countdownTimer);
		jQuery.ajax(
			{
				url: instance._sessionUrls.extend
			}
		);

		//document.title = instance._originalTitle;

		instance._currentTime = instance.sessionTimeoutWarning;

		clearTimeout(instance._sessionExpired);
		//nc.out('extended-_sessionExpired:'+instance._sessionExpired)
		if (instance._sessionWarning) {
			clearTimeout(instance._sessionWarning);
		}
		//nc.out('instance._timeoutDiff:'+instance._timeoutDiff)
		instance._sessionWarning = setTimeout(
			function() {
				if (!instance.autoExtend) {
					instance.warn();
				}
				else {
					jQuery.cookie(instance._sesExtCookieKey, '--');
					instance.extend();
					
				}
			},
			instance._timeoutDiff
		);

		instance.setCookie();
		$.facebox.close();
	},

	setCookie: function(status) {
		var instance = this;

		var currentTime = new Date().getTime();
		jQuery.cookie(instance._cookieKey, status || currentTime);
	},

	warn: function() {
		var instance = this;
		
		//nc.out('instance.alertInit:'+instance.alertInit)
		//if(instance.alertInit){	
			//$.facebox.close();
		//}else{
		/*$.facebox.settings.width = '700px';
		$.facebox.opacity(0.6);
		$.facebox.modal(false);
			nc.confirm({
				msg: instance._warningText,
				title: 'Session Timeout',
				accept_callback: function(){nc.session.extend();},
				reject_callback: function(){nc.session._logout();}
			});
			//confirmThis(instance._warningText, 'Session Timeout', nc.session.extend, nc.session._logout);
		//}
		*/
		//alert('oi')
		$('#portal-alert-notice').html(instance._warningText).slideDown("fast");
		
		instance.alertInit = true;		

		instance._counter();

		//nc.out('_sessionExpired:'+instance._sessionExpired);
		
		
		instance._sessionExpired = setTimeout(
			function() {
				// check cookie
				// if nc_SESSION content 
				var nc_SESSION = instance.getSessionExtendCookie();
				if(nc_SESSION == 'extended'){
					nc.out('extend')
					instance.extend();
				}else{
					nc.out('expire')
					instance.expire('warn');
				}
			
				
			},
		instance.sessionTimeoutWarning);
		
	},
	
	_logout: function(){
		parent.location=nc.hostname;
	},

	_counter: function() {
		var instance = this;
		
		var banner = instance.banner;
		
		if (banner.length) {
			instance._counterText = banner.find('#timeout_counter');
			instance._originalTitle = document.title;
			var interval = 1000;
			
			$('#timeout').html(instance._currentTime);
			$('#timeout_counter').html(instance._currentTime);
			$('#timeout').html(instance._timeout);
			//instance._counterText.html(instance._setTime());
			//document.title = $('#timeout','#facebox').html();
			//nc.out('interval='+instance._countdownTimer)
			instance._countdownTimer = setInterval(
				function() {
					var time = instance._setTime();
					instance._currentTime = instance._currentTime - interval;

					if (instance._currentTime >= 0) {
						//nc.out('time='+time+'_currentTime='+instance._currentTime+'-interval='+interval)
						instance._counterText.html(time);
						//document.title = instance.banner.html();
					} else {
						//instance.banner.html(instance._expiredText);
						//instance.banner.toggleClass('popup-alert-notice').toggleClass('popup-alert-warning');

						if (instance._countdownTimer) {
							clearInterval(instance._countdownTimer);
						}
					}
				},
			interval
			);
		}
	},

	_formatNumber: function(num) {
		var instance = this;

		if (!nc.isArray(num)) {
			if (num <= 9) {
				num = '0' + num;
			}
		} else {
			num = jQuery.map(num, instance._formatNumber);
		}
		return num;
	},

	_setTime: function() {
		var instance = this;

		var amount = instance._currentTime;

		if(amount <= 0){

		}
		else {
			var days=0, hours=0, minutes=0, seconds=0, output='';

			// Remove the milliseconds
			amount = Math.floor(amount/1000);

			hours = Math.floor(amount/3600);
			amount = amount%3600;

			minutes = Math.floor(amount/60);
			amount = amount%60;

			seconds = Math.floor(amount);

			return instance._formatNumber([hours, minutes, seconds]).join(':');
		}
	},

	_autoExtender : function(extender){
		var instance = this;
		jQuery.cookie(instance._sesExtCookieKey, extender);
		instance.autoExtend = extender;
	},
	
	getSessionExtendCookie: function() {
		var instance = this;
		return jQuery.cookie(instance._sesExtCookieKey) || 0;
	},
	
	getncSessionCookie: function() {
		var instance = this;
		return jQuery.cookie(instance._cookieKey) || 0;
	},
	
	_banner: [],
	_countdownTimer: null,
	_currentTime: 0,
	_originalTitle: '',
	_sessionUrls: {},
	_sessionWarning: null,
	_sessionExpired: null,
	_timeout: 0,
	_timeoutDiff: 0,
	_warning: 0
};