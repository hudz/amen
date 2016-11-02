/*!
 * Common JavaScript Function (for nc)
 * @requires jQuery v1.4.2 or later
 * (c)2009 - 2013 ncsoft Software Development team 
 *
 * Original author, Hudzaifah Hafiz [ hudzaifah@gmail.com ]
 *
 * nc.common.js is a Free License, some code is under MIT license:
 * (http://www.opensource.org/licenses/mit-license.php)
 *
 * For a nice jQuery plugin development pattern, see:
 * http://www.learningjquery.com/2007/10/a-plugin-development-pattern
 */

//var j = jQuery.noConflict();
// The nc object is actually just an array object

var nc = {};

try {
// Load all configuration, adjustment for nc after load all web Components
//jQuery(window).load(function() {
jQuery(document).ready(function(){
	jQuery.ajaxSetup({cache:true});
	nc.time('nc');
	nc.time('ejkm');
	try {
		nc.project.ejkm();
	} catch(e) {
		nc.err('Project ejkm not exist: ' + e);
	}
	nc.timeEnd('ejkm');
	try {
		// datepicker localization
		jQuery.datepicker.setDefaults(jQuery.datepicker.regional['us']);
	} catch(e) {
		nc.err(e);
	}
	
	try{
		// Tooltip
		nc.tooltip();
	 }catch(e){
		nc.err(e);
	}
	
	
	// Funtion to extend jQuery
	nc.extendjQuery();
	
	// Bind with ajax Error
	nc.bind();
	
	// All about nc menu
	//nc.menu();
	//nc.subMenuAjax();
	//nc.subMenu();
	
	/*if(nc.sessionActivate){
		try{
			// Session Management
			nc.session.init({
			    autoExtend: true,
				//timeout: view.getSMPTimeOut() ,
			    timeout: 30,
			    timeoutWarning: 20
			});
		 }catch(e){
			nc.err(e);
		}
	}*/
	
	
	
	// Description a.k.a humanMsg
	//nc.description('input[type=text]','.navigation');
	
	// Set up humanMsg
	//nc.humanMsg();
				
	// nc validate
	//nc.validate();
	nc.timeEnd('nc');

	// 
	nc.windowResize();
	nc.detectBrowserVersion();
		
	});
}catch(e){
	if (typeof console != "undefined" && typeof console.debug != "undefined") {
		console.error("%s: %o", e, this);
	}
}
	
	
	// implementation of nc object
	nc = {
		
		VERSION			: '1.0',
		project			: {},
		bo				: {},
		base			: {},
	    Language		: {},
	    session			: {},
	    people			: {},
	    sessionActivate	: true,
		debug			: true,
		validReport		: true,
		Bahasa			: 'my',
		English			: 'us',
		i 				: 0,
		n 				: 0, 
		str 			: '',
		character 		: '',
		urlBreadCrumb 	: '',
		urlBC 			: 'url',
		sessionCookie 	: 'NC_SESSION',
		ENGINE_PATH 	: '/base/engine/',
		hostName 		: window.location.protocol + '//' + window.location.hostname + ':' +window.location.port+ '/' + window.location.pathname.split( '/' )[1],
		hostname 		: window.location.protocol + '//' + window.location.hostname + ':' +window.location.port+ '/' + window.location.pathname.split( '/' )[1],
		host 			: window.location.protocol + '//' + window.location.hostname + ':' +window.location.port ,
		pagePath		: window.location.pathname.split( '/eJKM/' )[1] + document.location.search,
		uploadDirectory : window.location.protocol + '//' + window.location.hostname + ':' +window.location.port+ '/' + window.location.pathname.split( '/' )[1] + '/' + 'uploads',
		domain			: window.location.pathname.split( '/' )[3],
		currentPage		: window.location.pathname.split( '/' )[4],
		currentPageTitle : '',
		domainOut		: window.location.pathname.split( '/' )[4],
		hasFocus 		: null,
		inputSearch 	: null,
		timeout			: 0,
		timeBug 		: false,
		//iconEdit		: '<img src="'+nc.hostname+'/images/icon/pencil.png" />',
		initError		: false,
		delayAnimation	: 218,
		globalSessionTimeout: 5,
		
		   
		   table		: function(opts){ try{ nc.base.table(opts); 		}catch(e){ nc.out("Error in nc.table: "+e); 		}},
		   sql			: function(opts){ try{ nc.base.sql(opts);	 		}catch(e){ nc.out("Error in nc.sql: "+e); 			}},
		   lookup		: function(opts){ try{ nc.base.lookup(opts); 		}catch(e){ nc.out("Error in nc.lookup: "+e);		}},
		   save     	: function(opts){ try{ nc.base.save(opts); 			}catch(e){ nc.out("Error in nc.save: "+e);			}},		
		   language 	: function(opts){ try{ nc.base.language(opts);	 	}catch(e){ nc.out("Error in nc.language: "+e);		}},	
		   email    	: function(opts){ try{ nc.base.email(opts);			}catch(e){ nc.out("Error in nc.email: "+e);			}},		
		   autocomplete : function(opts){ try{ nc.base.autocomplete(opts);	}catch(e){ nc.out("Error in nc.autocomplete: "+e);	}},
		   populate     : function(opts){ try{ nc.base.populate(opts);		}catch(e){ nc.out("Error in nc.populate: "+e);		}},   
		   list	        : function(opts){ try{ nc.base.list(opts);			}catch(e){ nc.out("Error in nc.list: "+e);			}},
		   count		: function(opts){ try{ nc.base.count(opts);			}catch(e){ nc.out("Error in nc.count: "+e);			}},
		   array		: function(opts){ try{ nc.base.array(opts);			}catch(e){ nc.out("Error in nc.array: "+e);			}},
		   chart	    : function(opts){ try{ nc.base.chart(opts);			}catch(e){ nc.out("Error in nc.chart: "+e);			}},
		   ajax 	    : function(opts){ try{ nc.base.ajax(opts);			}catch(e){ nc.out("Error in nc.ajax: "+e);			}},
		   form 	    : function(opts){ try{ nc.base.form(opts);			}catch(e){ nc.out("Error in nc.form: "+e);			}},
		   data 	    : function(opts){ try{ nc.base.data(opts);			}catch(e){ nc.out("Error in nc.data: "+e);			}},
		   upload 	    : function(opts){ try{ nc.base.upload(opts);		}catch(e){ nc.out("Error in nc.upload: "+e);		}},
		   uploadTemp   : function(opts){ try{ nc.base.uploadTemp(opts);	}catch(e){ nc.out("Error in nc.uploadTemp: "+e);		}},
		   download 	: function(opts){ try{ nc.base.download(opts);		}catch(e){ nc.out("Error in nc.download: "+e);		}},
		   report	 	: function(opts){ try{ nc.base.report(opts);		}catch(e){ nc.out("Error in nc.report: "+e);		}},
		   calendar	    : function(elem, dateFormat, button){ try{ nc.base.calendar(elem, dateFormat, button);	}catch(e){ nc.out("Error in nc.calendar: "+e);		}},
	 
		monitorWidth : function(){
			   return screen.width;
		},
		
		monitorHeight : function(){
			   return screen.height;
			   
		},
		
		browserWidth : function(){
			   return jQuery(document).width();
		},
		
		browserHeight : function(){
			   return jQuery(document).height();
			   
		},
		
		width : function(){
			   return jQuery(document).width();
		},
		
		height : function(){
			   return jQuery(document).height();
		},
		
		wheight : function(){
			   return jQuery(window).height();
		},
		   
	   popupWidth : function(){
			return nc.browserWidth() * 0.9;
	   },
	   
	   popupHeight : function(){
			return nc.browserHeight() * 0.8 ;
	   },
	   
	   windowResize : function(){
		   jQuery(window).resize(function() {
				jQuery('#msg_notification').halign();
				nc.popupHeight();
				nc.popupWidth();
				nc.width();
				nc.height();
				nc.browserHeight();
				nc.browserWidth();
				nc.monitorHeight();
				nc.monitorWidth();
			});
	   },
	   
	   
	   detectBrowserVersion: function(){
		   var userAgent = "";
		   var version = "";
		   var browserType = jQuery.uaMatch(navigator.userAgent).browser;
		   // Is this a version of IE?
		   if(jQuery.browser.msie){
			   userAgent = jQuery.browser.version;
			   userAgent = userAgent.substring(0,userAgent.indexOf('.'));	
			   version = userAgent;
		   }

		   // Is this a version of Chrome?
		   if(jQuery.browser.chrome){
			   userAgent = userAgent.substring(userAgent.indexOf('chrome/') +7);
			   userAgent = userAgent.substring(0,userAgent.indexOf('.'));	
			   version = userAgent;
			   // If it is chrome then jQuery thinks it's safari so we have to tell it it isn't
			   jQuery.browser.safari = false;
		   }

		   // Is this a version of Safari?
		   if(jQuery.browser.safari){
			   userAgent = userAgent.substring(userAgent.indexOf('safari/') +7);	
			   userAgent = userAgent.substring(0,userAgent.indexOf('.'));
			   version = userAgent;	
		   }

		   // Is this a version of Mozilla?
		   if(jQuery.browser.mozilla){
			   //Is it Firefox?
			   if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
				   userAgent = userAgent.substring(userAgent.indexOf('firefox/') +8);
				   userAgent = userAgent.substring(0,userAgent.indexOf('.'));
				   version = userAgent;
			   }
			   // If not then it must be another Mozilla
			   else{
			   }
		   }

		   // Is this a version of Opera?
		   if(jQuery.browser.opera){
			   userAgent = userAgent.substring(userAgent.indexOf('version/') +8);
			   userAgent = userAgent.substring(0,userAgent.indexOf('.'));
			   version = userAgent;
		   }
		   
		   jQuery('body').addClass(browserType);
			
	   },
	   
		time: function(timeVar){
		    if(nc.timebug){
		    	if (typeof console != "undefined" && typeof console.debug != "undefined") {
					console.time(timeVar);
				} else { 
					//alert(msg);
				}
		    }
		},
		timeEnd: function(timeVar){
			if(nc.timebug){
				if (typeof console != "undefined" && typeof console.debug != "undefined") {
					console.timeEnd(timeVar);
				} else { 
					//alert(msg);
				}
			}
		},
	
		logout: function(){
			nc.humanMsg({msg:'Logging out...'});
			jQuery('#fancybox-overlay').delay(10).fadeOut('slow', function(){
				jQuery('#red-bar, #breadcrumb-bar, #top-bar').css({'z-index':'1200'});
				jQuery('#breadcrumb-bar').html("");
				jQuery('.search, #version').remove();
				
				jQuery('#fancybox-overlay')
				.css({'opacity':'1','background-color':'#ffffff'})
				.fadeIn('278', function(){
					nc.gohref(nc.hostname+'/faces/logout.jspx');
				});
			});
			
			setTimeout(function(){
				jQuery('#facebox').css({'z-index':'1200'});
				jQuery('#fancybox-overlay')
					.css({'opacity':'0.2'})
					.fadeIn('278');
				},278);
		},
		
		// get function like expression in jQuery
		get: function(elementID){
			return (elementID.indexOf('#') > 0) ? jQuery('#'+elementID) : jQuery(elementID);
		},
		
		// All nc binds here
		bind: function(){
			
			 	// For loading
				// bind this element with any ajax xmlHttpRequest
				jQuery("#loading_smp_ajax")
				.hide()
				.bind("ajaxSend", function(){
					jQuery(this).show();
				}).bind("ajaxComplete", function(){
					jQuery(this).hide();
				}).bind("ajaxError", function(){
					jQuery(this).hide();
				}).bind("ajaxStop", function(){
					jQuery(this).hide();
				});
				 
				
			},
	/**
	 * Function capture Error
	 */
	error: function(data, xhr){
		
		
		
		var errorThrowed = '';
		var tableError = '';
		var msg = '<br /><br /> We have been notified by this glitch. We apologize and we are striving to fix this ASAP. As for the moment, please enjoy the picture of cute baby seal.<br /><br />' ;
		var cutePic = '<img src="'+nc.hostname+'/images/cute/baby-seal.jpg" width="800px" >';
		var script = '<script>var commandError = "show";jQuery("#toggle-smp-error").click(function(){jQuery("#smp-error").toggle();if(commandError=="show"){jQuery("#toggle-smp-error").html("Hide Error");commandError = "hide";}else{jQuery("#toggle-smp-error").html("Show Error");commandError="show";}});</script>';
		
		
		var catchError = false;
		var authorized = true;
		
		// If data from ajax response is match with <pre>
		if( data.match(/<pre>/gi) ){
			
			errorThrowed =  jQuery(data).find("pre").html();
			tableError = '<table cellspacing="0" cellpadding="0" border="0" width="100%"><tbody><tr height="10"> <td width="11"><img border="0" alt="upper left" src="'+nc.hostname+'/images/curve1_upper.gif"/><br/></td> <td bgcolor="#707378"/> <td width="11"><img border="0" alt="upper right" src="'+nc.hostname+'/images/curve2_upper.gif"/><br/> </td> </tr>   <tr>  <td bgcolor="#707378"/> <td bgcolor="#707378"> <table cellspacing="0" cellpadding="0" border="0" bgcolor="#707378" width="100%"> <tbody><tr>  <td width="6%"> </td>  <td width="2%"> </td>  <td width="92%"> </td> </tr>  <tr> <td><div align="right"><img border="0" alt="Application Error" src="'+nc.hostname+'/images/smp/InfoBox.png"/></div></td> <td> </td>  <td><font class="errorFont"><b>Information</b><br/>	<hr size="1" noshade=""/>  There has been a general Exception </font></td> </tr>  <tr> <td> </td><td> </td><td> </td> </tr> </tbody></table></td> <td height="10" bgcolor="#707378"> </td> </tr>  <tr> <td height="10" width="11"><img border="0" alt="down left" src="'+nc.hostname+'/images/curve1_down.gif"/></td>  <td height="10" bgcolor="#707378"/> <td height="10" width="11"><img border="0" alt="down right" src="'+nc.hostname+'/images/curve2_down.gif"/></td>  </tr>  </tbody></table>';
			catchError = true;
		}
		
		if( data.match(/Authorized./gi) ){
			//return;
			authorized = false;
			catchError = true;
		}
		
		if( data.match(/socket/gi) ){
			//return;
			catchError = true;
		}
		if( data.match(/adapter/gi) ){
			//return;
			catchError = true;
		}
		
		if( data.match(/Stacktrace/gi) ){
			//return;
			catchError = true;
		}
		
		if( data.match(/MSG_ERRORS/gi) ){
			//return;
			catchError = true;
		}
		
		
		if(nc.initError){
			// do nothing
		}else{
			if(catchError){
				
				// aborting xhr Request
				if(xhr != null){
					xhr.abort();
				}
				
				if(authorized){
					nc.alert({
						msg: msg  +'<br /><a href="javascript: ;" id="toggle-smp-error">Show Error</a><div id="smp-error" style="display:none">'+errorThrowed+'</div>'+script,
						title: 'Application Glitch',
						option: 'div',
						features: 'error'
					});
				}else{
					nc.alert({
						msg: 'Maaf, sesi anda telah tamat. Sila <a href="'+nc.hostname+'/security/basic/form/login.jsp">Login</a> semula.' ,
						title: 'Sesi sistem tamat',
						option: 'div',
						features: 'error'
					});
				}
				
				
				/*nc.base.email({
					id:2,
					emailTo: 'hudzaifah@gmail.com',
					emailSubject: 'EJKM ERROR',
					emailContent: errorThrowed
				});*/
				
				// Stop the Ajax once and for all
				jQuery.event.trigger( "ajaxStop" );
				jQuery.event.trigger( "ajaxError" );
			}
		}
		return catchError;
	},
	 /**
	 	* Take from Rizam code formatInput.java
		*/
	 formatInput: function(str, character, input){
		 
		 var index = 0;
		 var count = 0;
		 var temp = [];
		 
		while (str.length > 0) {
			
			str = str.indexOf(character);
			if (index != -1) {
				temp[count] = input.substr(0, index);
				input = input.subst(index + 1, input.length);
			} else {
				temp[i] = input;
				break;
			}

		}

		if (temp.length < 1){
			return null;
			}

		//var output = temp;
		return temp;
	 },
	 
	 validate: function(options, form, callback){
		  	// Small loading
			//nc.ls(container);

			// default variable not accessible by outside
			var defaults = {
					id: "",				// SQL ID
					form : "",				// form
					action:"",				// action
					validate: true,			// validation // default true			
					defaultValue: "",		// defaultValue yang akan dipilih
				  	ID: "",					//
					ID1: "",				//	== ID
					ID2: "",				//
					parameters: {},			// JSON Obj
					parameter: "",			// 
					parameter1: "",			//
					parameter2: "",			//
					parameter3: "",			//	== PARAMETER
					parameter4: "",			//
					parameter5: "",			//
					parameter6: "",			//
					condition: "",			//
					condition1: "",			//	== CONDITION
					condition2: "",			//
					selected: "",			// ??
					returnThis: false,		// return something
					response: "",			// response from traveler
					container: "",			// container of 
					lookup: false,			// if want <select>
					inner_html: false,		// inner html
					selectOption: true,    	// ??
					callback: "",			// callback function
					singleData: false,		// if don't want <select>
					allValue: false,		// If want ALL value in select 
					specialCase: "",		// SpecialCase
					selected: true,			// onSuccess, choose the first option
					notOption:false,		// emm
					language: 'BM',			// language 
					success: "",            // same as callback
					json: true,			// return type json by default
					result: ""				// result after query sql
					
			};
			
			// Use jQuery.extend to extend options to defaults
			// Extend our default options with those provided.
			// Note that the first arg to extend is an empty object -
			// this is to keep from overriding our "defaults" object.
			var opts = jQuery.extend({}, defaults, options);
			
			// Serialize and send parameter that from user 
			// this is to keep from sending empty parameter to the server 
			var data = nc.base.serialize(opts, defaults, options);
			var output = "";
			output = check(opts);
			
			function check(opts){
				 // validation
				 jQuery.validator.messages.required = "";
				 
				 jQuery("form" + opts.form).validate({
					 invalidHandler: function(e, validator) {
						var errors = validator.numberOfInvalids();
						if (errors) {
							nc.out('ade error');
							var message = errors == 1
								? 'Anda tertinggal 1 medan. Ia telah diterangkan di bawah'
								: 'Anda xtertinggal ' + errors + ' medan-medan.  Ia telah diterangkan dibawah';
							jQuery("div.info_popup span").html(message);
							for(var name in validator){
								if(validator[name] == 'errorList' ){
									nc.out(name +' =' +validator[name])
								}
							}
							validator.focusInvalid();
							//jQuery(window).scrollTo('#oku_no_cont', 0);
							jQuery("div.info_popup").show();
						} else {
							jQuery("div.info_popup").hide();
						}
					},
					onkeyup: false,
					submitHandler: function() {
						jQuery("div.info_popup").hide();
					}
				 });

				 jQuery("div.info_popup").hide();
			}
			
			return output;
		}, //end data
	 
	 // Initcap String
	 initcap: function(str) {
		 rope = str.substring(0,1).toUpperCase() + str.substring(1,str.length).toLowerCase();
		 return rope;
	 },
	 
	 openWin: function(fileName, windowName){
		window.open(fileName,windowName,'width=350,height=350,directories=no,location=no,menubar=no, scrollbars=yes,status=no,toolbar=no,resizable=yes');
		},
	
	
	 maximize: function() {
		window.moveTo(0,0);
		window.resizeTo(screen.availWidth, screen.availHeight);
		},
	

	  highlightMouseOver: function(src){
		 
		 jQuery(src).addClass('highlighted_mouseover');
        if(jQuery(src+':has(".highlighted")')){
        }
        else
        {
            jQuery(src).addClass('highlighted_mouseover');
        }
    },

    
     highlightMouseOut: function(src){
        jQuery(src).removeClass('highlighted_mouseover');
    },
		
	 write:function(str){
		 document.write(str);
	 },
	 
	 isArray: function(object) {
				if (!window.Array) {
					return false;
				}
				else {
					return object.constructor == window.Array;
				}
	 },
	 info: function(options){
		//:TODO
		 // make a info function
		 // __________________________
		 // _____HEADER_______________
		 //    |      |_info_|
		 //	 M |   _____________
		 //  E |  |__|___|___|__|
		 //  N |  |____table____|
		 //  U |  |_____________|
		 //    |  |_____________|
		 //    |______________________
		 // 
		 
		 var defaults = {
					msg		: 'This is a message.',
					title	: '',
					option	: null,
					features: null,
					modal	: null,
					opacity	: null,
					closeOK	: null,
					foot	: null,
					popout	: null,
					confirmed: null,
					autoClose: null,
					callback: null,
					closeButton: null
				};
		 
		 var opts = jQuery.extend({}, defaults, options);
		 
		jQuery('#msgInfo')
			.html(opts.msg)
			.fadeIn(100)
			.delay(3000)
			.fadeOut(200);
			//.show('200');
			
			function hideMessage(){
				jQuery('#msgInfo').hide();
			}
	 },
	 /**
		*		alert
		*		Uses facebox
		*		Maybe will migrate to fancybox
		*   	TODO: 
		**/
	 alert: function(options){
		  
			var defaults = {
				msg		: '',
				title	: '',
				option	: null,
				features: null,
				modal	: null,
				opacity	: null,
				closeOK	: null,
				foot	: null,
				popout	: null,
				confirmed: null,
				autoClose: null,
				callback: null,
				closeButton: null,
				success	:	'',
				width	: 350,
				height	: 500
			};
			
			var opts = jQuery.extend({}, defaults, options);
			
			//	set default value msg with 'alert'
			//  so trigger alertThis with no parameter is still allowed
			//  alertThis(); will popup alert box with alert msg.
			  if(opts.msg == '' || opts.msg === undefined) {
						opts.msg = 'alert';
			  }
		
			//	set default value title with a space
			if(opts.title == '' || opts.title === undefined) {
				//title = '<img src="'+SMP.hostname+'/images/icon_error3.gif" /> Alert';
				opts.title = 'Alert';
	    	}
	    	else
	    	{
	    		//title =  '<img src="'+SMP.hostname+'/images/icon_error3.gif" /> ' + title;
	    		//title =  title;
	    	}	
			
			if(opts.option == '' || opts.option === undefined) {
					//assuming it's a div
				opts.option = 'div';			
			}
					
			// features
			// 1) info
			// 2) alert / help
			// 3) warning
			// 4) confirm
			// 5) form
			// 6) process
			// 7) custom
			// 8) Error


			if(	opts.option == 'ajax' && ( opts.features == '' || opts.features === undefined )){
				opts.features = 'form';		
			}
			
			if( opts.features == '' || opts.features === undefined ) {
				// it must be an alert
				opts.features = 'alert';
			}

			
			// special case
			// if option = 'info', because we want to differentiate between alert n info
			if( opts.option == 'info' ) {
				opts.option = 'div';
				// set features info
				opts.features = 'info';
			}
			
			// Default all settings first
			
			// 1) user can click outside box to trigger close
			jQuery.facebox.modal(false);
			
			// 2) make the opacity 0, so there's no fadeIn background
			jQuery.facebox.opacity(0);
			
			// 3) set box has a close button
			jQuery.facebox.closeOK(true);
			
			// 4) make it has a foot
			jQuery.facebox.foot(true);
			
			// 5) box fade in
			jQuery.facebox.popout(false);
			
			// 6) OK and Cancel appear
			jQuery.facebox.confirmed(false);
			
			// 7) make facebox box close by triggering close action
			jQuery.facebox.autoClose(false);
			
			// 8) make facebox box draggable
			jQuery.facebox.draggable(true);
			
			// 9) call function callback after revealing facebox
			jQuery.facebox.callback('');
			
			// 10) facebox settings for error
			jQuery.facebox.error(false);
			
			jQuery.facebox.popout(false);
			
			//jQuery.facebox.settings.popup(false);
			
			// start 
			if( opts.features == 'alert' || opts.features == 'help' ){
					// user must click OK
					jQuery.facebox.modal(true);
					
					// box popout no fadeIn
					jQuery.facebox.popout(true);
					
					//HASNOL ADD 15042009
					// make facebox box automatically close on mouse click or keyboard keypress
					jQuery.facebox.autoClose(false);
					
			}

			if( opts.features == 'info' ){
					// make it no foot
					jQuery.facebox.foot(false);
					
					// box popout no fadeIn
					jQuery.facebox.popout(true);
					
					// make facebox box automatically close on mouse click or keyboard keypress
					jQuery.facebox.autoClose(true);
			}
			
			if( opts.features == 'warning' ){
					// user must click OK
					jQuery.facebox.modal(true);
							
			}
			
			if( opts.features == 'confirm' ){
					// user must click OK or Cancel
					jQuery.facebox.modal(true);
							
					// OK and Cancel appear
					jQuery.facebox.confirmed(true);
			}
		
			if( opts.features == 'form' ){
					// user must click OK or Cancel
					jQuery.facebox.modal(true);
					
					// make the opacity 0, so there's no fadeIn background
					jQuery.facebox.opacity(0.6);
					
					jQuery.facebox.popup(true);
					
					jQuery.facebox.callback(callback);
											
			}
			
			if( opts.features == 'process' ){
					// user must click OK
					jQuery.facebox.modal(true);
					
					// make the opacity 0.6
					jQuery.facebox.opacity(0.6);
					
					// make it no foot
					jQuery.facebox.foot(false);
					
					// 8) make facebox box undraggable
					jQuery.facebox.draggable(false);
							
			}
			
			
			if( opts.features == 'error' ){
					// user must click OK
					jQuery.facebox.modal(true);
					
					// make the opacity 0.6
					jQuery.facebox.opacity(0.8);
									
					// 8) make facebox box undraggable
					jQuery.facebox.draggable(true);
					
					// trigger an error features
					jQuery.facebox.error(true);
					
					
			}
			
			// CUSTOM Settings
			if( opts.features == 'custom' ){
					// user can define specific option
				// 1) user can click outside box to trigger close
				jQuery.facebox.modal(modal);
				
				// 2) make the opacity 0, so there's no fadeIn background
				jQuery.facebox.opacity(opacity);
				
				// 3) set box has a close button
				jQuery.facebox.closeOK(closeOK);
				
				// 4) make it has a foot
				jQuery.facebox.foot(foot);
				
				// 5) box fade in
				jQuery.facebox.popout(popout);
				
				// 6) OK and Cancel appear
				jQuery.facebox.confirmed(confirmed);
				
				// 7) make facebox box close by triggering close action
				jQuery.facebox.autoClose(autoClose);	
			
			}
			
			if(opts.width != null){
				// jQuery('#facebox .body').css('width','350px');
				jQuery.facebox.settings.width = opts.width + 'px';
			}
			
			
			
			// initiating facebox
			if(opts.option == 'div'){
			 	jQuery.facebox(opts.msg);
			}else if(opts.option == 'image'){
				jQuery.facebox({image: opts.msg});
			}else if(opts.option == 'ajax'){
				jQuery.facebox({ajax: opts.msg});
			}else{
				// same like 'div'
				jQuery.facebox(opts.msg);
			}
			
			
			
			// After facebox revealing all facebox divs, set title
			jQuery.facebox.title(opts.title);	
			
			(opts.success == ""    || opts.success == undefined)    ? "" : opts.success(opts);
			//alertThis(opts.msg, opts.title, opts.option, opts.features, opts.modal, opts.opacity, opts.closeOK, opts.foot, opts.popout, opts.confirmed, opts.autoClose, opts.callback);
    
		},
		
		
		
		alert2: function(options){
			  
			var loadingIcon = '<div id="loadingIcon"></div>';
			var defaults = {
				msg			: '',
				title		: '',
				option		: null,
				features	: null,
				modal		: null,
				opacity		: null,
				closeOK		: null,
				foot		: null,
				popout		: null,
				confirmed	: null,
				autoClose	: null,
				success		: null,
				start		: null,
				closeButton	: null,
				showCloseButton: false,
				width		: nc.popupWidth(),
				height		: nc.popupHeight(),
				overlay		: true,
				ajax		: false,
				type 		: 'html',
				href 		: '',
				url 		: ''
			};
			
			var opts = jQuery.extend({}, defaults, options);
			
			var imageIcon = '/images/icons/closePopup2.gif';//images/icon/close.pop.png
			
			function formatTitle(title, currentArray, currentIndex, currentOpts) {
			    return '<div id="tip7-title"><span><a href="javascript:;" onclick="jQuery.fancybox.close();"> ' +
			    '<img src="'+nc.hostname + imageIcon+'" /></a></span>' 
			    + title + '</div>';
			}
			
			jQuery('#fancybox-inner').append('<div style="font-size:30px;" id="loading-iframe">Loading</div>');
			
			//jQuery.fancybox.showActivity();
			
			//opts.width = nc.popupWidth();
			//opts.height = nc.popupHeight();
			
			jQuery.fancybox(
					opts.msg,
					{
						'title' 			: opts.title,
						'titlePosition'		: 'insideUp',
						'titleFormat'		: formatTitle,
						'showCloseButton'	: opts.showCloseButton,
			        	'autoDimensions'	: false,
						'width'         	: opts.width,
						'speedIn'			: 100, 
						'speedOut'			: 100,
						'height'        	: opts.height,
						'transitionIn'		: 'none',
						'transitionOut'		: 'fade',
						'overlayShow'		: opts.overlay,
						'type' 				: opts.type,
						'href'				: opts.href || opts.url ,
						'modal'				: opts.modal,
						'onClosed'			: opts.close,
						//onStart				: opts.start,//function(){ opts.start; nc.loadingIcon('#fancybox-inner'); }, 
				        //onComplete			: opts.success//function(){ opts.success(); nc.removeLoadingIcon('#fancybox-inner'); }
						'onComplete' : function()
			            { 
							jQuery.fancybox.resize(); 
							opts.success();
			                
			            }  
						//afterLoad			: opts.success
					}
				);
			
			
				if(opts.type == 'iframe'){
					jQuery('#fancybox-frame').load(function(){
						//jQuery('#loading-iframe').hide();
					});
				}
			//jQuery.fancybox.hideActivity();
			
			// dragging
			//jQuery('#fancybox-outer').easydrag();
			
			
			// adjust height
			/*jQuery(window).resize(function() {
				var ah = jQuery(this).height();
				var ph = jQuery(this).parent().height();
				ah = parseInt(ah) - 100;
				
				jQuery('#fancybox-wrap,#fancybox-inner').css({'height':ah}).valign();
			});*/
			
			//(opts.success == '' || opts.success == undefined)?'':opts.success();
		},
		
		msg: function(options){
			  
			var defaults = {
				msg		: '',
				destroy : ''
			};
			
			var opts = jQuery.extend({}, defaults, options);
			
			if( opts.destroy != '' ){
				jQuery('#msg_notification')
					//.fadeOut(218);
					.stop().animate({'opacity':'0'}, 218);
			}else{
				jQuery('#msg_notification').halign()
					//.stop().animate({'opacity':'1'}, 218)
					.show()
					.html(opts.msg);//.delay(200).hide(200);
				
			}
			
		},
		
		alert3: function(options){
			// humanMsg function
			var defaults = {
					  msg		: ''
					, title		: ''
					, timeout	: true
				};
				
			var opts = jQuery.extend({}, defaults, options);
				
			humanMsg.displayMsg(opts.msg, opts.timeout);
			
		},
		
		valign: function(){
			
		},
		
		
		
		/**
		*		confirm
		*		Uses facebox
		*		Maybe will migrate to fancybox
		*   	TODO: 
		**/
		confirm: function(options){
		  
			var defaults = {
				msg: '',
				title: '',
				accept: '',
				cancel: '',
				success: ''
				
			};
			
			var opts = jQuery.extend( defaults, options );
			
			//	set default value title
			if(opts.title == '' || opts.title === undefined) {
				opts.title = 'Confirmation';
			}
			// using alertThis
			nc.alert({
				msg: opts.msg, 
				title: opts.title,
				option: 'div',
				features: 'confirm',
				success : opts.success
			});
					
			jQuery("#facebox .accept").click(function(){
			 		var acceptTimeout = setTimeout(function(){
			 			(opts.accept == '' || opts.accept === undefined)? '' : opts.accept();
			 		}
			 		,50);
		
					closethis();
			 });
			 
			jQuery("#facebox .reject").click(function(){
					(opts.cancel == '' || opts.cancel === undefined)? '' : opts.cancel();
					
					// close facebox 
					closethis();
			});
			
			var closethis = function(){
				jQuery.facebox.close();
			}
			
			//confirmThis(opts.msg, opts.title, opts.accept, opts.cancel);

		},
		
		/**
		*		confirm
		*		Uses facebox
		*		Maybe will migrate to fancybox
		*   	TODO: 
		**/
		confirm2: function(options){
		  
			var defaults = {
				msg		: '',
				title	: '',
				width	: '',
				height	: '',
				accept	: '',
				cancel	: '',
				success	: ''
			};
			
			var opts = jQuery.extend( defaults, options );
			
			//	set default value title
			if(opts.title == '' || opts.title === undefined) {
				opts.title = 'Confirmation';
			}
			var msg = 'Click <b>OK</b> to proceed or <b>CANCEL</b> to cancel action. <br /><br /> ' +
			'<input type="button" class="accept" id="confirm" value="OK">&nbsp;&nbsp; ' +
			'<input type="button" class="reject" id="cancel" value="Cancel"><br />';
			// using alertThis
			nc.alert2({
				msg: '<div style="margin:10px;">' + opts.msg + msg + '</div>', 
				title: opts.title,
				width: opts.width,
				height: opts.height,
				option: 'div',
				features: 'confirm',
				success: function(){}
			});
					
			jQuery("#fancybox-wrap #confirm").on('click',function(){
			 		var acceptTimeout = setTimeout(function(){
			 			(opts.accept == '' || opts.accept === undefined)? '' : opts.accept();
			 		}
			 		,50);
		
					closethis();
			 });
			 
			jQuery("#fancybox-wrap #cancel").on('click',function(){
					(opts.cancel == '' || opts.cancel === undefined)? '' : opts.cancel();
					
					// close facebox 
					closethis();
			});
			
			var closethis = function(){
				//jQuery.facebox.close();
				jQuery(document).find("#fancybox-overlay").click();

			}
			
			//confirmThis(opts.msg, opts.title, opts.accept, opts.cancel);

		},
	 
		/**
		 * popup: function popup
		 * @param options
		 * @return
		 */
		popup: function(options){
			var defaults = { 
			  title: '',
			  msg: '',
			  container: '',
			  callback: ''
	  		};
					
			var opts = jQuery.extend(defaults, options);
					
			alertThis(opts.msg, opts.title, null,'form',null,null,null,null,null,null,null,opts.callback);
		},
		// Log msg to firebug console
		log : function(msg){
			(msg === undefined || msg === null)?'Log from nc':msg;
			if (typeof console != "undefined" && typeof console.debug != "undefined") {
					console.log("%s: %o", msg, this);
				} else {
					//alert(msg);
				}
			return this;
		},
		
		// Same with nc.log but without %s and %o and will force to pop alertThis for browser without console
		out : function(msg){
			(msg === undefined || msg === null)?'Log from nc':msg;
			if(nc.debug){
				if (typeof console != "undefined" && typeof console.debug != "undefined") {
					console.info("%s: %o", msg, this);
				} else { 
					//alert(msg);
				}
			}
			return this;
		},
		
		err : function(msg){
			(msg === undefined || msg === null) ? 'Log from nc' : msg;
			if(nc.debug){
				if (typeof console != "undefined" && typeof console.debug != "undefined") {
					console.error("%s: %o", msg, this);
				} else { 
					//alert(msg);
				}
			}
			return this;
		},
		
		// msgBar : not implemented yet
		msgBar: function(type) {
			if(type=="save"){
				// inject the bar into body, [saving...]
				
				// bind ajax trigger, [saved..]
			}
			//jQuery('body').html();
		},
		
		// nc loading big
    lb: function(div, str) {
			 if( str === null || str === undefined ) str = '';	 
       jQuery(div).html('<img src="' + nc.hostName + '/images/loading.gif"/> '+str); 
    },
	
    //loading
    loadingIcon: function(elem, str){
   	 if( str === null || str === undefined ) str = '';	 
     //jQuery(elem).prepend('<div id="loadingIcon"><img src="' + nc.hostName + '/images/loading.gif"/> '+str+'</div>');
     jQuery(elem).prepend('<div id="loadingIcon">'+str+'</div>');
    },
    
    removeLoadingIcon: function(elem){
        jQuery('#loadingIcon', elem).remove();
       },
    
	// nc loading small
	ls : function(div, str) {
			if( str === null || str === undefined ) str = '';
       jQuery(div).html('<img src="' + nc.hostName + '/images/loading.gif" width="15" height="15"/>'+str);
    },
		
		// nc loading
		loading : function(div) {
        jQuery(div).html('<img src="' + nc.hostName + '/images/ajax-loader.gif" />');
     },
		 
		/**
		*		EXTEND jQuery
		**/
		extendjQuery: function(){	
			
		jQuery.fn.extend({
					// disable/enable button in nc
					disableButton: 	function(){
						 return this.each(function() { 
									jQuery(this).attr('disabled',true).parent().attr('id','button_disabled');							 
							});
					},
				 
				 enableButton : function(){
						 return this.each(function() { 
									jQuery(this).removeAttr('disabled').parent().removeAttr('id');										 
							});
				 },
				 
				 // Split into Array
				 splitIntoArray : function(str, character ) {
			 
						var output = new Array();
						try{
							output = nc.formatInput(str, character);
						}catch(e){
							nc.out(e);
						}
						return output;
					},
					
					// debug
					debug : function(msg) {
							(msg === undefined || msg === null)?'Log from nc':msg;
							try{
								//console.log("%s: %o", msg, this);
							}catch(e){
							}
							return this;
					},
					
					retrieve: function(){
						nc.base.table;
					},
					
					tableTitle: function(title){
						
						 return this.each(function() { 
							 nc.out(jQuery(this).closest('div#table_title').size())
							 if( jQuery(this).closest('#table_title').size() == 0 ){
								 jQuery(this).before('<div id="table_title">'+title+'<div title="Minimize/Maximize Table" class="ptogtitle"><span/></div></div>')
							 }
						});
					}
			});
		},
		
	 /**
		*		PAGINATION
		*		Original code by Rizam on Java 0006
		*		Translate to javascript using prototype by Hudz 0308
		*		Convert to jQuery by Hudz 0309
		*   	TODO: Convert to jQuery plugin, xsiap
		**/
		pagingThis : function(div) {
				
			 	// Paging settings
				var pagingSettingsNewPage = "";
				var pagingSettingsMin = "";
				var pagingSettingsMax = "";
				var pagingSettingsPageCount = "";
				var pagingSettingsRange = "";
				jQuery('.pagingThis').html(nc.htmlPaging);
				jQuery(document).trigger('loading.smp.paging');
    },
    
		
		 // breadcrumb by page
		 breadCrumbPg : function(first, second, third, fourth) {
			 	 jQuery(document).trigger('smp.breadcrumb');
				 
				 // Format set data default
			 	 // to set in every page
				 (first == null) ? '' : first;
				 (second == null) ? '' : second;
				 (third == null) ? '' : third;
				 (fourth == null) ? '' : fourth;
				
			 	 jQuery.data(nc.urlBreadCrumb, nc.urlBC, { first: first, second: second, third: third, fourth: fourth });
				 nc.breadCrumb();
		 },
		 
	 /**
	 * randomCharacter: random Character
	 * @param length
	 * @return randCharacter
	 */
	
	  randomCharacter: function (length) {
		length = 6;
		var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		var pass = "";
		for(var i = 0; i < length; i++) {
			var index = Math.floor(Math.random() * 62);
			pass += chars.charAt(index);
		}

		return randCharacter;
	 },
	 
	 /**
	 * TODO: nak escapekan character '"'
	 * escapeCaharacter
	 * @param str
	 * @return str
	 */
	
	 escapeCharacter:function(str){
		// process this str
		
		return str.replace('"','&quot;');
	},
	
	/**
	 * onKeyChange: for delay function above
	 * @param function_callback
	 * @return
	 */
	
	 onKeyChange:function(function_callback) {
		// ignore if the following keys are pressed: [del] [shift] [capslock]
		if( lastKeyPressCode == 46 || (lastKeyPressCode > 8 && lastKeyPressCode < 32) ) return ;
		var v = nc.inputSearch.val();
		if (v == prev) return;
		prev = v;
		if (v.length >= minChars) {
			(function_callback == '' || function_callback === undefined)?'':function_callback(v);
		} else {
			
		}
	},
	/**
	 * searchThis: function delay
	 * @param input
	 * @param func
	 * @return
	 */
	 searchThis:function(input, func){
		nc.inputSearch = input;
		
		nc.inputSearch
		.keydown(function(e) {
			// track last key pressed
			lastKeyPressCode = e.keyCode;
			switch(e.keyCode) {
				case 38: // up
					//e.preventDefault();
					//moveSelect(-1);
					break;
				case 40: // down
					//e.preventDefault();
					//moveSelect(1);
					break;
				case 9:  // tab
				case 13: // return
					if( selectCurrent() ){
						// make sure to blur off the current field
						$input.get(0).blur();
						//e.preventDefault();
					}
					break;
				default:
					active = -1;
					if (nc.timeout) clearTimeout(nc.timeout);
					nc.timeout = setTimeout(function(){onKeyChange(func);}, delay);
					break;
			}
		})
		
		.focus(function(){
			// track whether the field has focus, we shouldn't process any results if the field no longer has focus
			nc.hasFocus = true;
		})
		.blur(function() {
			// track whether the field has focus
			nc.hasFocus = false;
			
		});
	},
	
	search : function(input, func){
		jQuery(input).bind('keyup',  function(event, i, func) {
			var timerWait = 500;
			var overrideBool = false;
			var inputBox = this;
			
			if (event.keyCode == '13') {
				timerWait = 1;
				overrideBool = true;
				
			  }
			
			var timerCallback = function(func)
			{
			//	opts.filterType = jQuery('#select_s').val();
				//opts.filter = jQuery(inputBox).val();
				func;
			}

			// Reset the timer			
			clearTimeout(nc.timeout);
			timer = setTimeout(timerCallback, timerWait);				

			return false;
		});
	},

	
	humanMsg: function(options){
		// humanMsg function
		var defaults = {
				  msg		: ''
				, title		: ''
				, timeout	: true
			};
			
			var opts = jQuery.extend({}, defaults, options);
			
		(humanMsg.length !== undefined) ? humanMsg.setup() : '';
		humanMsg.displayMsg(opts.msg, opts.timeout);
	},
	
	
	
	
	
	
	
	 strip: function() {
		return this.replace(/^\s+/, '').replace(/\s+$/, '');
  	 },
	
  	/**
 	 * toQueryParams: function convert to parameter url
 	 * @param separator
 	 * @return hash
 	 */
	 toQueryParams: function(separator) {
	    var match = this.strip().match(/([^?#]*)(#.*)?$/);
	    if (!match) return { };
	
	    return match[1].split(separator || '&').inject({ }, function(hash, pair) {
	      if ((pair = pair.split('='))[0]) {
	        var key = decodeURIComponent(pair.shift());
	        var value = pair.length > 1 ? pair.join('=') : pair[0];
	        if (value !== undefined) value = decodeURIComponent(value);
	
	        if (key in hash) {
	          if (!Object.isArray(hash[key])) hash[key] = [hash[key]];
	          hash[key].push(value); 
	        }
	        else hash[key] = value;
	      }
	      return hash;
	    });
  	 },
	
	tez: function (x){
	nc.log(x)
	},
	
	

	// W3C Source Code
	// GET CURRENT DATE
	getCurrentDate: function(){
		var currentTime = new Date();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		if(month < 10){
			month = '0' + month;
		}
		 
		return day + '/' + month + '/' + year;
	},
	
	// W3C Source Code
	// GET CURRENT DATE
	getCurrentMonth: function(format){
		var currentTime = new Date();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		if(month < 10){
			month = '0' + month;
		}
		
		if(format == 'MON'){
			month = nc.getLookupMonth(month);
		}else{
			
		}
		 
		return month;
	},
	
	getLookupMonth: function(month){
		var monthArr = ['','JAN', 'FEB', 'MAC', 'APR', 'MEI', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
		var monthStr = '';
		for(var a = 0; a < monthArr.length; a++){
			var aInner = (a < 10) ? '0' + a : a ; 
			if( aInner.toString() == month.toString() ){
				monthStr = monthArr[a];
				break;
			}
		}
		return monthStr;
	},
	
	// W3C Source Code
	// GET CURRENT DAY
	getCurrentDay: function(){
		  
			var d=new Date();
			var weekdays=new Array(7);
			var weekdayBM=new Array(7);
			weekdayBM[0]="Ahad";
			weekdayBM[1]="Isnin";
			weekdayBM[2]="Selasa"; 
			weekdayBM[3]="Rabu";
			weekdayBM[4]="Khamis";
			weekdayBM[5]="Jumaat";
			weekdayBM[6]="Sabtu";
			
			var weekdayBI=new Array(7);
			weekdayBI[0]="Sunday";
			weekdayBI[1]="Monday";
			weekdayBI[2]="Tuesday";
			weekdayBI[3]="Wednesday";
			weekdayBI[4]="Thursday";
			weekdayBI[5]="Friday";
			weekdayBI[6]="Saturday";
			
			if(nc.people != null){
				if(nc.people.getLanguage() == nc.Bahasa){
					weekdays = weekdayBM;
				}else{
					weekdays = weekdayBI;
				}
			}else{
				weekdays = weekdayBI;
			}
			
			return weekdays[d.getDay()];
	},
	
	convertDay: function(str){
		
		  var newHari = "";
		  var weekdayBM=new Array(7);
			weekdayBM[0]="Ahad";
			weekdayBM[1]="Isnin";
			weekdayBM[2]="Selasa";
			weekdayBM[3]="Rabu";
			weekdayBM[4]="Khamis";
			weekdayBM[5]="Jumaat";
			weekdayBM[6]="Sabtu";
			
			var weekdayBI=new Array(7);
			weekdayBI[0]="Sunday";
			weekdayBI[1]="Monday";
			weekdayBI[2]="Tuesday";
			weekdayBI[3]="Wednesday";
			weekdayBI[4]="Thursday";
			weekdayBI[5]="Friday";
			weekdayBI[6]="Saturday";
			
			for(var i=0; i<weekdayBI.length; i++){
				if(jQuery.trim(str).toLowerCase() == weekdayBM[i].toLowerCase()){
					newHari = weekdayBI[i];
				}else{
					for(var j=0; j<weekdayBI.length; j++){
						if(jQuery.trim(str).toLowerCase() == weekdayBI[j].toLowerCase()){
							newHari = weekdayBM[j];
						}
						
					}
				}
			}
			
			return newHari.toUpperCase();
	},
	
	convertDayBI:function(str){
		 var newHari = "";
		  var weekdayBM=new Array(7);
			weekdayBM[0]="Ahad";
			weekdayBM[1]="Isnin";
			weekdayBM[2]="Selasa";
			weekdayBM[3]="Rabu";
			weekdayBM[4]="Khamis";
			weekdayBM[5]="Jumaat";
			weekdayBM[6]="Sabtu";
			
			var weekdayBI=new Array(7);
			weekdayBI[0]="Sunday";
			weekdayBI[1]="Monday";
			weekdayBI[2]="Tuesday";
			weekdayBI[3]="Wednesday";
			weekdayBI[4]="Thursday";
			weekdayBI[5]="Friday";
			weekdayBI[6]="Saturday";
			
			for(var i=0; i<weekdayBI.length; i++){
				if(jQuery.trim(str).toLowerCase() == weekdayBM[i].toLowerCase()){
					newHari = weekdayBI[i];
				}else{
					newHari = str;
				}
			}
			
			return newHari.toUpperCase();
	},
	
	
	gohref: function(msg){
		location.href = msg;
	},
	
	refresh: function(){
		location.href = location.href;
	},
	
	action: function(url){
		jQuery('#flushContent').animate({'opacity':'0.5'}, 218);
		location.href = nc.hostname + '/' + url;
	},
	
	go: function(msg){
		if(msg == 'this'){
			location.href = location.href;
		}else{
			location.href = msg;
		}
	},
	
	nextPage:function(path){
		var url = nc.hostName;
		var applid = nc.getParameter('applid');
		url = url + '/action/portal/admission/' + path + '?applid=' + applid;
		nc.gohref(url);
	},
	
	getParameter: function( name )
	{
	  // old ones
	  /*name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( window.location.href );
	  if( results == null )
	    return "";
	  else
	    return results[1];
	    */
	  // newer and improved
	  // 190411
		var match = RegExp('[?&]' + name + '=([^&]*)')
        .exec(window.location.search);
	  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	},
	
	
    getScript : function(url, callback, cache){
    	jQuery.ajax({
    			type: "GET",
    			url: url,
    			success: callback,
    			dataType: "script",
    			cache: cache
    	});
    },
   
    setAttribute: function(name, value, func){
    	jQuery.ajax({
			type: "POST",
			url: nc.hostName+"/action/setAttribute",
			data: "value="+value+"&name="+name,
			cache: false,
			success: function(value){
				jQuery(document).trigger('nc.setAttribute_'+name);
				if(func != undefined){func();}
			}	
    	});
    },
    
    getAttribute: function(name){
    	var response = "";
    	jQuery.ajax({
			type: "POST",
			url: nc.hostName+"/action/getAttribute",
			data: "name="+name,
			cache: false,
			success: function(value){
    			nc.subMenuHTML = value;
    			jQuery(document).trigger('nc.getAttribute_'+name);
    			
    		}			
    	});
    	//return response;
    },
    
    validateReport: function(exclude){
    	var msg = "";
    	var please = 'SILA PILIH';
    	var nl = "<br />";
    	nc.validReport = true;
    	
    	var excludeArr = [];
    	var pattern = '';
    	
    	if(exclude == undefined ){
    		excludeArr = [' '];
    	}else{
    		excludeArr = exclude.split(',')
    	}
    	
    	
    	jQuery('select','[name=main_form]').each(function(){
    		if(exclude != undefined ){
    			pattern = '/'+jQuery(this).attr('id')+'/gi';
    			if( !exclude.match(/jQuery(this).attr('id')/gi) ){
    				// do nothing
    			}else{
    				
    				if(jQuery(this).val() == '-'){
    	    			var name = jQuery(this).parent().prev().prev().html();
    	    			msg = msg + please + " " + name + nl;
    	    			nc.validReport = false;
    	    		}
    			}
    		//}
    		}else{
    			if(jQuery(this).val() == '-'){
	    			var name = jQuery(this).parent().prev().prev().html();
	    			msg = msg + please + " " + name + nl;
	    			nc.validReport = false;
	    		}
    		}
    		
    	});

    	
    	if(!nc.validReport){
    		
    		alertThis(msg,'Alert');
    		jQuery('button','[name=main_form]').unbind('click');
    	}else{
    		
    		prepareURL();
    		
    	}
    },
    
    tooltip: function(){
    	
    	var title = "";
    	var stringExcludeImage = "rounded_top_reverse rounded_top arrow defaultstudent indicator file15310"
    	var excludeImage = stringExcludeImage.split(" ");
    	var imgObjExclude = '';
    	
    	jQuery.each(excludeImage, function(i){
    		imgObjExclude += 'img[src*='+excludeImage[i]+']' + ( ( i + 1 == excludeImage.length ) ? '' : ',' );
    	});
    	
    	/*for(var a = 0; a < excludeImage.length; a++){
    		imgObjExclude += 'img[src*='+excludeImage[a]+']' + ((a+1 == excludeImage.length)?'':',');
    	}*/
    	// effect table kat body masa onload
    	/*jQuery('*')
    	.filter(function(){
    		return 
    	});*/
    	
    	
    	jQuery('img:not(:regex(src, ^'+stringExcludeImage+'$))')
    	//jQuery('img')
    	//.not(imgObjExclude)
    	.each(function(){
    		//jQuery(this).data('extension', jQuery(this)[0].src.match(/\.(.{1,4})$/)[1]);
    			decodeTitle(this);
    	});
    	
    	
    	
    	// bind with doneRender trigger TableSorter
    	jQuery(document).bind('doneRender sortEnd sortOn', function(){
    		// effect kat image dalam table shj panggil ajax/ selepas render table
	    	jQuery('.sortablescroll, .table_bar').find('img').each(function(){
	    			decodeTitle(this);
	    	});
	    	
	    	// effect kat all element class search_s kat filter bar
	    	// effect selepas panggil ajax
	    	jQuery('img.search_s, img.first, img.prev, img.next, img.last', '.blue_bar_high, .facebox, body').each(function(){
	    			decodeTitle(this);
	    	});
	    	
	    	jQuery('#select_all_checkbox, #checkboxselectall').each(function(){
				var titleCheckbox = jQuery(this).attr('title');
				jQuery(this).tipsy({gravity: 's',
	    			title: function() { return jQuery(this).attr('original-title').toUpperCase(); } });
			});
    	});
    	
    	
    	var iconTitleBM = [];
    	var iconTitleBI = [];
    	
    	
    	function decodeTitle(element){
    		try{
    			var bm = true;
    			if(nc.people == null){
    				
    			}else{
    				//bm = (nc.people.getLanguage() == nc.Bahasa)? true: false;
    			}
    			
	    		var falseStr = (jQuery.browser.msie) ? false : undefined;
	    		
	    		if(jQuery(element).attr('disabled') == falseStr){
	    		//if(jQuery(element).attr("disabled") === undefined){
		    		title = jQuery(element).attr('src');
	    			//alert(title)
		    		if( title == undefined ) title = "";
		    		
		    		if(title.match(/edit/gi)){
		    			title = ( bm )?'Kemaskini':'Edit';
		    		}else if(title.match(/delete/gi)){
		    			title = ( bm )?'Hapus':'Delete';
		    		}else if(title.match(/cancel/gi)){
		    			title = ( bm )?'Batal':'Cancel';
		    		}else if(title.match(/print/gi)){
		    			title = ( bm )?'Cetak':'Print';
		    		}else if(title.match(/add/gi)){
		    			title = ( bm )?'Tambah':'Add';	
		    		}else if(title.match(/search/gi)){
		    			title = ( bm )?'Carian':'Search';
		    		}else if(title.match(/nc.people/gi)){
		    			title = ( bm )?'Papar':'Display';
		    		}else if(title.match(/application_form_magnify/gi)){
		    			title = ( bm )?'Papar':'View';
		    		}else if(title.match(/send/gi)){
		    			title = ( bm )?'Hantar':'Send';
		    		}else if(title.match(/file/gi)){
		    			title = ( bm )?'':'';
		    		}else if(title.match(/first/gi)){
		    			title = ( bm )?'Pertama':'First';
		    		}else if(title.match(/prev/gi)){
		    			title = ( bm )?'Sebelum':'Previous';
		    		}else if(title.match(/next/gi)){
		    			title = ( bm )?'Selepas':'Next';
		    		}else if(title.match(/last/gi)){
		    			title = ( bm )?'Akhir':'Last';
		    		}else if(title.match(/cal/gi)){
		    			title = ( bm )?'Kalendar':'Calendar';
		    		}else if(title.match(/close/gi)){
		    			title = ( bm )?'Tutup':'Close';
		    		}else if(title.match(/change/gi)){
		    			title = ( bm )?'Tukar':'Change';
		    		}else if(title.match(/cross/gi)){
		    			title = ( bm )?'Hapus':'Delete';
		    		}else if(title.match(/clipboard/gi)){
		    			title = ( bm )?'Had Capaian':'View Access';
		    		}else if(title.match(/house/gi)){
		    			title = ( bm )?'Muka Utama':'Main Page';
		    		}else if(title.match(/error/gi)){
		    			title = ( bm )?'Kesalahan':'Error';
		    		}else if(title.match(/user-comment-red/gi)){
		    			title = ( bm )?'Lihat Keseluruhan Profil':'View complete profile';
		    		}else if(title.match(/i_tasks/gi)){
		    			title = ( bm )?'Tugasan':'Tasks';
		    		}else if(title.match(/letter/gi)){
		    			title = ( bm )?'Surat':'Letter';
		    		}else if(title.match(/process/gi)){
		    			title = ( bm )?'Proses':'Process';
		    		}else if(title.match(/logout/gi)){
		    			title = ( bm )?'Log Keluar':'Logout';
		    		}
		    		else if(title.match(/summary/gi)){
		    			title = ( bm )?'Laporan':'Report';
		    		}
		    		else if(title.match(/script/gi)){
		    			title = ( bm )?'Laporan':'Report';
		    		}
		    		else if(title.match(/application.go/gi)){
		    			title = ( bm )?'Proses':'Process';
		    		}
		    		else if(title.match(/tambah_grey/gi)){
		    			title = ( bm )?'Tambah':'Add';
		    		}
		    		else if(title.match(/update/gi)){
		    			title = ( bm )?'Kemaskini':'update';
		    		}
		    		else if(title.match(/cetak/gi)){
		    			title = ( bm )?'Cetak':'Print';
		    		}
	    		
	    		/*jQuery(element)
				.attr('title', 'Full Screen')
				.tipsy({gravity: 'nw',
				title: function() { return jQuery(this).attr('original-title').toUpperCase(); } })*/
	    		
	    		jQuery(element)
	    			.attr('title',title)
	    			.tipsy({gravity: 'se',
	    			title: function() { return jQuery(element).attr('original-title').toUpperCase(); } });
    		}
    		}catch(e){
    			
    		}
    	}
    },
    
    
    
	// Set Dialog on facebox dialog (header and content)
	setDialog : function(content, header){
		// set header
		jQuery('.header', '#facebox').children().eq(0).html(header);
		// set content
		jQuery('.content', '#facebox').html(content);
	},
	
	// uppercase
	uppercase: function(src){
		jQuery(src).keyup(function(e) {
			var val = jQuery(this).val();
			val = val.toUpperCase();
			jQuery(this).val(val);
		})
	},
	
	getCookie: function() {
		return jQuery.cookie(nc.sessionCookie) || 0;
	},
    
    alterFacebox : function(){},
    
    viewDocument: function(options){
    	
    	var defaults = {
				msg		: '',
				title	: '',
				option	: null,
				features: null,
				modal	: null,
				opacity	: null,
				closeOK	: null,
				foot	: null,
				popout	: null,
				confirmed: null,
				autoClose: null,
				success: null,
				closeButton: null,
				width: '350',
				height: 'auto',
				overlay: false,
				ajax: false,
				type : 'iframe',
				href : '',
				direct : false,
			};
			
			var opts = jQuery.extend({}, defaults, options);
			nc.alert2({
	    		msg		:'<div id="loading"></div>',
	    		title	: opts.title||'Title',
	    		type	: 'iframe',
	    		href 	: (opts.direct)? opts.href : 'http://docs.google.com/viewer?url=' + opts.href + '&embedded=true',
	    		overlay: true,
	    		success: function(){
					opts.success();
	    		}	
	    	});	
			
    },
    
    report: function (url, title){
    	
    	nc.alert2({
    		msg:'',
    		title: title||'Title',
    		type: 'iframe',
    		href :  url,
    		overlay: true,
    		success: function(){
    			
    		}	
    	});	
    },
    
    reports: function (level, domain, parameter, title  ){
    	var url = "";
    	var domainRepo = "";
    	var fullURL = "";
    	//http://sgsrep2.upm.edu.my/reports/rwservlet?gsoreports&GS05b_VO.rdf STUD_IDD="+studid,
    	if (level.toUpperCase() == "STAFF"){
    		url = "http://sgsrep.upm.edu.my:7777/reports/rwservlet?";
    	}else if(level.toUpperCase() == "STUDENT"){
    		url = "http://sgsrep2.upm.edu.my/reports/rwservlet?";
    	}else{
    		url = "http://sgsrep2.upm.edu.my/reports/rwservlet?";
    	}
    	
    	if (level.toUpperCase() == "GSO"){
    		domainRepo = "gsoreports&";
    	}else if(level.toUpperCase() == "GSM"){
    		domainRepo = "gsmreports&";
    	}else if(level.toUpperCase() == "PPL"){
    		domainRepo = "pplreports&";
    	}else{
    		domainRepo = "gsoreports&";
    	}
    	
    	fullURL = url + domainRepo + parameter;
    	nc.out(fullURL);
    	
    	nc.alert2({
    		msg		:'<div id="loading"></div>',
    		title	: title||'Title',
    		type	: 'iframe',
    		href 	:  fullURL,
    		overlay: true,
    		success: function(){
    			
    		}	
    	});	
    },
    
    pageiframe: function(options){
		  
		var defaults = {
			msg		: '',
			destroy : '',
			url		: ''
		};
		
		var opts = jQuery.extend({}, defaults, options);
		
			jQuery('iframe#content').attr('src', opts.url).show();
			/*jQuery(window).resize(function() {
				jQuery(document).on('resize', function(){
			});*/
	},
// ========================================================    
// *** IGNORE THE BELOW*** - it's just there so we can always suffix our final REAL default above with a comma
ignoremeplease: 'thankyouverymuch'	


// ================= End of nc.common
}; 	
	
	nc.people = {
			id			: '1',
			userId		: '1',
			email		: 'nc@nc.com.my',
			accountId	: '1',
			role		: 'admin',
			language	: 'bm',
			name		: 'nc',
			office		: 'nc',
			username	: 'nc',
			created		: 'today'
	};
	
	String.prototype.toCamelCase = function(){
	    return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
	};
	
	jQuery.expr[':'].containsIgnoreCase = function(a,i,m){
		return (a.textContent||a.innerText||jQuery(a).text()||'').toLowerCase().indexOf((m[3]||'').toLowerCase())>=0;
	};	
	
	jQuery.expr[':'].regex = function(elem, index, match) {
	    var matchParams = match[3].split(','),
	        validLabels = /^(data|css):/,
	        attr = {
	            method: matchParams[0].match(validLabels) ? 
	                        matchParams[0].split(':')[0] : 'attr',
	            property: matchParams.shift().replace(validLabels,'')
	        },
	        regexFlags = 'ig',
	        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
	    return regex.test(jQuery(elem)[attr.method](attr.property));
	};
	
	jQuery.fn.valign = function() {
		return this.each(function(i){
		var ah = jQuery(this).height();
		var ph = jQuery(this).parent().height();
		var mh = Math.ceil((ph-ah) / 2);
		jQuery(this).css('margin-top', mh);
		});
	};
	
	jQuery.fn.halign = function() {
		return this.each(function(i){
		var ah = jQuery(this).width();
		var ph = jQuery(this).parent().width();
		var mh = Math.ceil((ph-ah) / 2);
		jQuery(this).css('right', mh);
		});
	};
	
	jQuery.fn.highlightError = function() {
		return this.each(function(i){
			jQuery(this)
				.css({'background-color':'#FFFFCC', 'border':'1px solid #fc0000' })
				.focus();
		});
	};
	
	jQuery.fn.removeHighlightError = function() {
		return this.each(function(i){
			jQuery(this).css({'background-color':'#FFF', 'border':'none' });
		});
	};
	
	jQuery.fn.egrep = function(pat) {  
		 var out = [];  
		 var textNodes = function(n) {  
		  if (n.nodeType == Node.TEXT_NODE) {  
		   var t = typeof pat == 'string' ?  
		    n.nodeValue.indexOf(pat) != -1 :  
		    pat.test(n.nodeValue);  
		   if (t) {  
		    out.push(n.parentNode);  
		   }  
		  }  
		  else {  
		   jQuery.each(n.childNodes, function(a, b) {  
		    textNodes(b);  
		   });  
		  }  
		 };  
		 this.each(function() {  
		  textNodes(this);  
		 });  
		 return out;  
		};  
		
		jQuery.fn.digits = function(){ 
		    return this.each(function(){ 
		        jQuery(this).text( jQuery(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
		    })
		}
		
		jQuery.fn.sysdateMax = function(){ 
		    return this.each(function(){
		    	var inp = jQuery(this).val();
		    	
		    	var convertInpDate = 
		    		(inp.constructor === Date ? inp :
			    	inp.constructor === Array ? new Date(inp[0],inp[1],inp[2]) :
			    	inp.constructor === Number ? new Date(inp) :
			    	inp.constructor === String ? new Date(inp) :
			        typeof inp === "object" ? new Date(inp.year,inp.month,inp.date) :  NaN)
		        		
			    var currentDate = new Date();
		    	var day = currentDate.getDate();
		    	var month = currentDate.getMonth() + 1;
		    	var year = currentDate.getFullYear();
		    	var sysdate = day + "/" + month + "/" + year;
		    	
		    	var sysdateConv = new Date(sysdate);
		    	
		    	if(convertInpDate > sysdateConv){
		    		jQuery(this).val( sysdate ); 
		    	}else{
		    		jQuery(this).val( jQuery(this).val() ); 
		    	}
		    })
		};

		jQuery.fn.ageFilter = function(){ 
		    return this.each(function(){
		    	var inp = jQuery(this).val();
		    	
		    	if(inp == ""){
		    		
		    	}else{
			    	var convertInpDate = 
			    		(inp.constructor === Date ? d :
				    	inp.constructor === Array ? new Date(d[0],d[1],d[2]) :
				    	inp.constructor === Number ? new Date(d) :
				    	inp.constructor === String ? new Date(d) :
				        typeof inp === "object" ? new Date(inp.year,inp.month,inp.date) :  NaN)
				    
				    var currentDate = new Date();
			    	var day = currentDate.getDate();
			    	var month = currentDate.getMonth() + 1;
			    	var year = currentDate.getFullYear();
			    	var sysdate = day + "/" + month + "/" + year;
			    	var sysdateConv = new Date(sysdate);
			    	
			    	var yearInp = convertInpDate.getFullYear();
			    	var ageInYear = year - yearInp;
			    	var yearRet = null;
			    	if(ageInYear > 200){
			    		yearRet = year - 200;
			    	}else{
			    		yearRet = yearInp;
			    	}
			    	
			    	var monthInp = convertInpDate.getMonth();
			    	var ageInMonth = month - monthInp;
			    	var monthRet = null;
			    	if(ageInMonth > 12){
			    		monthRet = 12;
			    	}else{
			    		monthRet = monthInp;
			    	}
			    	
			    	var dayInp = convertInpDate.getDate();
			    	var ageInDay = day - dayInp;
			    	var dayRet = null;
			    	if(ageInDay > 31){
			    		dayRet = 31;
			    	}else{
			    		dayRet = dayInp;
			    	}
			    	
			    	var convertInpDate = dayRet + "/" + monthRet + "/" + yearRet;
			    	
			    	if(convertInpDate > sysdateConv){
			    		jQuery(this).val( sysdate ); 
			    	}else{
			    		jQuery(this).val( convertInpDate ); 
			    	}
		    	}
		    })
		};

		jQuery.fn.timeFilter = function(){ 
		    return this.each(function(){
		    	var delimiter = ':';
		    	var index = 0;
		    	var temp = jQuery(this).val();
		    	var index = temp.indexOf(delimiter);
		    	var hour, min = 0;
		    	if(index > 0){
			    	hour = temp.substring(0, index);
			    	min = temp.substring(index + 1, temp.length);
		    	}else{
		    		var validTime = temp.substring(0,3);
		    		hour = validTime.substring(0,1);
		    		min = validTime.substring(2,3);
		    	}
		    	
		    	if(parseInt(hour) > 12){
		    		hour = 12;
		    	}
		    	
		    	if(parseInt(min) > 59){
		    		min = 59;
		    	}
		    	
		    	var t = hour + delimiter + min; 
		    	jQuery(this).val( t ); 
		    })
		};

		jQuery.fn.exists = function(){return this.length>0;}
	
		jQuery.fn.rotate = function(degrees) {
		    jQuery(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
		                 '-moz-transform' : 'rotate('+ degrees +'deg)',
		                 '-ms-transform' : 'rotate('+ degrees +'deg)',
		                 'transform' : 'rotate('+ degrees +'deg)'});
		};
