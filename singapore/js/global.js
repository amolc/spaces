$(document).ready(function(){
	
	var isMobile = false; //initiate as false
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

	$('.fancybox').fancybox({ padding : 0 });
		
	if(!isMobile){	
		$('.parallax').parallax("50%", 0.1); 	
	}
	
		$('.js-activated').dropdownHover().dropdown();

	$('.tipso').tipso({ background : '#12b39a'});
	
	// =======================================
	//	Sticky navigation
	// =======================================
	
	$("#sticky").sticky({
		topSpacing: 0,
	});
	
    var shrinkHeader = 15;
   $(window).scroll(function () {
	  
        var scroll = getCurrentScroll();
        if (scroll >= shrinkHeader) { 
            $('#sticky').addClass('shrink');
			$('#headers').addClass('shrink');
        } else {
            $('#sticky').removeClass('shrink');
			$('#headers').removeClass('shrink');
        }
    });

    function getCurrentScroll() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }

	
	/*----------------------------------------------------*/
	/*	Comments
	/*----------------------------------------------------*/

	var validator = $("#commentsForm").validate({
		errorElement: "div",
		rules: {
			name: "required",
			email: "required",
			comment: "required",
			terms: "required",
            answer: {
				required: true,
				remote: "/php/captcha.php"
			}
    	},
		messages: {
			name: "",
  			email: "",
			comment: "",
			terms: "",
			answer: "Captcha error"
		},
		submitHandler: function() {
			
			var target = document.createElement("div");
			document.body.appendChild(target);
			var spinner = new Spinner(spinner_opts).spin(target);
			var overlay = iosOverlay({text: "Wait...",spinner: spinner});	
			
			$.ajax({
            	type: 'post',
           	 	url: '/blog-comment-go.php',
           	 	data: $('#commentsForm').serialize(),
            	success: function(data) {
					if(data.trim()=="ok"){
						overlay.update({text: "Thanks for submit your comment.",duration: 1000,icon: "/img/check.png"});
						$("#name").val("");
						$("#email").val("");
						$("#comment").val("");
						window.setTimeout(function() {overlay.hide();}, 4000);
					}else{
						overlay.update({text: "Error",duration: 1000,icon: "/img/cross.png"});
						window.setTimeout(function() {overlay.hide();}, 2000);
					};
            	}
        	})
   		}
	});
	
	
	/*----------------------------------------------------*/
	/*	Videos
	/*----------------------------------------------------*/
	
	$(".video").click(function() {
			$.fancybox({
				'padding'		: 0,
				'autoScale'		: false,
				'transitionIn'	: 'none',
				'transitionOut'	: 'none',
				'title'			: this.title,
				'width'			: 680,
				'height'		: 410,
				'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
				'type'			: 'swf',
				'swf'			: {
			   	'wmode'		: 'transparent',
				'allowfullscreen'	: 'true',
				'overlayOpacity' : 0.5,
				'overlayColor' : '#000'
			}
		});
		return false;
	});
	
	$('.fancybox').fancybox({ padding : 0 });
	

	

	
	
	/*----------------------------------------------------*/
	/*	Mobile menu
	/*----------------------------------------------------*/
	
	$('.sliding-menu-open').on('click touchend', function(e) {
		console.log("show");
		e.stopPropagation();
		e.preventDefault();
		$('body').toggleClass('menu-anim');
	});
	
	$('#outer-container, #push-anim-overlay').on('click touchend', function(e) {
		if ($('body').is('.menu-anim')) {
			e.preventDefault();
			$('body').removeClass('menu-anim');
		}
	});
	
	$(window).on('resize', function() {
		$('body').removeClass('menu-anim');
	});
	
	$(window).on('statechange', function() {
		$('body').removeClass('menu-anim');
	});

	
	$('#mobile-menu ul li').each(function(){
		if($(this).find('> ul').length > 0) {
			 $(this).addClass('has-ul');
			 $(this).find('> a').append('<span class="sf-sub-indicator"><i class="fa fa-angle-down"></i></span>');
		}
	});
		
	$('#mobile-menu ul li:has(">ul") > a').click(function(){
		$(this).parent().toggleClass('open');
		$(this).parent().find('> ul').stop(true,true).slideToggle();
		return false;
	});
		
	$('.navbar li.dropdown').each(function(){
		if($(this).find('> ul').length > 0) {
			 $(this).addClass('has-ul');
			 $(this).find('> a').append('<span class="sf-sub-indicator"><i class="fa fa-angle-down"></i></span>');
		}
	});
		

	/*----------------------------------------------------*/
	/*	Search
	/*----------------------------------------------------*/
	
	$( "#searchForm" ).submit(function( event ) {
  		if($("#location").val()==undefined){
			$("#location").parent().addClass("error");
  			event.preventDefault();
			return false
		}
	});
	
	
	/*----------------------------------------------------*/
	/*	Contact
	/*----------------------------------------------------*/

	var validator = $("#contactForm").validate({
		errorElement: "div",
		rules: {
			name: "required",
			email: "required",
			phone: "required",
			message: "required",
			terms: "required"
    	},
		messages: {
			name: "",
  			email: "",
			phone: "",
			message: "",
			terms: ""
		},
		submitHandler: function() {		
			$.ajax({
            	type: 'post',
           	 	url: '/contact-go.php',
           	 	data: $('#contactForm').serialize(),
            	success: function(data) {
					alert(data);
            	}
        	})
   		}
	});
	
		
	
	/*----------------------------------------------------*/
	/*	Book
	/*----------------------------------------------------*/

	var validator = $("#bookForm").validate({
		errorElement: "div",
		rules: {
			check_in: "required"
    	},
		messages: {
		},
		submitHandler: function() {
			var target = document.createElement("div");
			document.body.appendChild(target);
			var spinner = new Spinner(spinner_opts).spin(target);
			var overlay = iosOverlay({text: "Wait...",spinner: spinner});	
			
			spaceArr.push(spaceObj);
			ematics("log", "product", "cart", spaceArr);
			$.cookie('spaceArr', spaceArr, { expires: 1, path: '/' });
		
			$.ajax({
            	type: 'post',
           	 	url: '/book-go.php',
           	 	data: $('#bookForm').serialize(),
            	success: function(data) {
					if(data.trim()=="ok"){
						setTimeout(function() { location.href=$("#referer").val(); },1000);
					}else{
						overlay.update({text: "Error",duration: 1000,icon: "/img/cross.png"});
						window.setTimeout(function() {overlay.hide();}, 2000);
					};
            	}
        	})
   		}
	});
	
	$("#bookit").click(function(){
		$("#bookForm").submit();		
		return false
	});
	
	
	/*----------------------------------------------------*/
	/*	Booking
	/*----------------------------------------------------*/

	var validator = $("#bookingForm").validate({
		errorElement: "div",
		rules: {
			name: "required",
			lastname: "required",
			email: "required",
			phone: "required",
			check_in: "required",
			check_out: "required",
			guests: "required",
			terms: "required"
    	},
		messages: {
			terms: ""
		},
		submitHandler: function() {
			var target = document.createElement("div");
			document.body.appendChild(target);
			var spinner = new Spinner(spinner_opts).spin(target);
			var overlay = iosOverlay({text: "Wait...",spinner: spinner});	
			
			var spaceArr = $.cookie('spaceArr');
			ematics("log", "product", "convert", spaceArr);
		
			$.ajax({
            	type: 'post',
           	 	url: '/booking-go.php',
           	 	data: $('#bookingForm').serialize(),
				dataType: 'json',
            	success: function(data) {
					if(data.result=="ok"){
						window.setTimeout(function() {overlay.hide();}, 1000);
						$("#space-container").hide();
						location.href = "/conversion.php";
					}else if(data.result=="payment"){
						location.href = "/pay.php?token=67888765432&tr="+data.transaction_id;
					}else{
						overlay.update({text: "Error",duration: 1000,icon: "/img/cross.png"});
						window.setTimeout(function() {overlay.hide();}, 2000);
					};
            	}
        	})
   		}
	});
	
	
	/*----------------------------------------------------*/
	/*	Booking by subscription
	/*----------------------------------------------------*/

	var validator = $("#bookingsubscriptionForm").validate({
		errorElement: "div",
		rules: {
			check_in: "required",
			duration: "required",
			guests: "required"
    	},
		messages: {
			duration: ""
		},
		submitHandler: function() {
			var target = document.createElement("div");
			document.body.appendChild(target);
			var spinner = new Spinner(spinner_opts).spin(target);
			var overlay = iosOverlay({text: "Wait...",spinner: spinner});	
			$.ajax({
            	type: 'post',
           	 	url: '/bookingsubscription-go.php',
           	 	data: $('#bookingsubscriptionForm').serialize(),
				dataType: 'json',
            	success: function(data) {
					if(data.result=="ok"){
						location.href = "/conversion.php?backto=passport";
					}else if(data.result=="nocredits"){
						overlay.update({text: "You don't have enough credits.",duration: 1000,icon: "/img/cross.png"});
						window.setTimeout(function() {overlay.hide();}, 2000);
					}else{
						overlay.update({text: "Error",duration: 1000,icon: "/img/cross.png"});
						window.setTimeout(function() {overlay.hide();}, 2000);
					};
            	}
        	})
   		}
	});
	

	

	
	
	
	/*----------------------------------------------------*/
	/*	Proposal confirm
	/*----------------------------------------------------*/

	var validator = $("#proposalForm").validate({
		errorElement: "div",
		rules: {
    	},
		messages: {
		},
		submitHandler: function() {
			var target = document.createElement("div");
			document.body.appendChild(target);
			var spinner = new Spinner(spinner_opts).spin(target);
			var overlay = iosOverlay({text: "Wait...",spinner: spinner});	
			$.ajax({
            	type: 'post',
           	 	url: '/proposal-go.php?_=' + new Date().getTime(),
           	 	data: $('#proposalForm').serialize(),
				dataType: 'json',
            	success: function(data) {
					if(data.result=="ok"){
						setTimeout(function() { location.href="/bookings"; },1000);
					}else{
						overlay.update({text: "Error",duration: 1000,icon: "/img/cross.png"});
						window.setTimeout(function() {overlay.hide();}, 2000);
					};
            	}
        	})
   		}
	});



	// =======================================
	// Newsletter
	// =======================================
	
	$("#newsletter-sent").click(function(){
		
		var target = document.createElement("div");
		document.body.appendChild(target);
		var spinner = new Spinner(spinner_opts).spin(target);
		var overlay = iosOverlay({text: "Wait...",spinner: spinner});	
		
		$.ajax({
            type: 'post',
           	url: '/newsletter-go.php',
           	data: $('#newsletter').serialize(),
            success: function(data) {
				if(data.trim()=="ok"){
					ga('send', 'event', 'Newsletter', 'Subscribe', location.href);
					fbq('track', '<Newsletter_suscription>');
					overlay.update({text: "Done!",duration: 1000,icon: "/img/check.png"});
					window.setTimeout(function() {overlay.hide();}, 2000);
				}else{
					overlay.update({text: "Fill your email correctly",duration: 1000,icon: "/img/cross.png"});
					window.setTimeout(function() {overlay.hide();}, 2000);
				};
            }
        })
		
		return false
			
	});
	
	
	/*----------------------------------------------------*/
	// Login
	/*----------------------------------------------------*/
	
	$("#loginForm").submit(function(){
		
		var target = document.createElement("div");
		document.body.appendChild(target);
		var spinner = new Spinner(spinner_opts).spin(target);
		var overlay = iosOverlay({text: "Wait...",spinner: spinner});	
		
		$.ajax({
            type: 'post',
           	url: '/login-go.php',
           	data: $('#loginForm').serialize(),
            success: function(data) {
				if(data.trim()=="ok"){
					overlay.update({text: "Wait...",duration: 2000,icon: "/img/check.png"});
					if($("#referer").val()){
						setTimeout(function() { location.href=$("#referer").val(); },1000);
					}else{
						setTimeout(function() { location.href="/"; },1000);
					}
				}else{
					overlay.update({text: "These credentials do not match our records.",duration: 2000,icon: "/img/cross.png"});
					window.setTimeout(function() {overlay.hide();}, 2000);
				};
            }
        })
		
		return false
			
	});
	
	$("#login").click(function(){
		$("#loginForm").submit();		
		return false
	});
	
	
	/*----------------------------------------------------*/
	// Password
	/*----------------------------------------------------*/
		
	$("#passwordForm").submit(function(){
		
		var target = document.createElement("div");
		document.body.appendChild(target);
		var spinner = new Spinner(spinner_opts).spin(target);
		var overlay = iosOverlay({text: "Wait...",spinner: spinner});	
		
		$.ajax({
            type: 'post',
           	url: '/password-go.php',
           	data: $('#passwordForm').serialize(),
            success: function(data) {
				if(data.trim()=="ok"){
					overlay.update({text: "The link has been sent to your email. Check your inbox.",duration: 2000,icon: "/img/check.png"});
					window.setTimeout(function() {overlay.hide();}, 2000);				
				}else{
					overlay.update({text: "Error",duration: 2000,icon: "/img/cross.png"});
					window.setTimeout(function() {overlay.hide();}, 2000);
				};
            }
        })
		
		return false
			
	});
	
	$("#password").click(function(){
		$("#passwordForm").submit();		
		return false
	});
	
	$("#passwordchangeForm").validate({
		errorElement: "div",
		rules: {
			password: { required: true, minlength: 4 },
			password2: { required: true, equalTo: "#password", minlength: 4 },
			terms: "required"
			},
		messages: {
			password: "Fill new password",
			password2: "Confirm new password",
			terms: "Terms and conditions"
		},
		submitHandler: function() {
		
			var target = document.createElement("div");
			document.body.appendChild(target);
			var spinner = new Spinner(spinner_opts).spin(target);
			var overlay = iosOverlay({text: "Wait...",spinner: spinner});	
		
			$.ajax({
            	type: 'post',
           		url: '/password-change-go.php',
           		data: $('#passwordchangeForm').serialize(),
            	success: function(data) {
					if(data.trim()=="ok"){
						overlay.update({text: "Password changed with success",duration: 2000,icon: "/img/check.png"});
						setTimeout(function() { location.href="/login" },2000);
					}else{
						overlay.update({text: "Error",duration: 2000,icon: "/img/cross.png"});
						window.setTimeout(function() {overlay.hide();}, 2000);
					};
            	}
        	})
        
		}
	});
	
	$("#passwordchange").click(function(){
		$("#passwordchangeForm").submit();		
		return false
	});
	
	
	/*----------------------------------------------------*/
	// Register
	/*----------------------------------------------------*/
		
	$("#signupForm").validate({
		errorElement: "div",
		rules: {
			firstname: "required",
			lastname: "required",
  			email:  { required: true, email: true },
			password: { required: true, minlength: 6 },
			pass: { required: true, minlength: 6, equalTo: "#password" },
			terms: "required"
		},
		messages: {
			firstname: "",
			lastname: "",
  			email: "",
			password: "",
			pass: "",
			terms: ""
		},
		submitHandler: function() {
			
			var target = document.createElement("div");
			document.body.appendChild(target);
			var spinner = new Spinner(spinner_opts).spin(target);
			var overlay = iosOverlay({text: "Wait...",spinner: spinner});	
			
			$.ajax({
            	type: 'post',
           		url: '/signup-go.php',
           		data: $('#signupForm').serialize(),
				dataType: 'json',
            	success: function(data) {
					if(data.result=="ok"){
						ga('send', 'event', 'SignUp', 'Submit');
						fbq('track', '<Sign_up>');
						overlay.update({text: "Wait...",duration: 2000,icon: "/img/check.png"});
						setTimeout(function() { location.href=$("#referer").val(); },1000);
					}else if(data.result=="exist"){
						overlay.update({text: "Your account already exist. Please reset your password to login.",duration: 2000,icon: "/img/cross.png"});
						window.setTimeout(function() {overlay.hide();}, 4000);
					}else{
						overlay.update({text: "Error",duration: 2000,icon: "/img/cross.png"});
						window.setTimeout(function() {overlay.hide();}, 2000);
					}
            	}
        	})
        
		}
	});
	
	
	/*----------------------------------------------------*/
	// Modal Login
	/*----------------------------------------------------*/
	
	$("#modalLogin").submit(function(){
		$.ajax({
            type: 'post',
           	url: '/login-go.php',
           	data: $('#modalLogin').serialize(),
            success: function(data) {
				if(data.trim()=="ok"){
					$("#modal_login").oz_modal("hide");
					location.reload();
				}else{
					$("#modal_login").oz_modal("hide");
				};
            }
        })
		return false
	});
	
	
	
	/*----------------------------------------------------*/
	// Rent out
	/*----------------------------------------------------*/
		
	// $("#rentoutForm").validate({
	// 	errorElement: "div",
	// 	rules: {
	// 		name: "required",
	// 		company: "required",
  	// 		email:  { required: true, email: true },
	// 		phone: { required: true, minlength: 6 }
	// 	},
	// 	messages: {
	// 		name: "",
	// 		company: "",
  	// 		email: "",
	// 		phone: ""
	// 	},
	// 	submitHandler: function() {
			
	// 		var target = document.createElement("div");
	// 		document.body.appendChild(target);
	// 		var spinner = new Spinner(spinner_opts).spin(target);
	// 		var overlay = iosOverlay({text: "Wait...",spinner: spinner});	
			
	// 		$.ajax({
    //         	type: 'post',
    //        		url: '/rentout-go.php',
    //        		data: $('#rentoutForm').serialize(),
	// 			dataType: 'json',
    //         	success: function(data) {
	// 				if(data.result=="ok"){
	// 					ga('send', 'event', 'Inquiry', 'Rent out your space', location.href);
	// 					fbq('track', '<Rent_out_your_space>');
	// 					overlay.update({text: "Thank you for your interest in FlySpaces. We'll contact you shortly.",duration: 2000,icon: "/img/check.png"});
	// 					setTimeout(function() { location.href="/"; },8000);
	// 				}else{
	// 					overlay.update({text: "Error",duration: 2000,icon: "/img/cross.png"});
	// 					window.setTimeout(function() {overlay.hide();}, 2000);
	// 				}
    //         	}
    //     	})
        
	// 	}
	// });
			
	
	/*----------------------------------------------------*/
	// Profile User data
	/*----------------------------------------------------*/
	
	$("#profileForm").submit(function(){
		
		var target = document.createElement("div");
		document.body.appendChild(target);
		var spinner = new Spinner(spinner_opts).spin(target);
		var overlay = iosOverlay({text: "Espera...",spinner: spinner});	
		
		$.ajax({
            type: 'post',
           	url: '/profile-go.php',
           	data: $('#profileForm').serialize(),
            success: function(data) {
				if(data.trim()=="ok"){
					overlay.update({text: "Datos modificados correctamente",duration: 2000,icon: "/img/check.png"});
					window.setTimeout(function() {overlay.hide();}, 2000);
				}else{
					overlay.update({text: "Error en el proceso",duration: 2000,icon: "/img/cross.png"});
					window.setTimeout(function() {overlay.hide();}, 2000);
				};
            }
        })
		
		return false
			
	});



	/*----------------------------------------------------*/
	/*	Back To Top Button
	/*----------------------------------------------------*/
	
	function totop_button(d){
		var c=$("#backtotop");
		c.removeClass("off on");
		if(d==="on"){
			c.addClass("on")
		}else{
			c.addClass("off")
		}
	}
	
	function backButtonShowHide(){
		$(window).scroll(
			function(){
				var a=$(this).scrollTop();
				var f=$(this).height();
				var e;
				if(a>0){
					e=a+f/2
				}else{
					e=1
				}
				//console.log(e);
				if(e<500){
					totop_button("off")
				}else{
					totop_button("on")
				}
			}
			)
		}
		
		function backToTop(){
			$(document).on("click","#backtotop",function(a){
				a.preventDefault();
				$("body,html").animate({scrollTop:0},400,"linear")}
			)}
	
	backButtonShowHide();
	backToTop();
		 
	$('#backtotop a').click(function(){
		$('html, body').animate({scrollTop:0}, scrollSpeed); 
		return false; 
	}); 
					
});


