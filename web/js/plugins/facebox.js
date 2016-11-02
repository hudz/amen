/*
 * Facebox (for jQuery)
 * version: 1.2 (05/05/2008)
 * @requires jQuery v1.2 or later
 *
 * Examples at http://famspam.com/facebox/
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2007, 2008 Chris Wanstrath [ chris@ozmm.org ]
 *
 * Usage:
 *  
 *  jQuery(document).ready(function() {
 *    jQuery('a[rel*=facebox]').facebox() 
 *  })
 *
 *  <a href="#terms" rel="facebox">Terms</a>
 *    Loads the #terms div in the box
 *
 *  <a href="terms.html" rel="facebox">Terms</a>
 *    Loads the terms.html page in the box
 *
 *  <a href="terms.png" rel="facebox">Terms</a>
 *    Loads the terms.png image in the box
 *
 *
 *  You can also use it programmatically:
 * 
 *    jQuery.facebox('some html')
 *
 *  The above will open a facebox with "some html" as the content.
 *    
 *    jQuery.facebox(function($) { 
 *      $.get('blah.html', function(data) { $.facebox(data) })
 *    })
 *
 *  The above will show a loading screen before the passed function is called,
 *  allowing for a better ajaxy experience.
 *
 *  The facebox function can also display an ajax page or image:
 *  
 *    jQuery.facebox({ ajax: 'remote.html' })
 *    jQuery.facebox({ image: 'dude.jpg' })
 *
 *  Want to close the facebox?  Trigger the 'close.facebox' document event:
 *
 *    jQuery(document).trigger('close.facebox')
 *
 *  Facebox also has a bunch of other hooks:
 *
 *    loading.facebox
 *    beforeReveal.facebox
 *    reveal.facebox (aliased as 'afterReveal.facebox')
 *    init.facebox
 *
 *  Simply bind a function to any of these hooks:
 *
 *   $(document).bind('reveal.facebox', function() { ...stuff to do after the facebox and contents are revealed... })
 *
 *  Modified by Hudz
 *  Added option for suit SMP
 */
