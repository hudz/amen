


$(document).ready(function(){
	/*jQuery('#qrcode').qrcode({
		text	: "http://localhost:8866/igimsv2/action/security/loginSetup",
		width	: 200,
		height	: 200
	});*/
	
	var heightGlobal = document.body.offsetHeight + 'px';
	$('#globalContainer').css({'height':heightGlobal});
	
	$('#login-overlay').hide();
	var hostname = window.location.protocol + '//' + window.location.hostname + ':' +window.location.port+ '/' + window.location.pathname.split( '/' )[1];
	document.forms[0].username.focus();
	//humanMsg.setup(null,null,null,true);
	// animation
	var animate = false;($.browser.msie) ? ( ($.browser.version > 8) ? true : false ) : true;

	if(animate){
		$('#gso').delay(200).animate({ 'margin-left':'+=30', opacity: '1'}, 150);
		$('#gsm').delay(230).animate({ 'margin-left':'+=30', opacity: '1'}, 150);
		$('#ppl').delay(260).animate({ 'margin-left':'+=30', opacity: '1'}, 150);
		$('#how-to-login').delay(290).animate({ 'margin-left':'+=30', opacity: '1'}, 150);
		$('#bookmark').delay(320).animate({ 'margin-left':'+=30', opacity: '1'}, 150);
		$('#content-login').delay(350).animate({ 'margin-top':'+=30', opacity: '1'}, 250);
		$('.text-entity-reminder').delay(750).animate({opacity: '1'}, 250);
		//$('.logo').delay(400).fadeIn();
		$('#breadcrumb-text').delay(650).fadeIn();
	}else{
		$('#gso').fadeIn(218);
		$('#gsm').fadeIn(218);
		$('#ppl').fadeIn(218);
		$('#how-to-login').css({ 'margin-left':'+30', opacity: '1'}, 150);
		$('#bookmark').css({ 'margin-left':'+30', opacity: '1'}, 150);
		$('#content-login').css({ 'margin-top':'+30', opacity: '1'}, 250);
		//$('.text-entity-reminder').css({opacity: '1'}, 250);
		//$('.logo').fadeIn();
		$('#breadcrumb-text').fadeIn();
	}
	/*$('#slider').s3Slider({
        timeOut: 3000
    });*/
	var url_fwd = queryString("url_fwd");
	if(url_fwd != ""){
		$("#url_fwd").val(unescape(url_fwd));
	}

	$('[name=username], [name=password]').keypress(function(event){
		if ( event.which == 13 ) {
		     event.preventDefault();
		     authenticateLogin(animate, hostname, false);
		   }
	});
	
	$('#bypass').click(function(event){
	    authenticateLogin(animate, hostname, true);
	});
	
	
	$('.login').click(function(e){
		e.preventDefault();
		authenticateLogin(animate, hostname);
	});

	$(window).bind("load", function() {

		//alert(0);
	});

	
	
	
});

function authenticateLogin(animate, hostname, override){
	var username = $('[name=username]').val();
	var password = $('[name=password]').val();
	
	
	if( username != '' && password != '' ){
		humanMsg.displayMsg('log masuk...', false);
		             $.ajax({
					     type   : "POST",
					     url    : hostname + "/page/sso/login_async.jsp",
					     data   : { username: username, password: password },
					     success: function (response) {
					         if (response == 'success') {
					            location.href(nc.hostname + "/security/uicontroller3.jsp?m_cmd=2&cmd=0");
					            
					         } else {
					            //humanMsg.displayMsg('Salah nama pengguna atau katalaluan', false);
					         location.href(nc.hostname + "/page/sso/login_async.jsp");
					         }
					     },
					     error: function () {
					    	 //humanMsg.displayMsg('Maaf, ralat di eJKM, cuba lagi', false);
					    	 location.href(nc.hostname + "/page/sso/login_async.jsp");
					     }
					 });
		         
	}else{
		
		// error throwing
		if( ($('[name=username]').val() == '') && ($('[name=password]').val() == '') ){
			humanMsg.displayMsg('Sila masukkan id pengguna dan kata laluan', true);
		}else if($('[name=username]').val() == ''){
			humanMsg.displayMsg('Sila masukkan id pengguna', true);
			$('[name=username]').focus();
		}else if($('[name=password]').val() == ''){
			humanMsg.displayMsg('Sila masukkan kata laluan', true);
			$('[name=password]').focus();
		}
		
	}
}