/*----------------------------------------------------*/
/*	Spinner
/*----------------------------------------------------*/

var spinner_opts = {
	lines: 13, // The number of lines to draw
	length: 11, // The length of each line
	width: 5, // The line thickness
	radius: 17, // The radius of the inner circle
	corners: 1, // Corner roundness (0..1)
	rotate: 0, // The rotation offset
	color: '#FFF', // #rgb or #rrggbb
	speed: 1, // Rounds per second
	trail: 60, // Afterglow percentage
	shadow: false, // Whether to render a shadow
	hwaccel: false, // Whether to use hardware acceleration
	className: 'spinner', // The CSS class to assign to the spinner
	zIndex: 2e9, // The z-index (defaults to 2000000000)
	top: 'auto', // Top position relative to parent in px
	left: 'auto' // Left position relative to parent in px
};

function HoverWatcher(selector){
  this.hovering = false;
  var self = this; 

  this.isHoveringOver = function() { 
    return self.hovering; 
  } 

    $(selector).hover(function() { 
      self.hovering = true; 
    }, function() { 
      self.hovering = false; 
    }) 
} 







equalheight = function(container){

var currentTallest = 0,
     currentRowStart = 0,
     rowDivs = new Array(),
     $el,
     topPosition = 0;
 $(container).each(function() {

   $el = $(this);
   $($el).height('auto')
   topPostion = $el.position().top;

   if (currentRowStart != topPostion) {
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
     rowDivs.length = 0; // empty the array
     currentRowStart = topPostion;
     currentTallest = $el.height();
     rowDivs.push($el);
   } else {
     rowDivs.push($el);
     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
  }
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }
 });
}

$(window).load(function() {
  equalheight('.equalheight');
  equalheight('.equalheight2');
  equalheight('.equalheight3');
});


$(window).resize(function(){
  equalheight('.equalheight');
  equalheight('.equalheight2');
  equalheight('.equalheight3');
});