(function($) {
  $.facebox = function(data, klass, titleValue) {
    $.facebox.loading();

    if (data.ajax) fillFaceboxFromAjax(data.ajax,klass);
    else if (data.image) fillFaceboxFromImage(data.image);
    else if (data.div) fillFaceboxFromHref(data.div);
    else if ($.isFunction(data)) data.call($)
    else $.facebox.reveal(data, klass);
  }

  /*
   * Public, $.facebox methods
   */
 var pathArray = window.location.pathname.split( '/' );
  var path = pathArray[1];
	
  $.extend($.facebox, {
    settings: {
		    opacity      : 0,
		    overlay      : true,
			modal        : false,
			selfPath	 : '',
			loadingImage : '/'+path+'/images/loading.gif',
			closeImage   : '/'+path+'/images/closelabel.gif',
			closeElement : '<span style="float:right;"><img id="close_popup" src="/'+path+'/images/common/closePopup2.gif" title="close" class="close_image" /></span>',
			okButton	 : '<span class="button"><button id="button_close" class="close" onclick="jQuery.facebox.close()" type="button" >OK</button></span>',
			confirmButton: '<span class="button"><button id="button_close" type="button" class="accept" >OK</button></span><span class="button"><button id="button_close" type="button" class="reject">CANCEL</button></span>',
			imageTypes   : [ 'png', 'jpg', 'jpeg', 'gif' ],
			title		 : null,
			closeable	 : true,
			closeOK      : false,
			confirmed    : false,
			popout       : false,
			popup        : false,
			foot         : true,
			titleColor	 : '',
			draggable    : true,
			callback     : '',
			interceptAjax: '',
			faceboxAjaxMsg: '',
			autoClose	 : false,
			error	   	 : '',
			t1			 : 0,
			t2			 : 0,
			xlocation 	 : '',
			closeButton	 : true,
			width 		 : '',
			type		 : '',
			faceboxHtml  : '\
    <div id="facebox" style="display:none;"> \
      <div class="popup"> \
        <table> \
          <tbody id="facebox-tbody"> \
            <tr> \
				 <td class="body"> \
		 	  <div class="header"> \
                </div> \
                <div class="content"> \
                </div> \
                <div class="footer"> \
					<a href="#" class="close"> \
						<img src="/'+path+'/images/closelabel.gif" title="close" class="close_image" /> \
     				 </a>	\
                </div> \
              </td> \
            </tr> \
          </tbody> \
        </table> \
      </div> \
    </div>'
    },

    loading: function() {
      init()
      if ($('#facebox .loading').length == 1) return true
      showOverlay()
			
			
      $('#facebox .content').empty()
      $('#facebox .body').children().hide().end().
        append('<div class="loading"><img src="'+$.facebox.settings.loadingImage+'"/></div>')
      
      // animate scrollTop
        /*
        $(document).scroll(function(){
        	$(this).animate($(this).css(''), )
        });
        */
      $('#facebox').css({
        top:	getPageScroll()[1] + (getPageHeight() / 10),
        left:	385.5
      }).show()

	  if ($.facebox.settings.modal === false) {
		  $(document).bind('keydown.facebox', function(e) {
	        //if (e.keyCode == 27) $.facebox.close()
	        return true
	      })
		}
      $(document).trigger('loading.facebox')
    },

    reveal: function(data, klass) {
		// time facebox nak reveal itself
		// gunakan bind ni untuk trigger mana function() slepas reveal facebox
    	//nc.out('reveal');
      $(document).trigger('beforeReveal.facebox')
      if (klass) $('#facebox .content').addClass(klass)
      $('#facebox .content').append(data)
			
      $('#facebox .loading').remove()
			
			if(!$.facebox.settings.popout) {
				//fadeIn
				$('#facebox .body').children().fadeIn('fast')
			}else if($.facebox.settings.popout) {
				//show
				$('#facebox .body').children().show()
			}
          // reset 
      
      	  // initial
          $('#facebox .body').css('width','350px');
			// 
			if($.facebox.settings.error) {
					$('#facebox .body').css('width',(($.facebox.settings.width != '')?$.facebox.settings.width:'800px'));
					$('#facebox_overlay .facebox_overlayBG').css('background','#000000');
				
				
			}else{
				if($.facebox.settings.popup){
						$('#facebox .body').css('width',(($.facebox.settings.width != '')?$.facebox.settings.width:'600px'));
					
				}else{
						$('#facebox .body').css('width',(($.facebox.settings.width != '')?$.facebox.settings.width:'350px'));
				}
				$('#facebox_overlay .facebox_overlayBG').css('background','#FFFFFF');
			}
			
			// change #facebox table -> #facebox .body
			// centrekan
			if($.facebox.settings.xlocation != ''){
				$('#facebox').css('left', $.facebox.settings.xlocation);
			}else{
				$('#facebox').css('left', $(window).width() / 2 - ($('#facebox table').width() / 2));
			}
			//nc.out($.facebox.settings.closeOK)
			if($.facebox.settings.closeOK) {
				var closeText = ' <input type="button" value="OK" class="close" onclick="jQuery.facebox.close()"/>';
				
				$('#facebox .footer').html(closeText)
				//$('#facebox .footer').html($.facebox.settings.okButton);
			}
			
			if($.facebox.settings.confirmed) {
				// set setting closeOK to false
				var closeText = '<input type="button" value="OK" class="accept" />&nbsp;&nbsp;<input type="button" value="Cancel" class="reject"/>';
				$('#facebox .footer').html(closeText);
				//$('#facebox .footer').html($.facebox.settings.confirmButton);
			
			}
			
		
			
			//color the title head
			/*$('#facebox .header')
			.css({
				 'background-image':'url("'+nc.hostname+'/images/smp4/table_title.jpg")',
				 'cursor':'move',
				 'padding':'4px 10px 3px 10px',
				 'margin':'0',
				 'border-bottom':'1px solid #E4F1FF',
				 'position':'relative'
    			});*/
			
			/*if($.facebox.settings.type == ''){
				$('#facebox .header')
				.css('background-color','#C0E1FF');
			}else if($.facebox.settings.type == 'info'){
				$('#facebox .header')
				.css('background-color','#C0E1FF');
			}else if($.facebox.settings.type == 'warning'){
				$('#facebox .header')
				.css('background-color','#ffaeb0');
			}else if($.facebox.settings.type == 'success'){
				$('#facebox .header')
				.css('background-color','#C0E1FF');
			}*/
			
			if($.facebox.settings.foot) {
				
			}else if(!$.facebox.settings.foot) {
				var foot = '<a href="#" class="close"></a>';
				$('#facebox .footer').html(foot)
				//$('#facebox .footer').css({margin:0,border:0})
			}
			
			clearTimeout($.facebox.settings.t2)
			clearTimeout($.facebox.settings.t1)
			
			if($.facebox.settings.autoClose) {
				
				$.facebox.settings.t1 = setTimeout(function(){$.facebox.bindEvents()},700);
				$.facebox.settings.t2 = setTimeout(function(){if($('#facebox').is(':hidden')){}else{$.facebox.close()}},4500);
				//nc.out('autoClose'+$.facebox.settings.t1+$.facebox.settings.t2)
			}
			
			if($.facebox.settings.draggable) {
			// bind facebox with jquery draggable	
				$.facebox.dragThis() 
			
			}
			
			if($.facebox.settings.modal) {
				$(document).bind('keydown.facebox', function(e) {
					if($('.close_image', '#facebox')){
						if (e.keyCode == 13 ) {
							// disable close facebox on escape and enter key
							$.facebox.close()
						}
					}else if($('.close', '#facebox')){
						if (e.keyCode == 13 || e.keyCode == 27) {
							// disable close facebox on escape and enter key
							$.facebox.close()
						}
					}
				//return true
				})
			}
			var callThis = $.facebox.settings.callback;
			(callThis == '' || callThis == undefined)?'':callThis();
			// this variable is to init the drag event after facebox.reveal triggered
			$(document).trigger('reveal.facebox').trigger('afterReveal.facebox');
			
			// corner
			nc.alterFacebox();
			
    },
		
		dragThis: function(){
			$(document).bind('reveal.facebox', function(){ 
				$('#facebox').jqDrag('.header');
				/*$('#facebox').draggable(
				{ 	handle:$('#facebox .header'),
					containment: 'document'
					//grid: [50, 20]
				})*/
			})	
			
		},
		
		bindEvents: function() {
		// Remove message if mouse is moved or key is pressed
		$(window)
			.mousemove($.facebox.close)
			.click($.facebox.close)
			.keypress($.facebox.close);
			$(document).trigger('closeOn1stMove');
		},
		
	    close: function() {
			$(window)
			.unbind('mousemove', $.facebox.close)
			.unbind('click', $.facebox.close)
			.unbind('keypress', $.facebox.close)
			
			$(document).trigger('close.facebox')
			return false
	    },
	    closeMove: function() {
			$(window)
			.unbind('mousemove', $.facebox.close)
			.unbind('click', $.facebox.close)
			.unbind('keypress', $.facebox.close)
			
			$(document).trigger('close.facebox')
			return false
	    },

		title: function (data) {
	      if(data == '' || data == undefined) {
	        return $('#facebox .header').html()
	      } else {
	    	  if($.facebox.settings.closeButton){
	    		  $('#facebox .header').html("<h2 style='float:left;'>" + data + "</h2>" + $.facebox.settings.closeElement + "");
	    		  $('#close_popup').hover(function(){
	    				$(this).attr('style','cursor:pointer;')
	    				},function(){
	    					$(this).attr('style','cursor:deafult;')
	    				});
	    			$('#close_popup').click(function(){$.facebox.close()});
	    	  }else{
	    		  $('#facebox .header').html("<h2>" + data + "</span></h2>");
	    	  }
			
	     }
    },
		
	modal: function (data) {
      if(data == '' || data == undefined) {	
        $.facebox.settings.modal = false;
      }
      else {
		$.facebox.settings.modal = data;
      }
    },
		
		closeOK: function(data){
			$.facebox.settings.closeOK = data;
			
		},
		
		confirmed: function(data){
			$.facebox.settings.confirmed = data;
			
		},
		
		foot: function(data){
			$.facebox.settings.foot = data;
			
		},
		
		opacity: function(data){
			$.facebox.settings.opacity = data;
		},
		
		popout: function(data){
			$.facebox.settings.popout = data;
		},
		
		popup: function(data){
			$.facebox.settings.popup = data;
		},
		
		titleColor: function(data){
			$.facebox.settings.titleColor = data;
		},
		
		autoClose: function(data){
			$.facebox.settings.autoClose = data;
		},
		
		draggable: function(data){
			$.facebox.settings.draggable = data;
		},
		
		callback: function(data){
			$.facebox.settings.callback = data;
		},
		
		interceptAjax: function(data){
			$.facebox.settings.interceptAjax = data;
		},
		
		faceboxAjaxMsg: function(data){
			$.facebox.settings.faceboxAjaxMsg = data;
		},
		
		
		error: function(data){
			$.facebox.settings.error = data;
		},
		
		closeButton: function(data){
			$.facebox.settings.closeButton = data;	
		},
		
		width: function(data){
			$.facebox.settings.width = data;	
		},
		xlocation: function(data){
			$.facebox.settings.xlocation = data;	
		},
		type: function(data){
			$.facebox.settings.type = data;	
		}
		
		
		
		
		
  })

  /*
   * Public, $.fn methods
   */

  $.fn.facebox = function(settings) {
    init(settings)

    function clickHandler() {
      $.facebox.loading(true)

      // support for rel="facebox.inline_popup" syntax, to add a class
      // also supports deprecated "facebox[.inline_popup]" syntax
      var klass = this.rel.match(/facebox\[?\.(\w+)\]?/)
      if (klass) klass = klass[1]

      fillFaceboxFromHref(this.href, klass)
      return false
    }

    return this.click(clickHandler)
  }

  /*
   * Private methods
   */

  // called one time to setup facebox on this page
  function init(settings) {
    if ($.facebox.settings.inited) return true
    else $.facebox.settings.inited = true

    $(document).trigger('init.facebox')
    makeCompatible()

    var imageTypes = $.facebox.settings.imageTypes.join('|')
    //$.facebox.settings.imageTypesRegexp = new RegExp('\.' + imageTypes + '$', 'i')
    $.facebox.settings.imageTypesRegexp = new RegExp('\.(' + imageTypes + ')$', 'i')
    
		$.facebox.settings.selfPath = path;
		
    if (settings) $.extend($.facebox.settings, settings)
    $('body').append($.facebox.settings.faceboxHtml)

    var preload = [ new Image(), new Image() ]
    preload[0].src = $.facebox.settings.closeImage
    preload[1].src = $.facebox.settings.loadingImage
    
    /*
    $('#facebox').find('.b:first, .bl, .br, .tl, .tr').each(function() {
      preload.push(new Image())
      preload.slice(-1).src = $(this).css('background-image').replace(/url\((.+)\)/, '$1')
    })
	*/
	
    $('#facebox .close').click($.facebox.close)
		
    $('#facebox .close_image').attr('src', $.facebox.settings.closeImage)
  }
  
  // getPageScroll() by quirksmode.com
  function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;	
    }
    return new Array(xScroll,yScroll) 
  }

  // Adapted from getPageSize() by quirksmode.com
  function getPageHeight() {
    var windowHeight
    if (self.innerHeight) {	// all except Explorer
      windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
      windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
      windowHeight = document.body.clientHeight;
    }	
    return windowHeight
  }

  // Backwards compatibility
  function makeCompatible() {
    var $s = $.facebox.settings

    $s.loadingImage = $s.loading_image || $s.loadingImage
    $s.closeImage = $s.close_image || $s.closeImage
    $s.imageTypes = $s.image_types || $s.imageTypes
    $s.faceboxHtml = $s.facebox_html || $s.faceboxHtml
		$s.title = $s.title || $s.title
		
  }
  
	
  //setup Title Bar
	function setTitleBar(title){
		if (title) {
            //var self = $.facebox;
						//alert($.facebox.settings.title)
            var tb = $("<div class='header'></div>").html("<h2>" + title + "</h2>")
						//alert(tb)
            if ($.facebox.settings.closeable) {
                tb.append(jQuery("<a href='#' class='close'></a>").html($.facebox.settings.closeText))
            }
						//this.getInner().prepend(tb)
						//alert(title)
						$(".header").html("<h2>" + title + "</h2>")
						
						
		}
	}

	
  // Figures out what you want to display and displays it
  // formats are:
  //     div: #id
  //   image: blah.extension
  //    ajax: anything else
  function fillFaceboxFromHref(href, klass) {
    // div
		//alert('div')
    if (href.match(/#/)) {
			//alert('div')
      var url    = window.location.href.split('#')[0]
      var target = href.replace(url,'')
      // fix bug on developer 
      if (target == '#') return
      //$.facebox.reveal($(target).clone().show(), klass)
  	  //$.facebox.reveal($(target).show(), klass)
      // fix bug frm github
      $.facebox.reveal($(target).show().replaceWith("<div id='facebox_moved'></div>"), klass)
		
			
    // image
    } else if (href.match($.facebox.settings.imageTypesRegexp)) {
			//alert('image')
      fillFaceboxFromImage(href, klass)
			
    // ajax
    } else {
			//alert('ajax')
      fillFaceboxFromAjax(href, klass)
			
    }
  }

  function fillFaceboxFromImage(href, klass) {
    var image = new Image()
    image.onload = function() {
      $.facebox.reveal('<div class="image"><img src="' + image.src + '" /></div>', klass)
    }
    image.src = href
  }

  function fillFaceboxFromAjax(href, klass) {
		// modified by hudz
		$.ajax({
	              type: "GET",
	              url: href,
	              data: klass,
				  			success: function(msg){
				  		  	msg = $.trim(msg)
			
									//if(msg.match(/404/gi)){
										//if page not found
										
										//fillFaceboxFromHref(href, klass)
				  				//}else if(msg.match(/500/gi)){
										//if page error
										
									//	fillFaceboxFromHref(href, klass)
									//}else{
				  		  	
				  		  				$.facebox.settings.faceboxAjaxMsg = msg;
				  		  				var interceptAjax = $.facebox.settings.interceptAjax;
										//(interceptAjax == '' || interceptAjax == undefined)?'':function(){interceptAjax();msg = $.facebox.settings.faceboxAjaxMsg;}
				  		  				(interceptAjax == '' || interceptAjax == undefined)?'':interceptAjax();
				  		  				msg = $.facebox.settings.faceboxAjaxMsg;
										$.facebox.reveal(msg, klass)
										
										//alert('a')
										 $(document).trigger('afterAjax.facebox')
//										/$.facebox.settings.callback
										var callThis = $.facebox.settings.callback;
										(callThis == '' || callThis == undefined)?'':callThis();
									//}
								},
							error : function(ob,msg,exe){
											//alert(msg)
											jQuery.facebox.title('Error 500')
											jQuery.facebox('The requested file is not found or \n' +msg)
							}
								
	    });
   // $.get(href, function(data) { $.facebox.reveal(data, klass) })
  }

  function skipOverlay() {
    return $.facebox.settings.overlay == false || $.facebox.settings.opacity === null 
  }

  function showOverlay() {
    if (skipOverlay()) return

    if ($('facebox_overlay').length == 0) 
      $("body").append('<div id="facebox_overlay" class="facebox_hide"></div>')

    $('#facebox_overlay').hide().addClass("facebox_overlayBG")
      .css('opacity', $.facebox.settings.opacity)
      .fadeIn(50)
			// .click(function() { $(document).trigger('close.facebox') })
		 if ($.facebox.settings.modal === false) {
        $('#facebox_overlay').click(function() { $(document).trigger('close.facebox') })
      }
    return false
  }

  function hideOverlay() {
    if (skipOverlay()) return

    $('#facebox_overlay').fadeOut(150, function(){
      $("#facebox_overlay").removeClass("facebox_overlayBG")
      $("#facebox_overlay").addClass("facebox_hide") 
      $("#facebox_overlay").remove()
    })
    
    return false
  }

  /*
   * Bindings
   */

  $(document).bind('close.facebox', function() {
    //$(document).unbind('keydown.facebox');
    /*$('#facebox').fadeOut('normal',function() {
     // $('#facebox .content').removeClass().addClass('content')
      if(typeof($('#facebox_moved')) == 'undefined') {
    	  $('#facebox .content').removeClass().addClass('content')
      }else { 
    	  $('#facebox_moved').replaceWith($('#facebox .content').children().hide())
      }
      
      $('#facebox .loading').remove();
      $(document).trigger('facebox.closed');
    });*/
    // force hide
    //if($('#facebox').is(":hidden")){
    	
    //}else{
    	/*$('#facebox').hide('slow','0',function() {
    	     // $('#facebox .content').removeClass().addClass('content')
    	      if(typeof($('#facebox_moved')) == 'undefined') {
    	    	  $('#facebox .content').removeClass().addClass('content')
    	      }else { 
    	    	  $('#facebox_moved').replaceWith($('#facebox .content').children().hide())
    	      }
    	      
    	      $('#facebox .loading').remove();
    	      $(document).trigger('facebox.closed');
    	    });*/
    	$('#facebox').hide();
    	 if(typeof($('#facebox_moved')) == 'undefined') {
	    	  $('#facebox .content').removeClass().addClass('content')
	      }else { 
	    	  $('#facebox_moved').replaceWith($('#facebox .content').children().hide())
	      }
	      
	      $('#facebox .loading').remove();
    //}
    hideOverlay();
  })

})(jQuery);