function authenticate(animate, hostname, override){
	
	if( ($('[name=username]').val() != '') && ($('[name=password]').val() != '') ){
		$('#login-overlay').animate({  'opacity': '0.7'}, 150);
		humanMsg.displayMsg('Signing In...', false);
		
		if(!override){
		// get status login
		$.getJSON( hostname+"/security/kakitangan/action/loginStatus.jsp",
				{uId : $('[name=username]').val()}
				,function(data){
					
					
					if(data.blocked=='true'){
						humanMsg.displayMsg('Akaun anda telah disekat kerana anda telah mencuba lebih daripada 3 kali, '+
								'Sila hubungi pihak pentadbir sistem untuk maklumat lanjut', false, true);
					}else{
							if(data.login=='true'){
								humanMsg.displayMsg('ID pengguna ini telah digunakan untuk login pada masa ini, ' +
										'Sila hubungi pihak pentadbir sistem sekiranya id pengguna anda telah disalahguna', false, true);
							}else{
								/*$.ajax({
									type: "POST",
									url: hostname+"/security/basic/action/login.jsp",
									data: 'username='+$('[name=username]').val()+'&password='+$('[name=password]').val(),
									statusCode: {
									    404: function() {
									      alert('404 | Oppsa Gangnam Style! File missing');
									    }
									  },
									success: function(msg){
										  
										// If data from ajax response is match with <pre>
										if( msg.match(/<pre>/gi) ){
											var errorThrowed =  'error: ' + jQuery(data).find("pre").html();
											alert(errorThrowed);
										}else{
										  
											if(animate){
												$('#gso').animate({ 'margin-left':'-=30', opacity: '0'}, 150);
												$('#gsm').delay(30).animate({ 'margin-left':'-=30', opacity: '0'}, 150);
												$('#ppl').delay(60).animate({ 'margin-left':'-=30', opacity: '0'}, 150);
												$('#how-to-login').delay(90).animate({ 'margin-left':'-=30', opacity: '0'}, 150);
												$('#bookmark').delay(120).animate({ 'margin-left':'-=30', opacity: '0'}, 150);
												$('#content-login').delay(150).animate({ 'margin-top':'-=30', opacity: '0'}, 250);
												$('#breadcrumb-text, #version').delay(100).fadeOut();
											}
											
											if( msg == 'login.success' ){
												$('#globalContainer').delay(5).fadeOut(250, function(){
													location.href = hostname+"/Permohonan/uicontroller.jsp?m_cmd=2&cmd=12";
												});
												//nc.go(nc.hostname + '/action/main/indexSetup');
											}else if( msg.match(/login.forward/gi) ) {
												//nc.go(msg.split('|')[1]);
												$('#globalContainer').delay(5).fadeOut(250, function(){
													location.href = hostname+"/Permohonan/uicontroller.jsp?m_cmd=2&cmd=12";
												});
												//location.href = hostname+"/action/main/indexSetup";
											}else{
												$('#globalContainer').delay(5).fadeOut(250, function(){
													location.href = hostname+"/Permohonan/uicontroller.jsp?m_cmd=2&cmd=12";
												});
												//location.href = hostname+"/action/main/indexSetup";
												//nc.go(nc.hostname + '/action/main/indexSetup');
											}
										}
										
										
									}
								});
								
								//
								*/
								//humanMsg.displayMsg('Authorized...Getting to main page.', false, true);
								//$('body').fadeOut(218);
								setTimeout(function(){ document.forms[0].submit();}, 1);
								
							}
					}
				});
		}else{
			// bypass login authentication
			//humanMsg.displayMsg('Authorized...Getting to main page.', true);
			//$.ajax
			$('body').fadeOut(218);
			//document.forms[0].submit();
			//setTimeout(function(){document.forms[0].submit();}, 219);
		}
		
	}else{
		
		if( ($('[name=username]').val() == '') && ($('[name=password]').val() == '') ){
			humanMsg.displayMsg('Sila masukkan id pengguna dan kata laluan', true);
		}else if($('[name=username]').val() == ''){
			humanMsg.displayMsg('Sila masukkan id pengguna', true);
			$('[name=username]').focus();
		}else if($('[name=password]').val() == ''){
			humanMsg.displayMsg('Sila masukkan kata laluan', true);
			$('[name=password]').focus();
		}
		
	}
}

function hidediv(id) {
	if (document.getElementById) { 
		document.getElementById(id).style.display = 'none';
	}else {
		
	}
}


function queryString(parameter) { 
	  var loc = location.search.substring(1, location.search.length);
	  var param_value = false;
	  var params = loc.split("&");
	  for (i=0; i<params.length;i++) {
	      param_name = params[i].substring(0,params[i].indexOf('='));
	      if (param_name == parameter) {
	          param_value = params[i].substring(params[i].indexOf('=')+1)
	      }
	  }
	  if (param_value) {
	      return param_value;
	  }
	  else {
	      return false; //Here determine return if no parameter is found
	  }
	}
/*blockster({
	    holder: '#featureRotator_1',
	     rows: 2,
	     cols: 15
	});*/

function forceLogin(){
	document.forms[0].submit();
}
