/*
 *  Common Project Function (for nc)
 *  @requires jQuery v1.4.2 or later
 *  (c) 2010, 2011 ncsoft Software Development team 
 *
 *  Original author, Hudzaifah Hafiz [ hudzaifah@gmail.com ]
 *
 *  nc.project.igims.js is a Free License, some code is under MIT license:
 *  (http://www.opensource.org/licenses/mit-license.php)
 *
 *  nc.project.igim.js is an extension to project igims individually
 *--------------------------------------------------------------------------*/

// This file is needed every project, so name this file accordingly
// nc.project.name.js

// Declare chili recipe folder
ChiliBook.recipeFolder = "../js/plugins/chili/";

// Initialize project JavaScript setting
nc.project = {
	
		// object named after this file name nc.project.ejkm.js
		ejkm : function(options, container, callback){
	
			var newVersion = true;
			var fullScreenStatus = false;
			var pathDomain = nc.domain + nc.domainOut;

			if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 8) {
				alert('Please use IE 8 and above. We don\'t support IE 7 and below.');
			}
				 	
			try{
			
			fadeInContent();
			
			}
			
			
			}catch(e){
				nc.err('EJKM: ' + e.name + ' | ' + e.message );
			}
			
			
			/**
		     * Custom function used for project
		     * @param
		     */
			
			
			// ===================================================================================================
			// MAIN FUNCTION
			// ===================================================================================================
			//added by Ashok Kumar Chava with a function to strip crossSite script in URLs
			function stripHTML()
			{
				var orgURL=location.href;
				var tempURL=orgURL;
				orgURL.replace(/[\"\'][\s]*javascript:(.*)[\"\']/g, "\"\"");
			    orgURL = orgURL.replace(/%22%3E%3Cscript(.*)/g, "");
				orgURL = orgURL.replace(/script(.*)/g, "");
				orgURL = orgURL.replace(/eval\((.*)\)/g, "");
				if(tempURL.length!= orgURL.length)
			      location.href=orgURL;

			}
			
			
			function crossSiteStrip()
			{
				jQuery('input[type=text]').each(function(){
					jQuery(this).bind('keyup', function(){
						var inp = jQuery(this).val();
						var tempInp = inp;
						inp.replace(/[\"\'][\s]*javascript:(.*)[\"\']/g, "\"\"");
						inp = inp.replace(/%22%3E%3Cscript(.*)/g, "");
						inp = inp.replace(/script(.*)/g, "");
						inp = inp.replace(/eval\((.*)\)/g, "");
						if(tempInp.length!= inp.length){
							jQuery(this).val(inp);
						}
					});
				});
			}
			
			function systemListener(){
				textToSpeech();
				//textToSpeechAjax();
			}
			
			function mainContent(){
				try{
					if(nc.people.role.match(/student/gi)){
						//jQuery('td#news_td').hide();
						//jQuery('.task_title').html('Forms');
					}
					jQuery('#stream_home').show();
				}catch(e){
					
				}
			}
			
			function liferayIntegration(){
				// if liferay exist then integrate with current authorization
				try{
					
				}catch(e){
					
				}
			}
			
			function setDomain(){
				jQuery('#roleSGS, #roleGSM, #rolePPL, #roleIOU, #roleIGIMS').click(function(e){
					e.preventDefault();
					var role = jQuery(this).attr('role');
					var command = jQuery(this).attr('command');
					var message =  '<select id="applicationEntity"></select> <br />' +
					 'Are you sure to change the domain for IGIMS to <b>' + role + '</b>*? ' +
					 '<br />If you proceed, all your <b>unsaved</b> work will be lost. ' +
					 '<br /><span style="font-size:12px;font-family:corbel;">*change domain means, all your work related to ' + role + ' will be switched.  ' +
					 '<br />You are no longer need to login different igims.</span>  ' +
					 '<br /><br /> Click <b>OK</b> to proceed or <b>CANCEL</b> to cancel action.';
					var title = 'Change Domain and Entity IGIMS ('+ role + ')';
					
					if(command == 'entity'){
						message = 
							'Please Select Entity:' + 
							'<select id="applicationEntity"></select> ' +
								  ' <br />' + 
						 '<br /><span style="font-size:12px;font-family:corbel;">*change domain means, all your work related to ' + role + ' will be switched.  ' +
						 '<br />You are no longer need to login different igims.</span>  ' +
						 '<br /><br /> Click <b>OK</b> to proceed or <b>CANCEL</b> to cancel action.';
						title = ' Change Entity IGIMS ('+ role + ') ';
					}
					
					nc.confirm({
						width:'500px',
						title: title,
						msg: message,
							
						accept: function(){
							jQuery.ajax({
				    			type: "POST",
				    			url: nc.hostname + "/action/security/role/change",
				    			data : "d=" + role + "&e=" + jQuery('#applicationEntity').val(),
				    			success: function(msg){
									location.href = location.href;
								}
							});
						},
						success: function(){
							nc.lookup({
								id		: 22,
								cache: false,
								parameter: role,
								container	: '#applicationEntity',
								success		: function(){
									
								}
							});
						}
						
					});
				});
			}
			
			function changeSemesterBasedOnEntity(){
				try{
					
				}catch(e){
					
				}
			}
			
			// ===================================================================================================
			// THE REST OF FUNCTION
			// ===================================================================================================
			
			function preventLogout(){
				jQuery(window).bind('beforeunload',function(){
					//return true;
					//alert('please log out');
					// logout properlu
					
				});	 
			}
			
			function mainPage(){
				var html = '<div id="menu_list"></div>';
				jQuery('#f_logo').live('click', function(){
					nc.alert2({
						msg	: html,
						title:'Menu',
						overlay: true,
						success: function(){
							var url = '/eJKM/utility/menuNavigator3.jsp?staffid='+nc.people.id;
							//var valueMenu = jQuery.cookie('menuEJKM');

							//if(valueMenu != null){
							//	settingMenuEJKM(valueMenu);
							//}else{
								jQuery.ajax({
						    		  type		: 'POST',
						    		  cache		: true,
						    		  url		: url,
						    		  success	: function(data) {
										//jQuery.cookie('menuEJKM', jQuery.trim(data));
										//nc.base._cache_menu[url] = data;
										//settingMenuEJKM(jQuery.trim(data));
										//changeURLUIController();
						    			jQuery('#menu_list').html(data);
						    			jQuery('#menu_list li ul').hide();
						    			jQuery('#menu_list li').on('click', function(){
						    				jQuery('ul', jQuery(this)).toggle();
						    				jQuery(this).css({'height':'100%'});	    			   
						    			});
									}// end success
					    		});
							
							
						}	
					});
					//nc.go('/eJKM/security/uicontroller3.jsp?m_cmd=6&cmd=0');
				});
				
			}
			
			function formChangeListener(){
				jQuery('form.formGen').watch('type', function(){
					nc.out('change');
					if(jQuery(this).attr('type') == 'view'){
						jQuery(this).find('select').each(function(){
							var selectedOption = jQuery(this).find('option:selected');
							nc.out(selectedOption)
							jQuery(this).insertBefore(selectedOption);
							jQuery(this).hide();
						});
					}
				});
			}
			
			function requiredField(){
				jQuery('input.required').each(function(){
					jQuery(this).prev('label').addClass('required');
				});
			}
			
			function pageInfo(){
				if( jQuery.trim(jQuery('#page_info').attr('data')) != '' ){
					jQuery('#page_info').hide();
					/*jQuery('#rightCol')
						.live({
							 mouseenter: function(){
									jQuery(this)
										//.show(nc.delayAnimation)
										.stop().animate({ 'height':'100%'}, nc.delayAnimation)
										.delay(nc.delayAnimation, function(){jQuery('#tag_rightCol')
											.hide(nc.delayAnimation);});
										//.css({'cursor':'pointer'});
									
									return false;
					           },
					         mouseleave: function(){
					        	    jQuery(this)
					        	    	//.hide(nc.delayAnimation);
					        	    	.stop().animate({ 'height':'26px' }, nc.delayAnimation)
					        	    	.delay(nc.delayAnimation, function(){jQuery('#tag_rightCol')
					        	    		.show(nc.delayAnimation);});
					        	    	//.css({'cursor':'default'});
					        	    return false;
					           }
						})
						.show().html( 
							(jQuery('#page_info').html() != "")?jQuery('#page_info').html():jQuery('#page_info').attr('data')
							
					);*/
				}
			}
			
			function highlightRow(){
		 		jQuery('table.tablesorter').find('tbody tr').each(function(){
					// HOVER ON TR
					jQuery(this).unbind().hover(function(){
						jQuery(this).children().each(function(){
							jQuery(this).addClass('highlighted');
						});
					}, function(){
						jQuery(this).children().each(function(){
							jQuery(this).removeClass('highlighted');
						});
					});
				});
		 		
		 	}
			
			function changeNewVersion(){
				var button = '<a id="cancel_change" href="javascript: ;">Cancel</a><input id="accept_change" type="button" class="accept" value="Change!">'
					, br = '<br />'
					, image = '<img  width="800" src="../images/v2/screenshot_ejkm_v2.PNG" />'
					, msg = 'eJKM, A new theme. <b>Cleaner, more modern look, Improved performance, New features</b>'
					, html = msg + br + image + br + button;
				nc.alert2({
					msg	: html,
					title:'Change to a new Look.',
					overlay: true,
					success: function(){
						var url = location.href;
						
						jQuery('cancel_change').on('click', function(){
							jQuery.fancybox.close();
						});
						jQuery('accept_change').on('click', function(){
							url = convertURLUIController(url);
							location.href = url;
						});
						
						
					}	
				});	
			}
			
			
			function fixFlushContent(){
				var flushContent = jQuery('#flushContent');
				
				// delete all br
				flushContent
					.find('br')
					.remove();
				
				// set breadcrumb
				flushContent
					.find('table:first') // styleNavigator
					.nextAll('table')	// is the real table
					.attr('align', 'left')
					.attr('width', '99%')
					//.prev('br').remove();
				
				// table set align left width 99%
				flushContent
					.find('.form_contents') // styleNavigator
					.parents('table')	// is the real table
					.attr('align', 'left')
					.attr('width', '99%')
					//.prev('br').remove();
				
				//finds title
				var title_inner_html = flushContent
					.find('fieldset')
					.find('hr:first')
					.prev('strong')
					.html();
				
				flushContent
					.prepend('<div id="page_title"></div>')
					.find('#page_title')
					.html(title_inner_html);
				
				// find sub title
				flushContent
				.find('fieldset')
				.find('hr').eq(1)
				.prev('strong')
				.addClass('page_sub_title_old')
				.end().remove();
				
				// hr and strong remove
				flushContent
					.find('fieldset')
					.find('hr:first')
					.prev().remove().end()
					.remove();
				
				flushContent
				.find('hr:first')
				.remove();
				
				
					
				/*flushContent
				.find('fieldset')
				.find('hr').eq(1)
				.remove();*/
					
				
				// hr 
				//flushContent
					//.find('fieldset')
					//.find('hr:first')
					//.prev().css({'font-family':'corbel', 'font-size' : '15px', 'font-weight' : 'normal', 'padding-left':'0px'});
					//.prev().prev('br').remove()
					//.end().prev('br').remove();
				
				// table
				flushContent
					.find('#myTable')
					.attr('bordercolor', '')
					.attr('border', '0')
					.find('tbody tr').attr('bgcolor', '')
					.css({'border-left':'1px solid #ccc', 'border-right':'1px solid #ccc', 'border-bottom':'1px solid #ccc', 'background-color': '#FDFDFD', 'height':'40px'});
				
				//find all table that has attribute align=center
				// make it left, align=left
				flushContent
					.find('table[align=center]')
					.attr('align', 'left');
				
				flushContent
					.find('tr.form_header')
					.parents('table')
					.attr('bordercolor', '#CECECE');
				
				
				// images
				flushContent
					//.find('#pager')
					.find('img').each(function(){
						jQuery(this).removeAttr('height').removeAttr('width');
						var src = jQuery(this).attr('src');
						if(src.match(/left2/gi)){
							jQuery(this).attr('src', '../images/icons/first1.png');
							jQuery(this).css({'cursor':'pointer'});
						}
						if(src.match(/left1/gi)){
							jQuery(this).attr('src', '../images/icons/prev1.png');
							jQuery(this).css({'cursor':'pointer'});
						}
						if(src.match(/right1/gi)){
							jQuery(this).attr('src', '../images/icons/next1.png');
							jQuery(this).css({'cursor':'pointer'});
						}
						if(src.match(/right2/gi)){
							jQuery(this).attr('src', '../images/icons/last1.png');
							jQuery(this).css({'cursor':'pointer'});
						}
						if(src.match(/carian/gi)){
							jQuery(this).attr('src', '../images/icons/carian.png');
						}
						if(src.match(/cetak/gi)){
							jQuery(this).attr('src', '../images/icons/cetak_grey.png');
						}
						if(src.match(/tambah/gi)){
							jQuery(this).attr('src', '../images/icons/tambah_grey.png');
						}
						if(src.match(/delete/gi)){
							jQuery(this).attr('src', '../images/icons/cross.png');
						}
						if(src.match(/print/gi)){
							jQuery(this).attr('src', '../images/icons/printer.png');
						}
						if(src.match(/history/gi)){
							jQuery(this).attr('src', '../images/icons/report.png');
						}
						if(src.match(/laporan.png/gi)){
							jQuery(this).attr('src', '../images/icons/report.png');
						}
						if(src.match(/tickred2/gi)){
							jQuery(this).attr('src', '../images/icons/accept.png');
						}
						if(src.match(/kemaskini/gi)){
							jQuery(this).attr('src', '../images/icons/update.png');
						}
						if(src.match(/kembali/gi)){
							jQuery(this).attr('src', '../images/icons/back.png');
						}
						if(src.match(/simpan/gi)){
							jQuery(this).attr('src', '../images/icons/save.png');
						}
						if(src.match(/teruskan/gi)){
							jQuery(this).attr('src', '../images/icons/teruskan.png');
						}
						
					});
				
				// pager
				flushContent
					.find('#pager .pagedisplay')
					.attr('readonly', true);
					
					
				// delete td's height
				//flushContent
					//.find('td[height!=-1][height!=524288][height!=2147483647]')
					//.attr('height', '0');
				
				jQuery('.printScreen').on('click', function(){
					changeNewVersion();
				});
				
				/*
				 * Fix input that missing attribute type=text
				 *
				 * because of security concern, modern browser prevent action to change attribute type in any element
				 * workaround is to add class that has the css with input[type=text].
				 * 
				 * but to which extent, there is no significant attr that can be assumed as input[type=text] other that existent of maxlength
				 * and to check whether an input has attribute maxlength is not simple task, because every browser behave differently
				 * and here's is the solution -- http://herr-schuessler.de/blog/selecting-input-fields-with-maxlength-via-jquery/
				 * 
				 */
				jQuery('input[class=hasDatepicker], input[alt=blank],input[maxlength!=-1][maxlength!=524288][maxlength!=2147483647]')
					.not('input[type=hidden], input[type=image], input[type=button]').each(function(){
					    jQuery(this).addClass('inputText');
					});
			}
			
			
			function replaceImageButton(){
				jQuery('#flushContent')
					.find('input[type=image]')
					.each(function(){
						var src = jQuery(this).attr('src');
						if(src.match(/carian/gi)){
							jQuery(this).attr('src', '../images/icons/carian.png');
						}
						if(src.match(/cetak/gi)){
							jQuery(this).attr('src', '../images/icons/cetak_grey.png');
						}
						if(src.match(/tambah/gi)){
							jQuery(this).attr('src', '../images/icons/tambah_grey.png');
						}
						if(src.match(/delete/gi)){
							jQuery(this).attr('src', '../images/icons/cross.png');
						}
						if(src.match(/print/gi)){
							jQuery(this).attr('src', '../images/icons/printer.png');
						}
						if(src.match(/history/gi)){
							jQuery(this).attr('src', '../images/icons/report.png');
						}
						if(src.match(/laporan/gi)){
							jQuery(this).attr('src', '../images/icons/report.png');
						}
						if(src.match(/kemaskini/gi)){
							jQuery(this).attr('src', '../images/icons/update.png');
						}
						if(src.match(/kembali/gi)){
							jQuery(this).attr('src', '../images/icons/back.png');
						}
						if(src.match(/simpan/gi)){
							jQuery(this).attr('src', '../images/icons/save.png');
						}
						if(src.match(/teruskan/gi)){
							jQuery(this).attr('src', '../images/icons/teruskan.png');
						}
					});
			}
			
			function sortHeaderBil(){
				jQuery(document).bind("sortStart",function() { 
			        
			    }).bind("sortEnd",function() { 
			         jQuery('tr', '.tablesorter').each(function(){
			              jQuery(this).children('td:first-child').html( jQuery(this).index() + 1 )
			              })
			    }); 
			}
			
			function removeHeaderBil(){
				jQuery('th:first', '.tablesorter thead').remove();
				jQuery('td:first', '.tablesorter tbody tr').each(function(){
					jQuery(this).remove();
				});
			}
			
			function sortDropAscending(){
				jQuery('select').each(function(){
					jQuery(this).html(jQuery('option', this).sort(function(x, y) {
				         return jQuery(x).text() < jQuery(y).text() ? -1 : 1;
				   }));
					jQuery(this).get(0).selectedIndex = 0;
					
				});
				
			}

			function tabPeranan(){
				jQuery.ajax({
		    		  type: 'POST',
		    		  cache	: true,
		    		  url: '/eJKM/utility/getPerananTab.jsp?staffid='+nc.people.id,
		    		  success: function(data) {
							jQuery('#tabMainPage').html(data);
							jQuery('#tabMainPage ul')
								.idTabs().end()
								.find('a').each(function(){
								jQuery(this).wrap('<span/>');
							}) 
						}
				});
			}
			
			function tipPeranan(){
				jQuery('a.tipp').cluetip({
					   cluetipClass: 'jtip',
					   arrows: true,
					   dropShadow: true,
					   hoverIntent: false,
					   sticky: true,
					   mouseOutClose: false,
					   closePosition: 'title',
					   closeText: 'Tutup'
					});
			}
			
			function breadcrumbEJKM(){
				var originalBreadcrumbHolder = null;
				originalBreadcrumbHolder = jQuery('.styleNavigator').exists() ? jQuery('.styleNavigator') : ( (jQuery('#breadcrumbText').exists())?jQuery('#breadcrumbText'):jQuery('a[href=\\*]') ) ;
				//if(originalBreadcrumbHolder == null) originalBreadcrumbHolder = jQuery('a[href=\\*]');
				
				
				// take breadcrumb from original
				var linkBreadcrumb = null;
				
				// some page put styleNavigator on table, some on td
				// dunno whatelse.
				if(originalBreadcrumbHolder.is('table')){
					linkBreadcrumb = jQuery('.styleNavigator tbody td').html();
				}else if(originalBreadcrumbHolder.is('td')){
					linkBreadcrumb = originalBreadcrumbHolder.html();
				}else if(originalBreadcrumbHolder.is('a')){
					linkBreadcrumb = originalBreadcrumbHolder.children(':nth-child(1)').html();
				}else if(originalBreadcrumbHolder.is('div')){
					// new one
					linkBreadcrumb = originalBreadcrumbHolder.html();
				}
				
				originalBreadcrumbHolder.hide();
				jQuery('#breadcrumb-text').html(linkBreadcrumb);//.show();
				
								
				breadcrumb();
			}
			
			function breadcrumb(){
				var breadCrumb = jQuery('#breadcrumb-text').html();
				breadCrumb = jQuery.trim(breadCrumb);
				 
				var splitter =  '&gt;&gt;';//( jQuery.browser.chrome ) ? '>>' : '&gt;&gt;';
				var breadCrumbs = breadCrumb.split(splitter);
				var newBreadCrumbs = '';
				var urlBreadCrumbList = "";	
				
				var olBO = '<ol id="breadcrumb">',
					olBC = '</ol>',
					liBO = '<li id="bc-url">',
					liBC = '</li>',
					divBO = '<div id="breadcrumb-sub-main">',
					divBC = '</div>',
					loading = '<span id="loading_smp_ajax" style="padding-left:10px;display:inline-table;"><img src="'+nc.hostName+'/images/common/indicator.gif" align="absmiddle" width="12px" height="12px" /></span>';
					
				for(var i=0; i < breadCrumbs.length ; i++){
					jQuery.trim( breadCrumbs[i] );
					if(i == 0){
						if((breadCrumbs.length) == 1){
							if(jQuery(breadCrumbs[i]).find('a').size()){
								breadCrumbs[i] = jQuery(breadCrumbs[i]).find('a').addClass('first').parent().html().toString(); 
								newBreadCrumbs = newBreadCrumbs + liBO + breadCrumbs[i] + liBC + loading;
							}else{
								newBreadCrumbs = newBreadCrumbs + liBO +'<a href="'+urlBreadCrumbList+'" class="first">'+breadCrumbs[i]+'</a>' + liBC + loading;
							}
						}else{
							if(jQuery(breadCrumbs[i]).find('a').size()){
								breadCrumbs[i] = jQuery(breadCrumbs[i]).find('a').unwrap().addClass('first').parent().html().toString();
								newBreadCrumbs = newBreadCrumbs + liBO + breadCrumbs[i] + liBC;
							}else{
								newBreadCrumbs = newBreadCrumbs + liBO +'<a href="'+urlBreadCrumbList+'" class="first">'+breadCrumbs[i]+'</a>' + liBC ;
							}
						}
					}else if(i == breadCrumbs.length-1){
						// last position
						if(jQuery(breadCrumbs[i]).find('a').size()){
							breadCrumbs[i] = jQuery(breadCrumbs[i]).find('a').unwrap().addClass('last').parent().html().toString();
							newBreadCrumbs = newBreadCrumbs + liBO + breadCrumbs[i] + liBC + loading;
						}else{
							newBreadCrumbs = newBreadCrumbs + liBO +'<a href="'+urlBreadCrumbList+'" class="last">'+breadCrumbs[i]+'</a>' + liBC + loading ;
							
						}
					}else{
						if(jQuery(breadCrumbs[i]).find('a').size()){
							breadCrumbs[i] = jQuery(breadCrumbs[i]).find('a').unwrap().addClass('middle').parent().html().toString();
							newBreadCrumbs = newBreadCrumbs + liBO + breadCrumbs[i] + liBC + loading;
						}else{
							newBreadCrumbs = newBreadCrumbs + liBO +'<a href="'+urlBreadCrumbList+'" class="middle">'+breadCrumbs[i]+'</a>' + liBC;
							
						}
					}
				}
				
				newBreadCrumbs = divBO + olBO  +newBreadCrumbs + olBC + divBC ;
				
				jQuery('#breadcrumb-text')
					.html( newBreadCrumbs )
					//.show()
					.fadeIn('slow')
					.animate({opacity: 1,'margin-left':'+=5'}, 150)
					;
			}
			
			
			function menuEJKM(){
				var url = '/eJKM/utility/menuNavigator3.jsp?staffid='+nc.people.id;
				//var valueMenu = nc.base._cache_menu[url];
				var valueMenu = jQuery.cookie('menuEJKM');
				//nc.out(valueMenu);
				//if(valueMenu != null){
				//	settingMenuEJKM(valueMenu);
				//}else{
					jQuery.ajax({
			    		  type		: 'POST',
			    		  cache		: true,
			    		  url		: url,
			    		  success	: function(data) {
							jQuery.cookie('menuEJKM', jQuery.trim(data));
							//nc.base._cache_menu[url] = data;
							settingMenuEJKM(jQuery.trim(data));
							changeURLUIController();
						}// end success
		    		});
				//}
			}
			
			function settingMenuEJKM(data){
				jQuery('#leftCol').append(data);
				jQuery('#tree')
					.slimScroll({ height: nc.height() - 130 +'px' });
					//.tinyscrollbar();
				jQuery('#tree')
					.treeview({
						collapsed: true,
						//animated: "fast",
						unique: false
						//control:"#sidetreecontrol",
						//prerendered: true,
						//persist: "location"
					//persist: "cookie",
					//cookieId: "treeview"
					//persist: "location"
				});
				
				jQuery("#tree")
				.find('a')
				.each(function(){
					
					var treeA = jQuery(this);
					if( treeA.attr('href') == 'javascript: ;' ){
						treeA.click(function(){
							treeA.prev().click();
						}).hover(function() {
							if (!jQuery(this).hasClass("selected")) {
								//jQuery(this).stop().animate({   'opacity':'0.5', color: '#000000' }, 218); //paddingLeft: '5px'
							}
							/*nc.alert2({
								msg	: treeA.html() + '',
								title:'MENU SERVIS',
								overlay: true,
								success: function(){
									
								}	
							});*/	
							// tip for menu
							treeA
							.tipTip({maxWidth: "auto", edgeOffset: 10, keepAlive: true, attribute: '<span id="">test</span>', defaultPosition: 'right', content: true})
							//.tipsy({  gravity: 'w', title: function() { return treeA.html().toUpperCase(); }, keepAlive: true, menu: true});
					        //jQuery(this).children('span').show().animate({ left: -5 }, fadeDuration);
					      }, function() {
					    	  if (!jQuery(this).hasClass("selected")) {
					    		 // jQuery(this).stop().animate({  'opacity':'1', color: '#888888'}, 218); //paddingLeft: '0px', 
					    	  }
					        //jQuery(this).children('span').animate({ left: -35 }, fadeDuration).fadeOut(fadeDuration);          
					      });
					}else{
						// animation upon hover
						treeA
						// tiptip
						//.tipTip({maxWidth: "auto", keepAlive: true, })
						// tipsy
						.tipsy({gravity: 'w',  	
							title: function() { return jQuery(treeA).attr('original-title').toUpperCase() } })
						.hover(function() {
							if (!jQuery(this).hasClass("selected")) {
								//jQuery(this).stop().animate({  'opacity':'0.5', color: '#000000' }, 500);//paddingLeft: '5px', 
							}
					        //jQuery(this).children('span').show().animate({ left: -5 }, fadeDuration);
					      }, function() {
					    	  if (!jQuery(this).hasClass("selected")) {
					    		 // jQuery(this).stop().animate({ 'opacity':'1', color: '#888888'}, 500);//paddingLeft: '0px',  
					    	  }
					        //jQuery(this).children('span').animate({ left: -35 }, fadeDuration).fadeOut(fadeDuration);          
					      })
					      /*.click(function(e){
					    	  e.preventDefault();
					    	  jQuery('iframe#content').css({'opacity':'0.5'});
					    	  nc.pageiframe({url:jQuery(this).attr('href')});
					    	  jQuery('iframe#content').css({'opacity':'1'});
					      })*/
					      ;
						
						
						//aValue.push(jQuery(a).attr('href')+'|'+jQuery(a).html()+'|'+jQuery(a).parent().parent().parent().find('a').html())
						//bValue.push(jQuery(a).html().toLowerCase());
						//aValue.push(jQuery(a).attr('href')+'|'+jQuery(a).html()+'|z')
					}
					if( treeA.hasClass('selected')){
						treeA.parent().addClass('selected');
					}
					
					// :TODO Hover
					/*jQuery(this).hover(
							function(){setTimeout(function(){jQuery(a).prev().click();},1000)},
							function(){}
							);*/
				});
				
				
				
				// search menu
				searchMenu();
			}
			
			function changeURLUIController(){
				if(newVersion){
					jQuery("#tree")
						.find('a')
						.each(function(){
							var treeA = jQuery(this);
							
							var hrefAFront, hrefABack = '';
							var hrefA = treeA.attr('href');
							var index = hrefA.indexOf('.');
							var uiController = hrefA.indexOf('uicontroller');
							if(uiController > 0){
								if(index > 0){
									hrefAFront = hrefA.substring(0, index);
									hrefABack = hrefA.substring(index + 1, hrefA.length);
								}
								hrefA = hrefAFront + '2.' + hrefABack;
							}
							treeA.attr('href', hrefA );
						});
					
					// change all links in table
					jQuery('#myTable')
						.find('a')
						.each(function(){
							var $this = jQuery(this);
							var hrefA = $this.attr('href');
							var hrefAFront, hrefABack = '';
							var index = hrefA.indexOf('.');
							var uiController = hrefA.indexOf('uicontroller');
							if(uiController > 0){
								if(index > 0){
									hrefAFront = hrefA.substring(0, index);
									hrefABack = hrefA.substring(index + 1, hrefA.length);
								}
								hrefA = hrefAFront + '2.' + hrefABack;
							}
							
							$this.attr('href', hrefA );
						});
				}
			}
			
			function convertURLUIController(url){
				var hrefA = url;
				var hrefAFront, hrefABack = '';
				var index = hrefA.indexOf('.');
				var uiController = hrefA.indexOf('uicontroller');
				if(uiController > 0){
					if(index > 0){
						hrefAFront = hrefA.substring(0, index);
						hrefABack = hrefA.substring(index + 1, hrefA.length);
					}
					hrefA = hrefAFront + '2.' + hrefABack;
				}
				return hrefA;
			}
			
			function cleanHTML(){
				var temp = null;
				var script, link = [];
				// cleaning the content
				jQuery("#flushContent").htmlClean();
				
				/*temp = jQuery("#flushContent").find('!DOCTYPE').contents();
				jQuery("#flushContent").find('!DOCTYPE').replaceWith(temp);*/
				
				temp = jQuery("#flushContent").find('html').contents();
				jQuery("#flushContent").find('html').replaceWith(temp);
				
				temp = jQuery("#flushContent").find('head').contents();
				jQuery(temp).find('script').each(function(){
					if(jQuery(this).has('src')){
						script.push(jQuery(this));
						jQuery(this).remove();
					}
				});
				jQuery(temp).find('link').each(function(){
					if(jQuery(this).has('href')){
						link.push(jQuery(this));
						jQuery(this).remove();
					}
				});
				//jQuery("#flushContent").find('<head>').replaceWith(temp);
				
				// move script&css inside to head top
				var srcScript, hrefLink = [];
				for(var a = 0; a < script.length; a++){
					//srcScript.push(jQuery(script[a]).attr('src'));
					$.ajax({
						  type		: "GET",
						  url		: jQuery(script[a]).attr('src'),
						  dataType	: "script"
						});
				}
				
				for(var a = 0; a < link.length; a++){
					//hrefLink.push(jQuery(link[a]).attr('href'));
					$("head").append("<link>");
					css = $("head").children(":last");
				    css.attr({
				      rel:  "stylesheet",
				      type: "text/css",
				      href: jQuery(link[a]).attr('href')
				    });
				}
				
			}
			
			function logoutEJKM(){
				humanMsg.displayMsg('Logging out...', false, true);
				//nc.humanMsg({msg:'Logging out...'});
				jQuery('#fancybox-overlay').delay(10).fadeOut('slow', function(){
					jQuery('#colored-bar, #breadcrumb-bar, #top-bar').css({'z-index':'1200'});
					jQuery('#breadcrumb-bar').html("");
					jQuery('.search, #version').remove();
					
					jQuery('#fancybox-overlay')
					.css({'opacity':'1','background-color':'#ffffff'})
					.fadeIn('278', function(){
						window.top.location.href = nc.hostname+'/security/basic/action/logout.jsp';
					});
				});
				
				setTimeout(function(){
					jQuery('#facebox').css({'z-index':'1200'});
					jQuery('#fancybox-overlay')
						.css({'opacity':'0.2'})
						.fadeIn('278');
					},278);	
			}
			
			function replaceCalendar(){
				//jQuery('img[src*=calendar]').parents('span')
				jQuery('[name*=tarikh]').not('.calendar')
					.each(function(){
						nc.calendar(jQuery(this), 'dd/mm/yy');
						//jQuery(this).ageFilter();
						//jQuery(this).prev().attr('readOnly');
						
						// to remove calendar icon
						jQuery(this).next().remove();//.find('a').remove();
						
					});
			}
			
			function automateCalendar(){
				//jQuery('img[src*=calendar]').parents('span')
				jQuery('input[type=text].calendar')
					.each(function(){
						nc.calendar(jQuery(this), 'dd/mm/yy');
						//jQuery(this).ageFilter();
						//jQuery(this).prev().attr('readOnly');
					});
			}
			
			function replaceTiming(){
				jQuery('[class*=TimeEntry]')
					.each(function(){
						nc.timePicker(jQuery(this));
					}); 
			}
			
			function textToSpeech(){
				jQuery('#take_tour').on('click', function(){
					/*nc.msg({
						msg:'Creating Speech...'
					});*/
					
					d = document;
				    f = d.createElement('form');
				    /*jQuery(f).bind('load', function(){
			        	nc.msg({destroy:'true'});
					 });*/
				    f.method = 'post';
				    f.target = 'textToSpeech_temp';
				    f.action = 'http://vozme.com/text2voice.php?bookmarklet=1&gn=ml&interface=full&default_language=en';
				    
				    t = d.createElement('input');
				    t.name = 'text';
				    t.type = 'hidden';
				    t.value = (window.getSelection ? window.getSelection() : d.getSelection ? d.getSelection() : d.selection.createRange().text);
				    if (t.value == '') {
				    	nc.alert({
				    		msg:'Please select a text.'
				    	});
				    } else {
				    	var iframe = document.createElement("iframe");
				    	jQuery(iframe).attr("id","textToSpeech_temp");
				    	jQuery(iframe).attr("name","textToSpeech_temp");
				    	jQuery(iframe).attr("width","0");
				    	jQuery(iframe).attr("height","0");
				    	jQuery(iframe).attr("border","0");
				    	jQuery(iframe).attr("style","width: 0; height: 0; border: none;");
						 d.body.appendChild(iframe);
						 //window.frames['textToSpeech_temp'].name="textToSpeech_temp"; //ie sucks
						 
						 iframe.appendChild(f);
						
						 var carregou = function() { 
							 
							   //removeEvent( $m('micox-temp'),"load", carregou);
							   var cross = "javascript: ";
							   //cross += "window.parent.$m('" + id_element + "').innerHTML = document.body.innerHTML; void(0); ";
							   cross += "void(0); ";
							   
							   //$m(id_element).innerHTML = html_error_http;
							   jQuery('#textToSpeech_temp').src = cross;
							   //del the iframe
							   setTimeout(function(){ jQuery('#textToSpeech_temp').remove(); }, 250); 
						 }
						 jQuery('#textToSpeech_temp').load(function(){
							 //carregou;
						 });
				        f.appendChild(t);
				        f.submit();
				        
				        
				        //setTimeout(function(){ jQuery('#textToSpeech_temp').remove(); }, 250); 
				    }
				    
					 
				});
				    
			}
			
			function textToSpeechAjax(){
				jQuery('#take_tour').on('click', function(){
					var input = (window.getSelection ? window.getSelection() : d.getSelection ? d.getSelection() : d.selection.createRange().text);
					 if (input == '') {
					    	nc.alert({
					    		msg:'Please select a text.'
					    	});
					    } else {
					    	nc.msg({
								msg:'Creating Speech...'
							});
					    	jQuery.ajax({
					    		  type: 'POST',
					    		  url: 'http://vozme.com/text2voice.php?bookmarklet=1&gn=ml&interface=full&default_language=en&text='+input,
					    		  success: function(data) {
					    			nc.msg({destroy:'true'});
					    		  }
					    		});
					    }
					
				});
			}
			
			function menuApplicant(){
				var menu = 
					'<ul> ' +
			    		'<li> ' +
			    			'<a href="javascript: ;" id="status" class="task_link selected"> ' +
			    			'	<span>My Applicant</span> ' +
			    			'	<span class="count_task" id="applicant_count">-</span> ' +
			    			'</a> ' +
			    		'</li> ' +
			    		'<li> ' +
			    			'<a href="javascript: ;" id="status" class="task_link selected"> ' +
			    			'	<span>Form for Applicant</span> ' +
			    			'	<span class="count_task" id="form_count">-</span> ' +
		    			'</a> ' +
		    		'</li> ' +
		    		'</ul>';
				jQuery('.task_menu').html(menu);
				
			}
			
			function halfFullScreenApplicant(){
						jQuery('#breadcrumb-bar').css({'top':'47px','position':'absolute'});
						jQuery('#top-shadow').css({'top':'70px','position':'absolute'});
						jQuery('#top-bar, #colored-bar').css({'top':'0px'});
						jQuery('#mainContainer').css({'position':'','top':''});
						jQuery('#contentCol').css({'padding-top':'30px'});
						jQuery('#leftCol').css({'padding-top':'2px'});
						jQuery('#leftCol').css({'margin-left':'-187px'});
						jQuery('#contentCol, #bottomContent, #footer').css({'margin-left':'-10px'});
						jQuery('#fullscreen2').css({'background-color':'#a90000'});
						//jQuery('#fullScreen').click();
						fullScreenStatus = true;
						
						jQuery('#fullScreen2').hide();
						
						jQuery('.task_title').html('Menu');
						jQuery('.task_menu').html('');
						jQuery('#smaller-detail').html('Portal');
						jQuery('#take_tour').hide();
						jQuery('.profile.settings').hide();
						
						
						
						/*jQuery('#breadcrumb-bar').css({'top': '47px','position':'absolute'});
						jQuery('#top-shadow').css({'top':'70px','position':'absolute'});
						jQuery('#top-bar, #colored-bar').css({'top':'0px'});
						jQuery('#mainContainer').css({'position':'','top':''});
						jQuery('#contentCol').css({'padding-top':'30px'});
						jQuery('#leftCol').css({'padding-top':'30px'});
						jQuery('#leftCol').css({'margin-left':'0px'});
						jQuery('#contentCol,#bottomContent,#footer').css({'margin-left':'181px'});
						jQuery('#fullscreen2').css({'background-color':'transparent'});*/
						
			}
			
			function windowResize(){
				jQuery(window).resize(function() {
					 jQuery.fancybox.resize();
					 //jQuery('#contentCol').css({'height': nc.height() });
					 //jQuery('#mynotes').css({'height':nc.popupHeight() - 200});
				});
			}
			
			function countTaskOnMenu(){
				// count all notification task on menu
				nc.count({
					id: 8,
					parameter:   nc.people.id,
					parameter1:  911,//nc.people.getCurrentSemesterId()
					
					success: function (){
						// highlight parent menu that have notification
						jQuery('.uiSideNavCountParent').each(function(){
							var parentCount = this;
							var countChildrenTask = 0;
							jQuery(parentCount).parent().parent().find('.uiSideNavCount').each(function(){
								if( parseInt(jQuery(this).html()) > 0){
									// sum all count
									var thisCount = jQuery(this).html();
									countChildrenTask = countChildrenTask + parseInt(thisCount);
								}else{
									jQuery(this).html("");
								}
							});
							jQuery(parentCount).html(countChildrenTask);
						});
						
					}
				});
				
			}
			
			function categoryBasedOnRoles(){
				var permittedRoles = ['supervisor', 'coordinator', 'officer'];
				
				var SGSOfficerLink = null;
				var CoordinatorLink = null;
				jQuery('#flushContent').find('a').each(function(){
					if( jQuery(this).html().match(/SGS Officer/g) ){
						SGSOfficerLink = jQuery(this);
					}
					if( jQuery(this).html().match(/Supervisory Committees/g) || jQuery(this).html().match(/Institute's Coordinator/g)){
						CoordinatorLink = jQuery(this);
					}
				});
				
				//nc.out(nc.people.role + CoordinatorLink + SGSOfficerLink)
				
				if( SGSOfficerLink != null){
				//checkUserRoles
				//[IO.ADMIN][IO.ADMIN][PPL.Admin][GSM.SystemAdministrator][RESEARCH AND THESIS UNIT ][GSM LECTURER][GSM.SystemAdministrator]
				//[GSM.Admin][GSM.SystemAdministrator][IO.ADMIN][PPL.Admin][RESEARCH AND THESIS UNIT ][GSM LECTURER][IO.ADMIN][PPL.Admin]
				//[RESEARCH AND THESIS UNIT ][Admin][GSM LECTURER][GSM.Admin][GSM.SystemAdministrator][GSM LECTURER][GSM.Admin][GSM.SystemAdministrator]
				//[IO.ADMIN][PPL.Admin]
				//[RESEARCH AND THESIS UNIT ][Admin][GSO.Admin][GSO.Dean][GSO.ExamOff][IGIMS.Admin][IO.ADMIN][PPL.Admin][RESEARCH AND THESIS UNIT ]
				var sgsofficer = false;
				var supervisor = false;
				var coordinator = false;
				var dean = false;
				
				if( nc.people.role.match(/"[^"]+"|[\lecturer]+"/g) ){
					supervisor = true;
					nc.out(' supervisor '+supervisor)
				}
				if( nc.people.role.match(/"[^"]+"|[\admin]+"/g) ){
					sgsofficer = true;
					nc.out('sgsofficer  '+sgsofficer)
				}
				if( nc.people.role.match(/"[^"]+"|[\coordinator]"/g) ){
					coordinator = true;
					nc.out('  coordinator'+coordinator)
				}
				if( nc.people.role.match(/"[^"]+"|[\dean]+"/g) ){
					dean = true;
					nc.out('dean'+dean)
				}
				
				
				if( sgsofficer ){
					
					if( coordinator){
						nc.out('sgsofficer and coordinator')
					}else if( supervisor){
						nc.out('sgsofficer and coordinator')
					}else{
						spotlight(SGSOfficerLink);
					}
				}else if( coordinator ){
					spotlight(CoordinatorLink)
				}else{
					
				}
				
				
				}
				
				function spotlight(elem){
					jQuery(elem).spotlight({
						opacity: .9,				//spotlight opacity
						speed: 218,					//animateion speed
						color: '#fff',				//spotlight colour
						animate: false,				//enable animation (if false 'speed' and 'easing' are irrelevant)
						onShow: function(){
							//setTimeout(function(){location.href = elem.attr('href');},2);
						}	//callback function after spotlight is shown
					});
				}
				
			}
			
			function checkErrorNotification(){
				if( jQuery.trim(jQuery('#err_notification').html()) != "" ){
					jQuery('#err_notification')
						.halign()
						//.show()
						.fadeIn(218)
						.delay(5000)
						.fadeOut(218);
						//.hide();
						
					setTimeout(function(){nc.humanMsg({msg:'Redirecting to previous page in 3 seconds.'})}, 718);
					setTimeout(function(){history.go(-1);}, 5618);
					
				}else{
					jQuery('#err_notification').hide();
				}
			}
			
			function chatOnline(){
				nc.list({
					id: 11,
					container:'#rightCol',
					success:function(){
						
					},
					classul: 'chat',
					classli: 'chat'
					
				});
			}
			
			function toggleLegend(){
				jQuery('legend').unbind('click').click(function(){
					jQuery(this)
					.parent().children().not(this).toggle();
				})
				.hover(function(){
					jQuery(this).css({'cursor':'pointer'});
				},function(){
					jQuery(this).css({'cursor':'default'});
				});
			}
			
			/*function highlightRow(){
				jQuery('table.sortablescroll').find('tbody tr').each(function(){
					// HOVER ON TR
					jQuery(this).unbind().hover(function(){
						jQuery(this).children().each(function(){
							jQuery(this).addClass('highlighted');
						})
					}, function(){
						jQuery(this).children().each(function(){
							jQuery(this).removeClass('highlighted');
						})
					});
					
				});
			}*/
			
			
			
			function fancySelect(){
				jQuery('select').styledSelect();
				jQuery(document).bind('nc.lookup nc.table', function(){
					jQuery('select').styledSelect();
				});
				//jQuery('select').tzSelect();
			}
			
			function notification(){
				nc.count({
					id: ( nc.people.role.match(/student/gi) ) ? 4 : 3,
					parameter: ( nc.people.role.match(/student/gi) ) ? nc.people.id : nc.people.id,
					parameter1: '770',
					success: function (){
						// show only when user has notification 
						if( parseInt(jQuery('#notification_count').html()) > 0){
							jQuery('#notification_count')
								.show()
								.stop()
								.animate({'margin-top':'-14px'},{queue:true, duration:200, easing: 'easeInQuad'})
								.delay(50)
								.animate({'margin-top':'-4px'},{queue:true, duration:400, easing: 'easeOutBounce'})
								;
						}
					}
				});
			}
			
			function deleteImageRounded(){
				var stringImage = "rounded_top_reverse rounded_top arrow defaultstudent indicator file15310 curve"
		    	var excludeImage = stringImage.split(" ");
		    	var imgObj = "";
		    	
		    	jQuery.each(excludeImage, function(i){
		    		imgObj += 'img[src*='+excludeImage[i]+']' + ( ( i + 1 == excludeImage.length ) ? '' : ',' );
		    	});
		    	
		    	jQuery(imgObj)
		    	.each(function(){
		    			jQuery(this).remove();
		    	});
				//jQuery('#contentCol').find('img[src^=rounded_top.gif]').remove();
			}
			
			function fadeInContent(){
				jQuery('#flushContent')
				//.delay(2)
				.fadeIn(218);
				
				jQuery('#contentCol')
				.css({'height': nc.height() });
				//.fadeIn('fast');//.fadeIn();
			}
			
			function AI_SelectCategory(){
				if(nc.currentPage == 'studentExtension'){
					
					//jQuery('.headin').find('a').
				}
			}
			
			function pong(){
				
			}
			
			function cometRealtime(){
				
			}
			
			function checkPasswordRetention(){
				
			
				// check if password is 3 month old
				nc.data({
					id: 8,
					parameter: nc.people.userId,
					success:function(status){
						if(!status){
							// popup change password form
							nc.alert2({
								msg:'',
								title: 'Change Password',
								width  : 400,
								height : 100,
								overlay: false,
								success: function(){
								
									var content = '<input type="text" id="CPR_old_pwd" >' +
											      '<input type="text" id="CPR_new_pwd" >' +
											      '<input type="text" id="CPR_new_again_pwd" >' ;
											      //'<input type="button" id="CPR_new_pwd" value="Tukar Katalaluan" >' +
									
									jQuery("#fancybox-wrap").css({'z-index':'9999'});
									jQuery("#fancybox-inner").html(content+'<br /><input type="button" value="Tukar" id="change_pwd_but" >');
									
									jQuery("#change_pwd_but", "#fancybox-inner").click(function(){
										
										nc.save({
											id: 12,
											parameter: nc.people.userId,
											parameter1: a.attr('id'),
											alertSuccess: false,
											type : 'update',
											success: function(){
												// buat
												jQuery('li[id='+a.attr('id')+']').hide(218, function(){
													//refreshNotesList(jQuery('select#notes_lookup option:selected').attr('id'));
												});
												
											}
										});
										
									});
								}	
							});
						}
					}
				});
			
			
			}
			
				
			
				
			
			
				
			
			
			function coverMenu(){
				//jQuery('#leftCol')
				//.css({{'background-color':'#ffffff'}});
				//.slimScroll({
				//      wheelStep: 20
				//  });
			}
			
			function announcement(){
				nc.list({
					id: 1,
					container:'#wrapper_news'
				});
			}
			
			function refreshNotesList(id){
				countNotes(id);
				nc.list({
					id: id,
					cache: false,
					parameter: nc.people.id,
					container:'#mynotes',
					success:function(){
						jQuery('#mynotes')
							.css({'height': nc.wheight() - 90 + 'px' })
							//.slimscroll({height: nc.height() + 'px'});
						jQuery('span.statusNotes').each(function(){
							if( jQuery(this).attr('status') == '1' ){
								jQuery(this).wrap('<s></s>');
								jQuery('.doneNotes[id='+jQuery(this).attr('id')+']').hide();
							}
							
						});
						
						jQuery("abbr.mynotes").timeago();
						
						jQuery('a.deleteNotes').die().live('click', function(){
							var a = jQuery(this);
							nc.save({
								id: 10,
								parameter: nc.people.id,
								alertSuccess: false,
								parameter1: a.attr('id'),
								type : 'update',
								success: function(){
									jQuery('li[id='+a.attr('id')+']').hide(218, function(){
										refreshNotesList(jQuery('select#notes_lookup option:selected').attr('id'));
									});
									
								}
							});
						});
						
						jQuery('a.doneNotes').die().live('click', function(){
							var a = jQuery(this);
							nc.save({
								id: 11,
								parameter: '1',
								alertSuccess: false,
								parameter1: nc.people.id,
								parameter2: a.attr('id'),
								type : 'update',
								success: function(){
									a.hide();
									jQuery('.statusNotes[id='+a.attr('id')+']').wrap('<s></s>');
								}
							});
						});
						
						
					},
					classul: 'mynotes',
					classli: 'mynotes'
					
				});
			}
			
			function saveNotesList(){
				nc.save({
					id: 9,
					//parameter: 'seq',
					parameter: nc.people.id,
					parameter1: jQuery('#notes_text').val(),
					type : 'update',
					success: function(){
						jQuery('#notes_text').val('')
						jQuery('div#mynotes').show(218, function(){
							refreshNotesList(jQuery('select#notes_lookup option:selected').attr('id'));
						});
					}
				});
			}
			
			function countNotes(idCount){
				nc.count({
					id: idCount,
					cache: false,
					parameter: nc.people.id,
					success: function (){
						jQuery('#count_notes').html('(<b>'+jQuery('#count_notes').html()+'</b>)');
					}
				});
			}
			
			function myNotes(){
				var idSQLAll = 1, idSQLWeek = 2, idSQLToday = 3; 
				var lookup = '<select id="notes_lookup"><option id="'+idSQLAll+'">All</option><option id="'+idSQLWeek+'">1 week</option><option id="'+idSQLToday+'">Today</option></select>';
				var header = '<div id="mynotesHeader">Notes <span id="count_notes"></span></div><div style="float:right;cursor:pointer;">'+lookup+'<b id="notes_collapse">-</b></div><br /><br />';
				var mynotes = '<div id="mynotes" style="display:none;"></div>';
				
				var input = '<div id="wrap_input_notes" style="display:none;line-height:12px;text-align: right;"><textarea id="notes_text" class="normalcase" value="" cols="28" rows="1"/></div>';
				var button = '<input type="button" id="notes_button" value="save"></div>';
				jQuery('#notesCol').html( input + header + mynotes )
				.show()
				.hover(	function(){
							jQuery('#wrap_input_notes').show();
						}
						,function(){
							jQuery('#wrap_input_notes').hide();
						}
					);
				jQuery('#mynotes').css({'height': nc.wheight()- 90});
				//.easydrag().setHandler('mynotesHeader');
				
				jQuery('#notes_collapse').click(function(){
					refreshNotesList(jQuery('select#notes_lookup option:selected').attr('id'));
					jQuery('div#mynotes')
						//.css({'height': nc.wheight()- 90 + 'px'})
						.slimScroll({height: nc.wheight()-90 + 'px', width : '189px'});
						jQuery('div#mynotes').show().parent().toggle();
						//jQuery('#notes_collapse').rotate(90)
					if(jQuery('#notes_collapse').text() == '-'){
						jQuery('#notes_collapse').text('+');   
				    } else {
				    	jQuery('#notes_collapse').text('-');
				    }
				});
				
				jQuery('#notes_text').keypress(function(event){
					if ( event.which == 13 ) {
					     event.preventDefault();
					     saveNotesList();
					   }
				});
				
				jQuery('#notes_lookup').change(function(){
					refreshNotesList(jQuery('select#notes_lookup option:selected').attr('id'));
				});
				refreshNotesList(jQuery('select#notes_lookup option:selected').attr('id'));
			}
			
			function AI_addPageTitle(){
				if( jQuery(document).find('.page_title, .headin').size() == 0 ){
					if(nc.currentPage != 'indexSetup'){
						
						var currentPageTitle = jQuery.cookie('NC_CURRENT_PAGE_TITLE');
						if( jQuery('table,div').find('img').filter( function(){ return jQuery(this).attr('src').match(/search(.student|.applicant)/gi) } ).size() > 0 ){
							 nc.out('table img');
							jQuery('table')
							.find('img')
							.filter( function(){ return jQuery(this).attr('src').match(/search(.student|.applicant)/gi) } )
							// img width 40
							.attr('width', '25')
							.attr('height', '25')
						    .parent().attr('width', '30')
						    //delete p and font
						    //.parents('center').remove()
							.closest('table')
							// hide first
							.hide()
							.addClass('page_title')
							.css({'padding':'7px 0 7px 10px'})
							.find('td:nth-child(2)')
							.append('  ('+currentPageTitle+')')
							// end to get table back
							.end()
							// show fadeIn
							//.fadeIn('medium')
							//.animate({'margin-top':'+=5'}, 150)
							;
							
						}else{
							
							var h2HTML = "";
							if( jQuery('div#contentCol').find('h2').size() > 0 ){
								//nc.out('h2 - '+jQuery('div#contentCol').find('h2').size());
								//nc.out('y ada');
								h2HTML = jQuery('h2').html();
								//nc.out(jQuery.trim(h2HTML) + jQuery.trim(currentPageTitle));
								if( (jQuery.trim(h2HTML) == jQuery.trim(currentPageTitle)) ){ h2HTML = "";}else{h2HTML =  ' - ' + h2HTML;}
								//nc.out(">>>>"+jQuery.trim(currentPageTitle)+"<<");
								if( (jQuery.trim(currentPageTitle) == "") ){ currentPageTitle = "";}
								jQuery('<h2 class="page_title">'+currentPageTitle+h2HTML+'</h2>')
								  .hide().prependTo('#contentCol')
								  ;
								  //.fadeIn('medium')
								  //.animate({'margin-top':'+=5'}, 150);
								jQuery( 'h2' ).not( '.page_title').remove();
								
							}else{
								nc.out('h2 - '+jQuery('div#contentCol').find('h2').size());
								jQuery('<h2 class="page_title">'+currentPageTitle+h2HTML+'</h2>')
								  .hide().prependTo('#contentCol')
								  ;
								  //.fadeIn('medium')
								  //.animate({'margin-top':'+=5'}, 150);
							}
							//jQuery('<h2 class="page_title">'+currentPageTitle+h2HTML+'</h2>')
							 // .hide().prependTo('#contentCol').fadeIn('medium');
							  
							//jQuery('#contentCol').prepend('<h2 class="page_title">'+currentPageTitle+'</h2>');
						}
					}
				}else{
					nc.out('headin');
					jQuery('table, div, table.headin')
					.find('img')
					.filter( function(){ return jQuery(this).attr('src').match(/search(.student|.applicant)/gi) } )
					// img width 40
					.attr('width', '25')
					.attr('height', '25')
				    .parent().attr('width', '30')
				    .end()
				    .end()
				    //delete p and font
				    .parents('center, b, strong').remove()
					.closest('table').addClass('page_title')
					.end()
					.hide()
					//.end()
					
					
					// show fadeIn
					
				}
				
				jQuery('.page_title')
				//.show()
				.fadeIn(218)
				//.css({opacity:1,'margin-top':'0px'})
				.parents('br').remove();
				//.animate({opacity:1}, 150);
				//.animate({opacity:1,'margin-top':'+=10'}, 150);
				
				
			}
			
			function AI_SelectPage(){
				// if change role, system check intelligently to change page to respective domain
				
			}
			
			function printScreen(){
				jQuery('#features .printScreen').click(function(){
					jQuery('#fullScreen2').click();
					jQuery('#contentCol').jqprint({ operaSupport: true });
					jQuery('#fullScreen2').click();
					
				});
			}
			
			
			
			
			
			function dropdownUser(){
				/*jQuery("#userName-top").hover(function() {
					jQuery(".dropdownCont").stop(true, true).animate({
						opacity: 'toggle',
						height: 'toggle'
					}, 200);
				}, function(){
					jQuery(".dropdownCont").stop(true, true).animate({
						opacity: 'toggle',
						height: 'toggle'
					}, 200);
				}); */
				
				jQuery('li.setr').on({
						mouseenter: function () {
							jQuery(this).find('a').css({'color':'#505050'});
						}, 
						mouseleave: function () {
							jQuery(this).find('a').css({'color':'#ffffff'});
						}
					});
				
				jQuery("#userName-top").click(function(e) {
					e.preventDefault();
					jQuery(".dropdownCont").toggle();
					//jQuery('a.aiButton').css({'background':'#5B72EE'});
				}); 
				
				jQuery(".dropdownCont").mouseup(function() {
					 return false;
				 });
				
				// if click on everything else
				 jQuery(document).mouseup(function() {
					 if(jQuery(".dropdownCont").length) {
						 jQuery(".dropdownCont").hide();
						 jQuery('a.aiButton').css({'background':'-moz-linear-gradient(center top , #E02B2B, #BD0202) repeat scroll 0 0 #BD0202','color':'#ffffff'});
					 }
					 
					 
				 }); 
				 jQuery(document).scroll(function() {
					 if(jQuery(".dropdownCont").length) {
						 jQuery(".dropdownCont").hide();
						 jQuery('a.aiButton').css({'background':'-moz-linear-gradient(center top , #E02B2B, #BD0202) repeat scroll 0 0 #BD0202','color':'#ffffff'});
					 }
					 
				 }); 
			}
			
			function showMessage(str){
				jQuery('#msgInfo')
					.html(str==null?'':str)
					.show();
			}
			
			function hideMessage(){
				jQuery('#msgInfo').hide();
			}
			
			
			function tourGuide(){
				
				jQuery('#take_tour').tipsy({gravity: 'n',
	    			title: 'This is the new Search' });
				
				jQuery('#take_tour').click(function(){
					yepnope( {
					      test  : true,
					      yep : '../../js/plugins/jquery.spotlight.js',
					      complete : function () {
						tourGuideSpotlight( 
								'span.info-block' ,
								'New Global Search',
								'This is the new search. It will search Globally. You can search by Matric. No, Name and I.C<br />',
								'176px',
								'34px',
								function(){
									
									tourGuideSpotlight( 
										'#search_menu' ,
										'New Menu Search',
										'This is the new search. It will search Globally. You can search by Matric. No, Name and I.C<br />',
										'176px',
										'50px',
										function(){
											tourGuideSpotlight( 
												'.stream_home' ,
												'Task Manager',
												'This is the new task manager',
												'396px',
												'75px',
												function(){
													tourGuideSpotlight( 
														'#stf_status' ,
														'Status',
														'Share your thought',
														'398px',
														'135px',
														function(){
															tourGuideSpotlight( 
																'div#features' ,
																'Feautures',
																'Neat features embed here',
																'176px',
																'29px',
																function(){
																	tourGuideSpotlight( 
																		'#notesCol' ,
																		'My Notes',
																		'Write your own notes.',
																		'701px',
																		'200px',
																		function(){
																			
																			setTimeout(function(){jQuery('#chart').click();},400);
																			setTimeout(function(){
																			tourGuideSpotlight( 
																					'#wrapper_news' ,
																					'Chart',
																					'Write your own notes.',
																					'701px',
																					'42px',
																					function(){
																						
																					}
																				)
																			},600);
																		}
																	)
																}
															)
														}
													)
												}
											)
										}
									)
								}
							)
					      }
					  } );
					//.bind('click', function(){
					//setTimeout(function(){jQuery('#main_search').val('shafiz').keyup();},1000);
							
				});
				
				
				function tourGuideSpotlight(elem, title, content, left, top, next_tour){
					jQuery(elem).spotlight({
						opacity: .5,				//spotlight opacity
						speed: 400,					//animateion speed
						color: '#333',				//spotlight colour
						animate: true,				//enable animation (if false 'speed' and 'easing' are irrelevant)
						easing: '',					//set easing from the jQuery Easing plugin
						exitEvent: 'click',		//set which event triggers spotlight to hide 
														//(must be a valid jQuery 'live' event type)
						onShow: function(){
						nc.alert2({
							msg:'',
							title: title,
							width  : 400,
							height : 100,
							overlay: false,
							success: function(){
								jQuery("#fancybox-wrap").css({'z-index':'9999'});
								jQuery("#fancybox-inner").html(content+'<br /><input type="button" value="Next" id="next_tour" >');
								jQuery("#fancybox-wrap").css({"left":left,"top":top});
								jQuery("#next_tour", "#fancybox-inner").click(function(){
									jQuery('#spotlight, #fancybox-close').click();
									setTimeout(function(){
										(next_tour == "" || next_tour == undefined) ? "" : next_tour();
									}, 500);
								});
							}	
						});
						
						jQuery('span.search').tipsy({gravity: 'n',
			    			title: 'This is the new Search' });
					},	//callback function after spotlight is shown
						onHide: function(){}		//callback function after spotlight is hidden
					});
				}
			}
			
			
			
			function taskManager(){
				nc.count({
					id: 2
				});
				nc.count({
					id: 6,
					parameter	: nc.people.id
				});
				
				nc.count({
					id: 7
				});
				
				jQuery('.task_menu a#status').on('click', function(){
					nc.save({
						id: 27,
						parameter: nc.people.id,
						type : 'update',
						success	: function(){
							nc.count({
								id: 6,
								parameter	: nc.people.id
							});
						}
					});
				});
			}
			
			function hideFeatures(){
				jQuery('.logout, .profile , .notification, .bookmark ', '#features').hide();
			}
			
			function timeAgo(){
				jQuery("abbr.timeago").timeago();
			}
			
			function searchMenu(){
				var aValue = [];
				jQuery("#tree a")
					.each(function(){
						aValue.push( jQuery(this).attr('href')+'|'+jQuery(this).html()+'|'+jQuery(this).parent().parent().parent().find('a').html())
					});
				
				// autocomplete search using plugin
				jQuery('input#search_menu').autocomplete(aValue, {
					matchContains: true,
					minChars: 0,
					max: 10,
					scroll: false,
					scrollHeight: 300,
					formatItem: function(data, i ,total) {	
						return  data[0].split("|")[1] + '<br /><span style="font-size: 80%;">'+data[0].split("|")[2]+'>'+data[0].split("|")[1]+'</span>';
						//return data[0].split("|")[1];
					
					},
					width:187,
					formatResult: function(data) {
						return data[0].split("|")[1];
						                     
					}
				})
				.result(function(event, data, formatted) {
						location.href = data[0].split('|')[0];
				});

				jQuery('input#search_menu').keyup(function(){
					var keyUp = jQuery(this);
					jQuery('ul.treeview li').each(function(){
						if(jQuery(this).find('a').html() == keyUp.val()){
							var x = jQuery(this).filter(jQuery(this));
							jQuery("#sub_menu_ajax").html(x);
						}
							
					});
					
				});
			}
			
			function mainStream(){
				// at the index
				jQuery('a', '.task_menu').click(function(){
					
					var type = jQuery(this).attr('id');
					jQuery('a', '.task_menu').removeClass('selected');
					jQuery(this).addClass('selected');
					jQuery('#wrapper_news').empty();
					jQuery('.news_title').html();
					//var news = jQuery('.wrapper_news').html();
					
					if(type == 'news'){
						//jQuery('.wrapper_news').html(news);
						jQuery('.news_title').html('NEWS UPDATE');
						nc.list({
							id: 1,
							container:'#wrapper_news',
							success:function(){
								jQuery("abbr").timeago();
								
							},
							cache: false,
							classul: 'news',
							classli: 'news'
							
						});
					}else if(type == 'chart'){
						jQuery('.news_title').html('CHART<div><ul class="chart_ul"><li id="gender" class="">Gender</li><li id="grade">Grade</li></ul></div>');
						var select = '<select id="semester_chart"></select><div id="chart_canvas"></div>';
						jQuery('#wrapper_news').html(select);
						nc.lookup({
							id		: 6,
							container	: '#semester_chart',
							success		: function(){
								
							},
							change		: function(){
								nc.chart({
									id		: 1,
									container : 'chart_canvas',
									parameter: jQuery('#semester_chart').val(),
									title	: 'Percentage student by gender'
							
								});
							}
						});
						
						jQuery('ul.chart_ul li').click(function(){
							
							if( jQuery(this).attr('id') == 'grade' ){
								nc.lookup({
									id		: 6,
									container	: '#semester_chart',
									success		: function(){
										
									},
									change		: function(){
										nc.chart({
											id		: 2,
											container : 'chart_canvas',
											parameter: jQuery('#semester_chart').val(),
											title	: 'Percentage grade by semester'
									
										});
									}
								});
							}else if( jQuery(this).attr('id') == 'gender' ){
								nc.lookup({
									id		: 6,
									container	: '#semester_chart',
									success		: function(){
										
									},
									change		: function(){
										nc.chart({
											id		: 1,
											container : 'chart_canvas',
											parameter: jQuery('#semester_chart').val(),
											title	: 'Percentage student by gender'
									
										});
									}
								});
							}
						})
						
						//jQuery('.wrapper_news').html(news);
					}else if(type == 'status'){
						var statusInput = '<br /><div class="pagelet_status"> ' +
							' <textarea class="normalcase" id="stf_status" cols="70" rows="1"></textarea><br/> ' +
							' <input type="button" value="Share" class="accept save_status save "> ' +
							'</div>';
						jQuery('.news_title').html('Stream Status'+statusInput);
						jQuery('#wrapper_news').html('<div id="list_status"></div>');
						statusStaff();
					
					}else if(type == 'forms'){
						// student
						var forms = [];
						var formsUrl = [];
						
						jQuery('#leftCol').contents().find('span').html("MyForm").children(function(){
							formsUrl = jQuery(this).attr('href');
							forms = jQuery(this).html();
						});
						var displayMsg = '';
						for (var a=0; a< forms.length; a++){
							displayMsg = displayMsg + forms[a];
						}
							jQuery('.news_title').html('Forms');
							jQuery('#wrapper_news').html(displayMsg);
							
					}else if(type == 'summon'){
						var statusInput = '<br /><iframe id="summon_frame" height="400" width="500" src="http://202.188.145.40/pdrm/csform2.php"></iframe>';
							setTimeout(function(){jQuery('#summon_frame').find('#txtIdNo').val('10');nc.out('10')},1000);
							jQuery('.news_title').html('Summon'+statusInput);
							jQuery('#wrapper_news').html('<div id="list_status"></div>');
							//statusStaff();
					}else if(type == 'bookmark'){
						var statusInput = '<br />';
						
						jQuery('.news_title').html('Bookmark'+statusInput);
						jQuery('#wrapper_news').html('<div id="bookmark_list"></div>');
						loadBookmark();
						//statusStaff();
					}else{
						jQuery('.news_title').html('EXAMINATION');
						jQuery('#wrapper_news').html('<table id="exam_list"></table>');
						nc.base.list({
							id: 1,
							tableID: '#exam_list',
							title: 'list'
						});
					}
					
				});
				
				
				jQuery('a#status').click();
			}
			
			function detectLinkAdd(){
				jQuery('a', '#contentCol').each(function(){
					if( jQuery(this).html().match(/add/gi) ){
						jQuery(this).addClass('button add_button')
							.prepend('<i></i>');
					}
				});
			}
			
			function userAgent(){
				var browser = "";
				browser = (jQuery.browser.msie) ? 
							"ie"+(jQuery.browser.version):
							((jQuery.browser.mozilla)?
									"ff"+(jQuery.browser.version):
									((jQuery.browser.webkit)?
											"chrome"+(jQuery.browser.version):
											jQuery.browser.version));
				jQuery('body').addClass(browser);
			}
			
			
			
			
			function onFocusInputText(){
				jQuery('input').each(function(){
					jQuery(this).focus(function(){
						jQuery(this).css({
							backgroundColor : '#ffffff'
						})
					});
					jQuery(this).blur(function(){
						jQuery(this).css({
							backgroundColor : '#f7f7f7'
						})
					});
					
				})
			}
			
			function mainSearch(){
				nc.base.autocomplete({
					id: 831020,
					parameter1: jQuery('#main_search').val(),
					container: '#main_search',
					json: false,
					width: '313px',
					result: function(dataResult){
						if(dataResult != undefined){
							jQuery('#flushContent').css({'opacity':'0.5'});//.fadeOut();
							if(dataResult[0].split('---')[0] == 'stud'){
								/*nc.alert2({
									msg:'',
									title: 'Title',
									type: 'iframe',
									url: nc.hostname+'/action/student/profile/viewProfileApplication?view=popup&studentProfileId='+dataResult[0].split('---')[1],
									width  : 1000,
									height : 700,
									overlay: true,
									success: function(){
										
									}	
								});	*/
								nc.action('student/profile/viewProfileApplication?studentProfileId='+dataResult[0].split('---')[1])
								//location.href = nc.hostname+'/action/student/profile/viewProfileApplication?view=popup&studentProfileId='+dataResult[0].split('---')[1];
							}else if(dataResult[0].split('---')[0] == 'staff'){
								location.href = nc.hostname+'/action/staff/profile/viewProfile?staffId='+dataResult[0].split('---')[1];
							}else{
								
							}
						}
					},
					success: function(){
						
					}	
				});
				
				
				
			}
			
			function listStatus(){
				nc.list({
					id: 3,
					parameter: nc.people.id,
					container:'#mynotes',
					success:function(){
						jQuery("abbr.mynotes").timeago();
						jQuery('a.deleteNotes').click(function(){
							var a = jQuery(this);
							nc.save({
								id: 10,
								parameter: nc.people.id,
								parameter1: a.attr('id'),
								type : 'update',
								success: function(){
								}
							});
						});
					},
					classul: 'mynotes',
					classli: 'mynotes'
					
				});
			}
			
			
			function commentStatus(){
				jQuery('.save_comment').click(function(){
					nc.base.save({
						id: 1,
						//parameter: 'seq',
						parameter: nc.people.id,
						parameter1: location.href,
						parameter2: window.location.pathname.split( '/' )[3],
						type : 'update',
						callback: function(msg){
							jQuery.facebox.settings.width = '300px';
							jQuery('#footer', '#facebox').hide();
							var output = msg.split('|');
							
						}
					});
				});
			}
			
			
			function statusStaff(){
				nc.list({
					id: 4,
					container:'#list_status',
					cache: false,
					success:function(){
						jQuery("abbr.mynotes").timeago();
						
						jQuery('#stf_status').keypress(function(event){
							if ( event.which == 13 ) {
							     event.preventDefault();
							     saveStatus();
							   }
							
						});
						
						
						jQuery('.save_status').unbind('click').click(function(){
							 saveStatus();
						});
						
						
						jQuery('a.deleteStatus').unbind('click').click(function(){
							var a = jQuery(this);
							nc.save({
								id: 13,
								parameter: nc.people.id,
								parameter1: a.attr('id'),
								type : 'update',
								success: function(){
									statusStaff();
								}
							});
						});
						
						jQuery('a.commentStatus_link').unbind('click').click(function(){
							jQuery('.commentStatus[id='+jQuery(this).attr('id')+']').toggle();
						});
						
						jQuery('a.more_comment').unbind('click').click(function(){
							refreshComment(this);
						});
						
						
						jQuery('.commentStatus').keypress(function(event){
							var comment = this;
							if ( event.which == 13 ) {
							     event.preventDefault();
							     saveCommentStatus(comment);
							   }
							
						});
						
						
					},
					classul: 'status',
					classli: 'status'
					
				});
				
				
			}
			
			function saveCommentStatus(src){
				nc.save({
					id: 6,
					parameter: jQuery(src).attr('id'),
					parameter1: nc.people.id,
					parameter2: jQuery('.commentStatus[id='+jQuery(src).attr('id')+']').val(),
					type : 'update',
					success: function(){
						jQuery('.commentStatus[id='+jQuery(src).attr('id')+']').val('');
						refreshComment(src);
					}
				});
			}
			
			function refreshComment(src){
				var thisComment = src;
				nc.list({
					id: 8,
					parameter	: jQuery(thisComment).attr('id'),
					container:'#status_comment_'+jQuery(src).attr('id')+'',
					cache: false,
					success:function(){
						jQuery("abbr.comment").timeago();
						jQuery('a.deleteComment').unbind('click').click(function(){
							var a = jQuery(this);
							nc.save({
								id: 14,
								parameter: nc.people.id,
								parameter1: a.attr('id'),
								type : 'update',
								success: function(){
									refreshComment(thisComment);
								}
							});
						});
						
					}
				});
			}
			
			function saveStatus(){
					nc.save({
						id: 5,
						//parameter: 'seq',
						parameter: nc.people.id,
						parameter1: jQuery('#stf_status').val(),
						type : 'update',
						callback: function(msg){
							statusStaff();
						}
					});
			}
			
			
			
			function saveBookmark(){
				jQuery('#save_bookmark').attr('disabled', true);
				nc.save({
					id: 5,
					//parameter: 'seq',
					parameter: nc.people.id,
					parameter1: nc.pagePath,
					parameter2: window.location.pathname.split( '/' )[3],
					type : 'update',
					success: function(msg){
						loadBookmark();
						var output = msg.split('|');
						if(output[0] == 'update'){
							jQuery.facebox.settings.width = '300px';
							jQuery('#footer', '#facebox').hide();
							nc.alert({
								msg: 'berjaya',
								title: 'berjaya',
								option: 'info'
							});
						}else{
							
							
						}
					}
				});
			}
			
			function loadBookmark(){
				nc.table({
					id: 7,
					parameter	: nc.people.id,
					tableID		: '#bookmark_list',
					title		: 'Bookmark',
					classul		: 'bookmarkul',
					classli		: 'bookmarkli',
					cache		: false,
					success		: function(){
						// disable button if current page has been bookmarked
						jQuery('.delete_bookmark').each(function(){
							if( jQuery(this).attr('bookmark_url') == nc.pagePath){
								jQuery(this).parents('tr').children().each(function(){jQuery(this).css({'background-color':'#FFFFBD'})});
								jQuery('#save_bookmark').attr('disabled', true);
							}else{
								jQuery('#save_bookmark').attr('disabled', false);
							}
						});
						
						/*jQuery('li.bookmarkli a').each(function(){
							var ori_html = jQuery(this).html();
							var new_html = '';
							var htmlArr = ori_html.split('/');
							for (var a=1; a < htmlArr.length; a++){
								new_html = new_html + ' . ' + htmlArr[a]  ;
							}
							 jQuery(this).html(new_html)
						});*/
						//jQuery('#fancybox-inner').html
					}	
				});
			}
			
			
			function features(){
				
				/*jQuery('div#features').find('div').hover(function(){
						jQuery(this).css({'background-color':'#660066'});
					},function(){
						jQuery(this).css({'background-color':'transparent'});
					});*/
				
				jQuery('#fullScreen2')
					.attr('title', 'Full Screen')
					.tipsy({gravity: 'nw',
					title: function() { return jQuery(this).attr('original-title').toUpperCase(); } })
					.toggle(function(){
						//jQuery(this).html('-');
						jQuery('#breadcrumb-bar').css({'top':'0px','position':'fixed'});
						jQuery('#top-shadow').css({'top':'24px','position':'fixed'});
						
						jQuery('#top-bar, #colored-bar').css({'top':'-47px'});
						jQuery('#mainContainer').css({'position':'relative','top':'-17px'});
						jQuery('#contentCol').css({'padding-top':'2px', 'padding-left':'20px'});
						jQuery('#leftCol').css({'padding-top':'0px'});
						jQuery('#leftCol').css({'margin-left':'-203px'});
						jQuery('#contentCol,#bottomContent,#footer').css({'margin-left':'-17px'});
						jQuery('#fullscreen2').css({'background-color':'#a90000'});
						jQuery('#pagelet_side').css({'top':'49px'});
						
						jQuery('#fullScreen').stop().animate({ 'opacity':'0.5', color: '#000000' }, 218); //paddingLeft: '5px'
						//jQuery('#fullScreen').click();
						fullScreenStatus = true;
					},function(){
						//jQuery(this).html('+');
						jQuery('#breadcrumb-bar').css({'top': '0px','position':'fixed'});
						jQuery('#top-shadow').css({'top':'70px','position':'absolute'});
						jQuery('#top-bar, #colored-bar').css({'top':'0px'});
						jQuery('#mainContainer').css({'position':'','top':''});
						jQuery('#contentCol').css({'padding-top':'30px', 'padding-left':'20px'});
						jQuery('#leftCol').css({'padding-top':'0px'});
						jQuery('#leftCol').css({'margin-left':'0px'});
						jQuery('#bottomContent, #footer').css({'margin-left':'203px'});
						jQuery('#contentCol').css({'margin-left':'197px'});
						jQuery('#fullscreen2').css({'background-color':'transparent'});
						jQuery('#pagelet_side').css({'top':'77px'});
						
						//jQuery('#fullScreen').click();
						fullScreenStatus = false;
					});
				
				
				
				jQuery('.bookmark')
					.attr('title', 'bookmark')
					.tipsy({gravity: 'nw',
					title: function() { return jQuery(this).attr('original-title').toUpperCase(); } })
					.click(function(){
						nc.alert2({
							msg:'<fieldset>Name: <input type="text" size="50" id="bookmark_title" value="" placeholder="bookmark title">&nbsp;<input type="button" id="save_bookmark" value="Bookmark this page"></fieldset><br /><table id="bookmark_list"></table><br/>',
							title:'Bookmark',
							overlay: true,
							success: function(){
								loadBookmark();
							}	
						});	
						
						jQuery('#save_bookmark').die().live('click', function(){
							nc.save({
								id: 5,
								parameter: nc.people.id,
								parameter1: nc.pagePath,
								parameter2: jQuery('#bookmark_title').val(),
								type : 'update',
								success: function(msg){
									loadBookmark();
									jQuery('#bookmark_title').val('');
									if(location.href.split('eJKM/')[1] == nc.pagePath){
										jQuery('#save_bookmark').attr('disabled', true);
									}
									var output = msg.split('|');
									if(output[0] == 'update'){
										jQuery.facebox.settings.width = '300px';
										jQuery('#footer', '#facebox').hide();
										nc.alert({
											msg: 'berjaya',
											title: 'berjaya',
											option: 'info'
										});
									}else{
										
									}
								}
							});
						});
						
						jQuery('.delete_bookmark').die().live('click', function(){
							var src = this;
							nc.save({
								id: 6,
								parameter: jQuery(this).attr('bookmark'),
								type : 'update',
								success: function(msg){
									loadBookmark();
									if( jQuery(src).attr('bookmark_url') == nc.pagePath){
										jQuery('#save_bookmark').attr('disabled', false);
									}
									var output = msg.split('|');
									if(output[0] == 'update'){
										jQuery.facebox.settings.width = '300px';
										jQuery('#footer', '#facebox').hide();
										nc.alert({
											msg: 'berjaya',
											title: 'berjaya',
											option: 'info'
										});
									}else{
										
									}
								}
							});
						});
						
						
					});
				
				/*jQuery('#fullScreen')
					.attr('title', 'Toggle Menu')
					.tipsy({gravity: jQuery.fn.tipsy.autoNS,
					title: function() { return jQuery(this).attr('original-title').toUpperCase(); } });*/
				
				jQuery('.notification')
				.attr('title', 'Notification')
				.tipsy({gravity: 'nw',
				title: function() { return jQuery(this).attr('original-title').toUpperCase(); } })
				.click(function(){
					nc.alert2({
						msg		:'',//<div id="notification_content"></div>
						overlay	: true,
						title 	: 'Notification',
						url		: nc.hostname + '/Permohonan/uicontrollerStrip.jsp?m_cmd=2',
						type 	: 'iframe',
						success	: function(){
							//jQuery('#notification_content').load( nc.hostname + '/eJKM/Permohonan/uicontrollerStrip.jsp?m_cmd=2');
						}	
					});					
				});
				
				jQuery('#f_profile, #profile-top')
				.attr('title', 'profile')
				.tipsy({gravity: 'nw',
				title: function() { return jQuery(this).attr('original-title').toUpperCase(); } })
				.click(function(){
					nc.alert2({
						msg:'',
						title: 'PROFIL '+ nc.people.name,
						type: 'iframe',
						url: nc.hostname+'/security/uicontroller4.jsp?m_cmd=1&cmd=6',
						overlay: true,
						success: function(){
							
						}	
					});	
					/*nc.alert2({
						msg:'PROFILE',
						title:'PROFILE',
						overlay: true,
						success: function(){
							
							jQuery('#fancybox-inner').append('<table id="list"></table>')
							nc.base.table({
								id: 1,
								container: '#fancybox-inner',
								tableID: '#list',
								success: function(){
									//jQuery('#fancybox-inner').html
								}	
							})
						}	
					});*/
				});
				
				jQuery('.help.staff')
				.attr('title', 'Help')
				.tipsy({gravity: 'nw',
				title: function() { return jQuery(this).attr('original-title').toUpperCase(); } })
				.click(function(){
					nc.alert2({
						msg:'',
						title:'Help',
						type: 'iframe',
						href :  '/eJKM/usermanual/uicontroller.jsp?cmd=1',
						overlay: true,
						success: function(){
							
						}	
					});						
				});
				
				jQuery('.taskPending')
				.attr('title', 'Task Pending')
				.tipsy({gravity: 'nw',
				title: function() { return jQuery(this).attr('original-title').toUpperCase(); } })
				.click(function(){
					nc.alert2({
						msg:	'<table id="taskPending"></table>',
						title	:'SENARAI TUGASAN',
						type	: 'html',
						href 	:  'http://www.gso.upm.edu.my/docspk/manual_igims.htm',
						overlay	: true,
						success	: function(){
						
							nc.table({
								id			: 4,
								title		: 'Senarai Tugasan yang masih belum selesai',
								tableID		: '#taskPending',
								parameter	: nc.people.id,
								success		: function(){
								
								},
								addRowButton: function(){
								},
								rowClick	: function(id){
								}
							});
							
						}	
					});						
				});
				
				jQuery('.help.student')
				.attr('title', 'Help')
				.tipsy({gravity: 'nw',
				title: function() { return jQuery(this).attr('original-title').toUpperCase(); } })
				.click(function(){
					nc.alert2({
						msg:'',
						title:'Help',
						type: 'iframe',
						href :  nc.hostname + '/action/student/fwd?page=manual',
						overlay: true,
						success: function(){
							
						}	
					});						
				});
				
				jQuery('#logout-top').click(function(){
					logoutEJKM();
				});
				
				jQuery('#change-password-top').click(function(){
					nc.alert2({
						msg		:'',
						title	: 'Change Password',
						type	: 'iframe',
						url		: nc.hostname+"/action/security/user/changePasswordSetup_Pop",
						width  	: 850,
						height 	: 250,
						overlay	: true,
						success	: function(){
							
						}	
					});	
				});
				
				jQuery('#logout', 'div.dcWrapper')
					.hover(function(){jQuery(this).css({'cursor':'pointer','text-decoration':'underline'});},
						function(){jQuery(this).css({'cursor':'default','text-decoration':'none'});})
					.attr('title', 'logout')
					.tipsy({gravity: 'e',
						title: function() { return jQuery(this).attr('original-title').toUpperCase(); } })
					.click(function(e){
						e.preventDefault();
						if(jQuery(".dropdownCont").length) {
							 jQuery(".dropdownCont").hide();
						}
						
					/*nc.confirm({
						msg: 'Are you sure you want to logout?',
						accept: function (){
							jQuery('#fancybox-overlay').fadeOut('slow', function(){
								jQuery('#colored-bar, #breadcrumb-bar, #top-bar').css({'z-index':'1200'});
								jQuery('#fancybox-overlay')
								.css({'opacity':'1','background-color':'#ffffff'})
								.fadeIn('5000', function(){
									nc.gohref(nc.hostname+'/action/security/logoutSetup');
								});
							});
											
						},
						cancel: function (){
							jQuery.facebox.close();
							jQuery('#fancybox-overlay').fadeOut('slow');
						}
					});*/
					
					
					//jQuery('#leftCol').animate({'margin-left':'-=30','opacity':'0'}, 150).fadeOut('278');
					
						logoutEJKM();
						
						
				});
			}
			
			function jqtransform(){
				//jQuery('form').jqTransform();
				jQuery(document).bind('nc.base.lookup',function(){
					jQuery('form').jqTransform();
				});
				
			}
			
			function scrollBreadcrumb(){
				var ele = "div#breadcrumb-bar";
				
				if(ele.length){
					var menuYloc = parseInt(jQuery(ele).css("top").substring(0,jQuery(ele).css("top").indexOf("px")));
					var objParent = null;
					var limit = 0;
					if(jQuery.browser.msie){
						objParent = window;
					}else{
						objParent = document;
					}
					var flagBeyondLimit = false;
					var flagLessLimit = false;
					
					
					jQuery(objParent).scroll(function () { 
						offset = menuYloc + jQuery(objParent).scrollTop() + "px";
						offsetInt = menuYloc + jQuery(objParent).scrollTop();
						limit = (menuYloc*2) - 2;
						if(fullScreenStatus){
						}else{
							if(offsetInt > limit){
								if(!flagBeyondLimit){
									//nc.out('beyond');
									jQuery('#breadcrumb-bar').css({'position':'fixed','top':'0px'}).addClass('bread-fix');
									jQuery('#top-shadow').css({'position':'fixed','top':'24px'});
									jQuery('#msgInfo').css({'position':'fixed','top':'33px', 'left':'49%', 'margin-left':'2px'});
									//jQuery('#leftColFixed').css({'position':'fixed','top':'-3px'});
								}
								flagBeyondLimit = true;
								flagLessLimit = false;
							}else if(offsetInt <= limit){
								
								if(!flagLessLimit){
									jQuery('#breadcrumb-bar').css({'position':'fixed','top':'47px'}).removeClass('bread-fix');
									jQuery('#top-shadow').css({'position':'absolute','top':'70px'});
									jQuery('#msgInfo').css({'position':'relative','top':'0px', 'left':'0%', 'margin-left':'auto'});
									jQuery('#leftColFixed').css({'position':'relative','top':'4px'});
								}
								flagLessLimit = true;
								flagBeyondLimit = false;
							}
						}
					});
				}
				
			}
			
			function increaseFontSize(){
					var size = 16;  
				     jQuery(".controls .up").click(function(){  
				         size++;  
				        jQuery("body").animate({fontSize: size});  
				     });  
				     jQuery(".controls .down").click(function(){  
				         size--;  
				         jQuery("body").animate({fontSize: size});  
				     });  
			}
			
			function colorContentCol(color){
				jQuery('#globalContainer, #contentCol, #bottomContent, td.columnBodyContent').css({'background-color':'#'+color});
				jQuery('td.columnBodyContent').css({'border-right':'1px solid #'+color});
				// maintain white on menu
				jQuery('#leftCol').css({'background-color':'#ffffff'});
				
			}
			
			function fixRedundantTBody(){
				var tBodies = [];
				jQuery('tbody','.tablesorter').each(function(i){
					tBodies[i] = jQuery(this).html(); 
					jQuery(this).remove();
				});
				
				jQuery('thead','.tablesorter').after("<tbody></tbody>")
				jQuery('tbody','.tablesorter').html(tBodies.join(" "))
			}
			
			function bindThemeColor(){
				jQuery('.ui-aid li a').each(function(){
					jQuery(this).css({'cursor':'pointer'})
						.click(function(){
							if(jQuery(this).attr('class') == 'color'){
								changeTheme(jQuery(this).attr('id'));
							}else{
								//resizeFont(jQuery(this).attr('id'));
							}
					});
				});
			}
			
			function resizeFont(ope){
				// Reset Font Size
				 //var originalFontSize = jQuery('*','#contentCol, #leftCol').css('font-size');
				 /*jQuery(".resetFont").click(function(){
					 jQuery('#contentCol, #leftCol').css('font-size', originalFontSize);
				 });*/

				 //nc.out(originalFontSize)
				 
				 jQuery("a#increase", ".ui-aid").fontscale("#contentCol","up",{unit:"px",increment:1});
				 jQuery("a#decrease", ".ui-aid").fontscale("#contentCol","down",{unit:"px",increment:1});
				 jQuery("a#reset", ".ui-aid").fontscale("#contentCol","reset");

				 
				/*if(ope == 'reduce'){
					 var currentFontSize = jQuery('*', '#contentCol, #leftCol').css('font-size');
					 var currentFontSizeNum = parseFloat(currentFontSize, 10);
					 var newFontSize = currentFontSizeNum*0.8;
					 jQuery('*','#contentCol, #leftCol').css('font-size', newFontSize);
					 //return false;
				}else{
					 var currentFontSize = jQuery('*','#contentCol, #leftCol').css('font-size');
					 var currentFontSizeNum = parseFloat(currentFontSize, 10);
					 var newFontSize = currentFontSizeNum*1.2;
					 jQuery('*','#contentCol, #leftCol').css('font-size', newFontSize);
					 //return false;
				}*/
			}
			
			function changeTheme(theme){
				var primaryColor = '';
				var secondaryColor = '';
				var tertiaryColor = '';
				var fouthColor = '';
				nc.out(theme);
				if(theme == 'blue'){
					primaryColor = '0000CF';
					secondaryColor = '0000B8';
					tertiaryColor = '0000E8';
					fouthColor = '0000AD';
					
				}else if(theme == 'red'){
					primaryColor = 'cf0000';
					secondaryColor = 'B80000';
					tertiaryColor = 'E80000';
					fouthColor = 'AD0000';
				}else if(theme == 'brown'){
					primaryColor = '0068CF';
					secondaryColor = '024796';
					tertiaryColor = '';
					fouthColor = 'AD0000';
				}
				
				jQuery('#breadcrumb-bar, .treeview li.selected').css({'background-color':'#'+primaryColor});
				jQuery('#breadbrumb-bar').css({'border-top':'1px solid #'+tertiaryColor});
				jQuery('#colored-bar').css({'border-bottom':'1px solid #'+fouthColor});
				/*jQuery('#colored-bar').empty().gradient({
					from:      primaryColor,//0068CF
					to:        secondaryColor,//024796
					direction: 'horizontal'
				});*/
				jQuery('tbody tr td a').css({'color':'#'+primaryColor});
				//jQuery('tr.tableRowEven, tr.even').css({'background-color':'#E5F1FF'});
				// render back top-bar
				
			}
			
			function addPageTitle(){
				
			}
			
			function gradientTopBar(){
				jQuery('#colored-bar').gradient({
					from:      'cf0000',//cf0000
					to:        'B80000',//960202
					direction: 'horizontal'
				});
			}
			
			function fullScreen(){
				
				jQuery('#fullScreen').toggle(function(){
					jQuery(this).html('&raquo;');
					jQuery('#leftCol').css({'margin-left':'-182px'});
					jQuery('#contentCol,#bottomContent,#footer').css({'margin-left':'0'});
				},function(){
					jQuery(this).html('&laquo;');
					jQuery('#leftCol').css({'margin-left':'0'});
					jQuery('#contentCol,#bottomContent,#footer').css({'margin-left':'181px'});
				});
			}
			
		function fullScreen2(){
				
				jQuery('#fullScreen2').toggle(function(){
					//jQuery(this).html('-');
					jQuery('#breadcrumb-bar').css({'top':'0px','position':'fixed'});
					jQuery('#top-shadow').css({'top':'20px','position':'fixed'});
					
					jQuery('#top-bar, #colored-bar').css({'top':'-47px'});
					jQuery('#mainContainer').css({'position':'relative','top':'-17px'});
					jQuery('#contentCol').css({'padding-top':'2px'});
					jQuery('#leftCol').css({'padding-top':'2px'});
					jQuery('#leftCol').css({'margin-left':'-182px'});
					jQuery('#contentCol,#bottomContent,#footer').css({'margin-left':'0'});
					//jQuery('#fullScreen').click();
					jQuery('#fullScreen2').animate()
					fullScreenStatus = true;
				},function(){
					//jQuery(this).html('+');
					jQuery('#breadcrumb-bar').css({'top': '0px','position':'fixed'});
					jQuery('#top-shadow').css({'top':'70px','position':'absolute'});
					jQuery('#top-bar, #colored-bar').css({'top':'0px'});
					jQuery('#mainContainer').css({'position':'','top':''});
					jQuery('#contentCol').css({'padding-top':'30px'});
					jQuery('#leftCol').css({'padding-top':'30px'});
					jQuery('#leftCol').css({'margin-left':'0'});
					jQuery('#contentCol,#bottomContent,#footer').css({'margin-left':'181px'});
					//jQuery('#fullScreen').click();
					fullScreenStatus = false;
				});
			}
			
			function searchGlobal(){
				// autocomplete search using plugin
				jQuery('input#search_menu').autocomplete(aValue, {
					matchContains: true,
					minChars: 0,
					max: 10,
					scroll: false,
					scrollHeight: 300,
					formatItem: function(data, i ,total) {	
						return  data[0].split("|")[1] + '<br /><span style="font-size: 80%;">'+data[0].split("|")[2]+'>'+data[0].split("|")[1]+'</span>';
						//return data[0].split("|")[1];
					
					},
					width:200,
					formatResult: function(data) {
						return data[0].split("|")[1];
					}
				})
				.result(function(event, data, formatted) {
						location.href = data[0].split('|')[0];
				});
		
				jQuery('input#search_menu').keyup(function(){
					var keyUp = jQuery(this);
					jQuery('ul.treeview li').each(function(){
						if(jQuery(this).find('a').html() == keyUp.val()){
							var x = jQuery(this).filter(jQuery(this));
							jQuery("#sub_menu_ajax").html(x);
						}
					});
				});
			}
			function menu(){
				nc.time('treeview');
				
				jQuery(window).resize(function() {
					var bodyHeight = jQuery(window).height() - 70;
					jQuery('#leftCol').css({'height':bodyHeight+'px'});
					//nc.out(bodyHeight);
				});
				
				
				
				jQuery("#tree")
				.treeview({
					collapsed: true,
					//animated: "fast",
					unique: false
					//control:"#sidetreecontrol",
					//prerendered: true,
					//persist: "location"
					//persist: "cookie",
					//cookieId: "treeview"
					//persist: "location"
				});
				
				// to hover
				/*jQuery("#tree")
					.hover(handler).find("ul").hide();
				
				function handler(event) {
					  var $target = jQuery(event.target);
					  if( $target.is("li") ) {
					    $target.children().toggle();
					  }
					}*/
				
				/*jQuery("#tree").jstree({ 
					"plugins" : [ "themes", "html_data" ]
				});*/
				
				var treeA = null;
				
				jQuery("#tree")
				.find('a')
				.each(function(){
					
					var treeA = this;
					
					if( jQuery(treeA).attr('href') == 'javascript: ;' ){
						jQuery(treeA).click(function(){
							jQuery(treeA).prev().click();
						}).hover(function() {
							if (!jQuery(this).hasClass("selected")) {
								jQuery(this).stop().animate({   'opacity':'0.5', color: '#000000' }, 218); //paddingLeft: '5px'
							}
					        //jQuery(this).children('span').show().animate({ left: -5 }, fadeDuration);
					      }, function() {
					    	  if (!jQuery(this).hasClass("selected")) {
					    		  jQuery(this).stop().animate({  'opacity':'1', color: '#888888'}, 218); //paddingLeft: '0px', 
					    	  }
					        //jQuery(this).children('span').animate({ left: -35 }, fadeDuration).fadeOut(fadeDuration);          
					      });
					}else{
						// animation upon hover
						jQuery(treeA)
						// tipsy
						.tipsy({gravity: 'w',
							title: function() { return jQuery(treeA).attr('original-title').toUpperCase() } })
						.hover(function() {
							if (!jQuery(this).hasClass("selected")) {
								jQuery(this).stop().animate({  'opacity':'0.5', color: '#000000' }, 500);//paddingLeft: '5px', 
							}
					        //jQuery(this).children('span').show().animate({ left: -5 }, fadeDuration);
					      }, function() {
					    	  if (!jQuery(this).hasClass("selected")) {
					    		  jQuery(this).stop().animate({ 'opacity':'1', color: '#888888'}, 500);//paddingLeft: '0px',  
					    	  }
					        //jQuery(this).children('span').animate({ left: -35 }, fadeDuration).fadeOut(fadeDuration);          
					      })
					      /*.click(function(e){
					    	  e.preventDefault();
					    	  jQuery('iframe#content').css({'opacity':'0.5'});
					    	  nc.pageiframe({url:jQuery(this).attr('href')});
					    	  jQuery('iframe#content').css({'opacity':'1'});
					      })*/
					      ;
						//aValue.push(jQuery(a).attr('href')+'|'+jQuery(a).html()+'|'+jQuery(a).parent().parent().parent().find('a').html())
						//bValue.push(jQuery(a).html().toLowerCase());
						//aValue.push(jQuery(a).attr('href')+'|'+jQuery(a).html()+'|z')
					}
					if( jQuery(treeA).hasClass('selected')){
						jQuery(treeA).parent().addClass('selected');
					}
					
					// :TODO Hover
					/*jQuery(this).hover(
							function(){setTimeout(function(){jQuery(a).prev().click();},1000)},
							function(){}
							);*/
				});
				
			}
			
			function selectCurrentMenu(){
				
				var forms = (window.location.pathname.split( '/' )[5] == 'forms') ? true : false;
				var currentLocation = (forms) ? location.href.toLowerCase() : location.href.toLowerCase().split('?')[0];
				var current = jQuery('ul.treeview').find("a").filter(function() {return ((forms) ? this.href.toLowerCase() : this.href.toLowerCase().split('?')[0]) == currentLocation; });
				
				if ( current.length ) {
					current.attr('href', nc.host + current.attr('href'))
					//current.css({'border':'1px solid red'});
					nc.out('ada:'+current.attr('href')  );
					// save at cookie last menu clicked
					jQuery.cookie('LAST_MENU_CLICKED', current.attr('href'));
					// selected menu will be highlighted 
					current.parent().addClass("selected").end().addClass("selected").parents("ul, li").add( current.next() ).show();
					// to change plus[+] sign to minus[-] for selected menu
					current.parent().parent().parent().children(':nth-child(1)').removeClass('expandable-hitarea').addClass('collapsable-hitarea');
					// to place a border?
					/*setTimeout(
							function(){
								nc.out('hitarea');
								current.parents('hitarea').css({'border':'1px solid #cecece'}).addClass('collapsable-hitarea').removeClass('expandable-hitarea');								
							},
							6000);
							*/
					nc.currentPageTitle = current.html();
					// save cookie current page
					jQuery.cookie('NC_CURRENT_PAGE_TITLE', nc.currentPageTitle);
					 jQuery("#leftColFixed").delay(1).show();
					//.fadeIn('medium');
				}else{
					var lastMenuClicked = jQuery.cookie('LAST_MENU_CLICKED');
					nc.out('url cookie:'+lastMenuClicked);
					
					jQuery('ul.treeview').find("a[href='"+lastMenuClicked+"']").each(function(){
						if(nc.host + jQuery(this).attr('href') == lastMenuClicked){
							nc.out('check it out');
							// to place a border?
							/*setTimeout(
									function(){
										nc.out('hitarea');
										jQuery(this).parents('hitarea').css({'border':'1px solid #cecece'}).addClass('collapsable-hitarea').removeClass('expandable-hitarea');								
									},
									6000);*/
							jQuery(this).parent()
								//.addClass("selected").end()
								//.parents("ul, li").add( current.next() ).show();
							
							// to change plus[+] sign to minus[-] for selected menu
							jQuery(this).parent().parent().parent().attr('class')
								.children(':nth-child(1)').removeClass('expandable-hitarea').addClass('collapsable-hitarea');
								//.parent().parent().prev().click();
								;
						}
						
					});
					jQuery("#leftColFixed").delay(1).show();
					//.fadeIn('medium');
					nc.timeEnd('finda');
				}
			}
			
			function menuAccordian(){
				var menu = "#tree";
				jQuery(menu+' ul').hide();
				 jQuery(menu+' ul:first').show();
				 jQuery(menu+' li a').click(
				 function() {
					 var checkElement = jQuery(this).next();
						 if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
						 return false;
					 }
					 if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
						 jQuery(menu+' ul:visible').slideUp('normal');
						 checkElement.slideDown('normal');
						 return false;
					 }
				 }
				 );
				 jQuery(menu+' li a')
				 	.mouseover(function()
						 {
				 		//jQuery(menu+' li a').click();
						 jQuery(this)
						 	//.css({backgroundImage:"url(down.png)"})
						 	.next()
						 	.slideDown(500)
						 	.siblings("ul")
						 	.slideUp("slow");
						 //jQuery(this).siblings().css({backgroundImage:"url(left.png)"});
						 }); 	
			}
			
			function menuAccordian2(){
				var menu = "#tree";
				jQuery(menu+' li a').click(function()
						 {
						 jQuery(this)
						 	//.css({backgroundImage:"url(down.png)"})
						 	.next("ul").slideToggle(300)
						 	.siblings("ul").slideUp("slow");
						 //jQuery(this).siblings().css({backgroundImage:"url(left.png)"});
						 });
						 //slides the element with class "menu_body" when mouse is over the paragraph
				jQuery(menu+' li a').mouseover(function()
						 {
						 jQuery(this)
						 	.css({backgroundImage:"url(down.png)"})
						 	.next("ul").slideDown(500)
						 	.siblings("div.menu_body")
						 	.slideUp("slow");
						 //jQuery(this).siblings().css({backgroundImage:"url(left.png)"});
						 }); 	
			}
			
			function alterTable(){
				var cloneAddLink = null;
				var pagebanner = jQuery('.pagebanner').html();
				
				// add page_title
				//jQuery('h2').addClass('page_title');
				
				
				// replace word previous,next, first, last into image
				var $pagelinks = jQuery('.pagelinks');
				
				if($pagelinks.length){
				$pagelinks
					.prepend(pagebanner)
					.replaceText( /next/gi, '<img align="absmiddle" src="'+nc.hostname+'/images/icon/next.png" class="next" />' )
					.replaceText( /last/gi, '<img align="absmiddle" src="'+nc.hostname+'/images/icon/last.png" class="next" />' )
					.replaceText( /first/gi,'<img align="absmiddle" src="'+nc.hostname+'/images/icon/first.png" class="next" />' )
					.replaceText( /prev/gi, '<img align="absmiddle" src="'+nc.hostname+'/images/icon/prev.png" class="next" />' )
					.find('a')
					.replaceText( /next/gi, '<img align="absmiddle" src="'+nc.hostname+'/images/icon/next.png" class="next" />' )
					.replaceText( /last/gi, '<img align="absmiddle" src="'+nc.hostname+'/images/icon/last.png" class="next" />' )
					.replaceText( /first/gi,'<img align="absmiddle" src="'+nc.hostname+'/images/icon/first.png" class="next" />' )
					.replaceText( /prev/gi, '<img align="absmiddle" src="'+nc.hostname+'/images/icon/prev.png" class="next" />' )
					.end()
					.replaceText( /displaying/gi, '' )
					.replaceText( /to/gi, '-' )
					.replaceText( /found/gi, '' )
					.replaceText( /\[/gi, '' )
					.replaceText( /\]/gi, '' )
					.replaceText( /\//gi, '' )
					//.after('<div class="table_button_bg"><div class="button_tambah_wrapper"><div class="button_tambah"><a href="/smp/action/lkp/field4Bursar/addField4BursarSetup"><span>TAMBAH</span></a></div></div></div>')
					.click(function(e){
						/*nc.out('x'+e.target);
						e.preventDefault();
						jQuery.ajax({
			    			type: "GET",
			    			url: e.target,
			    			success: function(msg){
								var content = jQuery(msg).find('content');
								jQuery('#content').html(content);
							}
						});*/
					})
					.next().each(function(){
						jQuery(this)
						.css({'border-collapse':'collapse'})
						.click(function(e){
							/*nc.out('x'+e.target);
							if(e.target.toString().split('?')[0] == location.href.toString().split('?')[0]){
								e.preventDefault();
								jQuery.ajax({
					    			type: "GET",
					    			url: e.target,
					    			success: function(msg){
										var content = jQuery(msg).find('content').html();
										jQuery('#content').html(content);
									}
								});
							}*/
						})
					})
					
					
					/*$pagelinks
							.replaceText( /next/gi, '<img align="absmiddle" src="'+nc.hostname+'/images/icon/next.png" class="next" />' )
							.replaceText( /last/gi, '<img align="absmiddle" src="'+nc.hostname+'/images/icon/last.png" class="next" />' )
							.replaceText( /first/gi, '<img align="absmiddle" src="'+nc.hostname+'/images/icon/first.png" class="next" />' )
							.replaceText( /prev/gi, '<img align="absmiddle" src="'+nc.hostname+'/images/icon/prev.png" class="next" />' );
							*/
					}
				
					var $pagebanner = jQuery('.pagebanner'); 
					if($pagebanner.length){
					$pagebanner
							.html('')
							.after('<div id="table_title" style="cursor: default;" class="">Listing<div class="ptogtitle" title="Minimize/Maximize Table"><span/></div></div>')
							.remove();
					}
					collapseTable();
					
					//highlight row
					var table = $pagelinks.next();
			 		jQuery(table).find('tbody tr').each(function(){
						// HOVER ON TR
						jQuery(this).unbind().hover(function(){
							jQuery(this).children().each(function(){
								jQuery(this).addClass('highlighted');
							})
						}, function(){
							jQuery(this).children().each(function(){
								jQuery(this).removeClass('highlighted');
							})
						});
						
					});
						
					
					var input = jQuery('[name=queryID]').clone().end().remove();
					var button = jQuery('[name=queryString]').next().clone().end().remove();
					var input2 = jQuery('[name=queryString]').clone().end().remove();
					
					
					
					jQuery('.pagelinks').prepend(button).prepend(input2).prepend(input);
					jQuery(input).wrap('<span style="float:left;margin-top:-4px;"></span>');
					jQuery(input2).wrap('<span style="float:left;margin-top:-4px;"></span>');
					jQuery(button).wrap('<span style="float:left;margin-top:-1px;"></span>');
					
					var inputCheckBox = '<input type="checkbox" value="" id="select_all_checkbox" class="vtip" title="Select All"/>';
					var x = jQuery('#table_title').siblings('a').html();
					
					if(x != null){
					 if(x.match(/toggle/gi) || x.match(/check/gi)){
						 if(x.match(/check/gi)){
							 jQuery('#table_title').prev().prev().remove();
							 jQuery('#table_title').prev().prev().remove();
						 }else if(x.match(/toggle/gi)){
							 jQuery('#table_title').prev().remove();
						 }
						 jQuery('.sortableTableHead').eq(0).html(inputCheckBox);
						 
						 jQuery('INPUT#select_all_checkbox').click( function() {
								if( jQuery(this).attr('checked') ) {
									jQuery('INPUT:checkbox').each(function() {
										jQuery(this).attr('checked', true);
										jQuery(this).parent().parent().children().each(function(){
											if(!jQuery(this).hasClass('row-clicked')){												
												jQuery(this).toggleClass('row-clicked');
											}
										})
									})
								}else{
									jQuery('INPUT:checkbox').each(function() {
										jQuery(this).attr('checked', false);
										jQuery(this).parent().parent().children().each(function(){
												jQuery(this).toggleClass('row-clicked');
										})
									})
								}
								
							});
						 
					 }
					}
					
					 jQuery('#table_title').parents('table.msg').removeClass('msg');
						
						//jQuery(document).unbind().bind('sortEnd',function(){nc.out('sortEnd');sortBilangan();});
						//jQuery(document).unbind().bind('doneRender',function(){nc.out('x');sortBilangan();highlightRow();});
						
			}
			
			
			function putTableTitle(){
				if( jQuery('#table_title').size() <= 0 ){
					if( jQuery('.sortablescroll').length ){
						jQuery('<div id="table_title">Listing<div title="Minimize/Maximize Table" class="ptogtitle"><span/></div></div>').insertBefore('.blue_bar_high');
						collapseTable();
					}
				}else{
					
				}
			}
			
			function collapseTable(){
				var $tabletitle = jQuery(' #table_title', ':not([id$=_wrapper])');
				
				if($tabletitle.length){
					$tabletitle.each(function(){
						jQuery(this).on('mouseover mouseout', function(event) {
							  if (event.type == 'mouseover') {
								  jQuery(this).css({"background-color":"#e9e9e9","cursor":"pointer"});
							  } else {
								  jQuery(this).css({"background-color":"#ffffff","cursor":"default"});
							  }
							}).click(function(){
								 var table = jQuery('.pagelinks').next();
								 table.toggle();
								 /*if (table.is(":hidden")) {
									 table.slideUp("fast");
								 } else {
									 table.slideDown("fast");
								 }*/
							});
						
					});
				}
			}
			
			function collapseTable2(){
				
				jQuery('#table_title').each(function(){
					jQuery(this).unbind().hover(function(){
						jQuery(this).css({'background-color':'#EBF4FB','cursor':'pointer'})
					},function(){
						jQuery(this).css({'background-color':'#ffffff','cursor':'default'})
					}).click(function(){
						 var table = jQuery('.tablesorter').next();
						 if (table.is(":hidden")) {
							 table.fadeIn('fast');
						 } else {
							 table.fadeOut('fast');
						 }
					});
				});
			}
			
			function moveAddLinkToPagelinks(){
				jQuery('body').find('a').each(function(){
					if( jQuery(this).html().match(/add/gi) ){
						var addClone = jQuery(this).clone();
						//.after('<div class="table_button_bg"><div class="button_tambah_wrapper"><div class="button_tambah"><a href="/smp/action/lkp/field4Bursar/addField4BursarSetup"><span>TAMBAH</span></a></div></div></div>')
						
						
						jQuery('.pagelinks').prepend(addClone);
						jQuery(addClone).wrap('<div class="button_tambah"></div>');
						jQuery(addClone).wrap('<div class="button_tambah_wrapper"></div>');
						jQuery(this).remove();
						//break;
					}
				});
			}
			
			
			function addWidthInBILColumn(){
				var table = jQuery('.pagelinks').next()
				table.find('thead tr th')
					.filter(function(){return ( jQuery(this).eq('0').html().match(/faculty/gi) )? jQuery(this).eq('1') :jQuery(this).eq('0')})
					.css({'width':'1%'});
				/*jQuery('thead tr th', table).eq('0').each(function(){
						jQuery(this).css({'width':'0.5%'});
				});*/
			}
			
			function deleteTableBorder(){
				jQuery('tr.rowHeadContent, tr.tableHeadContent')
					.closest('table')
					//.parents('table:first')
					.attr('border','0')
					//.before('<div id="table_title"><span id="table_title_text">Listing</span><div title="Minimize/Maximize Table" class="ptogtitle"><span/></div></div>')
					//.before(nc.base.htmlPagingPager)
					//.attr('id','tablesorter')
					//.tableTitle('Listing')
					.attr('class','sortablescroll')
					
					;
					
				
					jQuery('.rowBodyContent', '.sortablescroll').each(function(rows){
						if (rows % 2 == 0) jQuery(this).addClass("odd");
					    else jQuery(this).addClass("even");						
					});
					
					jQuery('body').find('td[width=1]').attr('width', '0');
					

					
					//.tablesorter({widgets: ['zebra'],headers:{0:{sorter: false}}});
		
					//collapseTable2();
					
					
				setTimeout(function(){tablerize();},10)
			}
			
			function tablerize(){
				var containerNavigation = "";
				var page = 0;
				jQuery('.tablesorter')
					.tablesorter({widgets: ['zebra']})
					.tablesorterPager({
						container: jQuery("#pager"+containerNavigation),
						page:(page == 0) ? page : parseInt(page)-1
					})
					.tablesorterFilter({
						filterContainer: jQuery("#filter_box","#pager"+containerNavigation),
						filterClearContainer: jQuery("#filter_clear_button","#pager"+containerNavigation),
		                filterCaseSensitive: false
		             });
			}
			
			function deleteRedundantBr(){
				//jQuery('.page_title, .headin').
				jQuery('body br').remove();
				jQuery('table').attr('border', '0');
			}
			
			
			
			function leftAlignTable(){
				var targetx = jQuery('table');
				targetx.each(function(){
					if (jQuery(this).attr('align') == 'center' ){
						jQuery(this).attr('align', '');
					}
				});
			}
			
			function removeCellspacingTableMsg(){
				jQuery('table.msg, table.edrowerbg2').each(function(){
					jQuery(this).attr('cellspacing', '0');
				});
			}
			
			function findubeforeahref(){
				jQuery('a > u').each(function(){
					jQuery(this).prev().remove();
				})
			}
			
			function removeSemicolon(){
				jQuery('.columnBodyContent').replaceText(/:/gi, '');
			}
			
			function logo(){
				
				jQuery('#logo_text')
					.css({'cursor':'pointer'})
					.click(function(){
						nc.gohref(nc.hostname+'/action/main/indexSetup');
					});
				
				//jQuery('#smaller-detail').fadeIn('slow');
				if(nc.people.role.match(/student/gi)){
					jQuery('#smaller-detail')
						.css({'letter-spacing':'-0.4px'});
				}else{
					
				}
			}
			
			
		
			
			
			function chartx(){
				
				   chart = new Highcharts.Chart({
					      chart: {
					         renderTo: 'wrapper_news',
					         defaultSeriesType: 'bar'
					      },
					      title: {
					         text: 'Jantina'
					      },
					      subtitle: {
					         text: 'Source: Wikipedia.org'
					      },
					      xAxis: {
					         categories: ['Africa', 'America', 'Asia'],
					         title: {
					            text: null
					         }
					      },
					      series: [{
						         name: 'Year 1800',
						         data: [107, 31, 635]
						      }, {
						         name: 'Year 1900',
						         data: [133, 156, 947]
						      }, {
						         name: 'Year 2008',
						         data: [973, 914, 4054]
						      }],
					      yAxis: {
					         min: 0,
					         title: {
					            text: 'Population (millions)',
					            align: 'high'
					         }
					      },
					      tooltip: {
					         formatter: function() {
					            return ''+
					                this.series.name +': '+ this.y +' millions';
					         }
					      },
					      plotOptions: {
					         bar: {
					            dataLabels: {
					               enabled: true
					            }
					         }
					      },
					      legend: {
					         layout: 'vertical',
					         align: 'right',
					         verticalAlign: 'top',
					         x: -100,
					         y: 100,
					         borderWidth: 1,
					         backgroundColor: '#FFFFFF'
					      },
					      credits: {
					         enabled: false
					      }
					      
					   });
					   
		
			}
			
			function pieChart(){
				var chart;
					chart = new Highcharts.Chart({
						chart: {
							renderTo: 'wrapper_news',
							plotBackgroundColor: null,
							plotBorderWidth: null,
							plotShadow: false
						},
						title: {
							text: 'Student by Gender'
						},
						tooltip: {
							formatter: function() {
								return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
							}
						},
						plotOptions: {
							pie: {
								allowPointSelect: true,
								cursor: 'pointer',
								dataLabels: {
									enabled: true,
									color: '#000000',
									connectorColor: '#000000',
									formatter: function() {
										return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
									}
								}
							}
						},
					    series: [{
							type: 'pie',
							name: 'Browser share',
							data: [
								['Men',   45.0],
								['Mowen', 55.0]
							]
						}]
					});
			}
			
			function chart(){
				   chart = new Highcharts.Chart({
					      chart: {
					         renderTo: 'wrapper_news',
					         defaultSeriesType: 'spline',
					         marginRight: 10,
					         events: {
					            load: function() {
					   
					               // set up the updating of the chart each second
					               var series = this.series[0];
					               setInterval(function() {
					                  var x = (new Date()).getTime(), // current time
					                     y = Math.random();
					                  series.addPoint([x, y], true, true);
					               }, 1000);
					            }
					         }
					      },
					      title: {
					         text: 'Live random data',
					         style: {
					            margin: '10px 100px 0 0' // center it
					         }
					      },
					      xAxis: {
					         type: 'datetime',
					         tickPixelInterval: 150
					      },
					      yAxis: {
					         title: {
					            text: 'Value'
					         },
					         plotLines: [{
					            value: 0,
					            width: 1,
					            color: '#808080'
					         }]
					      },
					      tooltip: {
					         formatter: function() {
					                   return '<b>'+ this.series.name +'</b><br/>'+
					               Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+ 
					               Highcharts.numberFormat(this.y, 2);
					         }
					      },
					      legend: {
					         enabled: false
					      },
					      exporting: {
					         enabled: false
					      },
					      series: [{
					         name: 'Random data',
					         data: (function() {
					            // generate an array of random data
					            var data = [],
					               time = (new Date()).getTime(),
					               i;
					            for (i = -19; i <= 0; i++) {
					               data.push({
					                  x: time + i * 1000,
					                  y: Math.random()
					               });
					            }
					            return data;
					         })()
					      }]
					   });
					   
		
			}
			
			function ncChart(parameter){
				
			}
			function testChart(){
				nc.chart();
			}
		},
			
		// *** IGNORE THE BELOW*** - it's just there so we can always suffix our final REAL default above with a comma
		ignoremeplease: 'thankyouverymuch'	

} // END nc.project.ejkm




