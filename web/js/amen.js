
var ms = {
          username: '',
          tourPackage: '',
          client	: '',
          tourDate		: '',
          totalGuest: 0,
          totalPrice: 0,
          guest: [ ],
          packagePrice: 0
	}

function msEventListener(){
	//$(' #page_1, #page_2, #page_3').hide();
        
        $('#log_but').on('click', function(e){
                    ms.username = $(this).val();
		$('#page_login').fadeOut(218);
		$('#page_1').fadeIn(218);
		$('#title_page').html("SELECT YOUR TOUR PACKAGE");
		
		e.preventDefault();
	});
        
       
        $('#page_1 input').on('click', function(e){
		ms.tourPackage = $(this).attr('data-package');
		ms.packagePrice = $(this).attr('data-price');
		$('#page_1').fadeOut(218);
		$('#page_2').fadeIn(218);
		$('#title_page').html("INSERT DETAILS BOOKING");
		$('#package_booked').html(ms.tourPackage);
		
		e.preventDefault();
	});
}

$(document).ready(function(){
	
	msEventListener();
	
          $('#page_login').show();
        $('#title_page').html("Andro Middleware Entry Network(AMEN) SYSTEM");
        
	if(ms.totalGuest <= 0){
			$('#checkout').hide();
		}else{
			$('#checkout').show();
		}
	
	
	
	
	

	
	$('#insert_guest').on('click', function(e){
		
		var valid = true;
			
		$('.required').each(function(){
			if( $(this).val() == '' ){
				valid = false;
				$(this).addClass('error');
			}else{
				$(this).removeClass('error');
			}
			
			
		});
		
		if(valid){
			$('#package_guests').empty();
			ms.guest.push({
				full_name : $('#full_name').val()
				, passport : $('#passport').val()
				, age : $('#age').val()
				, gender : $('#gender').val()
			});
			ms.client = $('#client').val();
			ms.tourDate = $('#tourDate').val();
			ms.totalGuest = ms.guest.length ;
			ms.totalPrice = ms.totalGuest * ms.packagePrice;
			
			$.each( ms.guest, function( key, value ) {
				$('#package_guests').append('<li>' + this["full_name"] + ' - ' + this["passport"] + ' <a href="javascript: ;" class="del_guest">x</a></li>');
			});
			
			$('#total_guest').html(ms.totalGuest);
			
			
			
			
			}else{
			}
			
			if(ms.totalGuest <= 0){
				$('#checkout').hide();
			}else{
				$('#checkout').show();
			}
		e.preventDefault();
	});
	
	$(document).on('click', '.del_guest', function(e){
		
		ms.guest.splice( $(this).parent().index(), 1);
		ms.totalGuest = ms.guest.length ;
		ms.totalPrice = ms.totalGuest * ms.packagePrice;
		
		$('#package_guests').empty();
		$.each( ms.guest, function( key, value ) {
			$('#package_guests').append('<li>' + this["full_name"] + ' - ' + this["passport"] + ' <a href="javascript: ;" class="del_guest">x</a></li>');
		});
		$('#total_guest').html(ms.totalGuest);
		if(ms.totalGuest <= 0){
			$('#checkout').hide();
		}else{
			$('#checkout').show();
		}
		e.preventDefault();
	});
	
	
	
	
	$('#page_2 #checkout').on('click', function(e){
		$('#page_2').fadeOut(218);
		$('#page_3').fadeIn(218);
		$('#title_page').html("CHECKOUT");
		
		
		$('#package_checkout').attr('readonly', true).val(ms.tourPackage);
		$('#client_checkout').attr('readonly', true).val(ms.client);
		$('#tourdate_checkout').attr('readonly', true).val(ms.tourDate);
		$('#totalguest_checkout').attr('readonly', true).val(ms.totalGuest);
		$('#totalprice_checkout').html('SAR ' + ms.totalPrice);
		e.preventDefault();
	});
	
	$(document).on('click', '#pay', function(e){
		var overlay = jQuery('<div id="overlay"> </div>');
		overlay.appendTo(document.body)
		$('#thank_you').show();
		e.preventDefault();
	});
	
	$(document).on('click', '#close_thanks', function(e){
			
			$('#thank_you').hide();
			location.reload();
			e.preventDefault();
		});
	
		
});