/*
 * Modalfy - jQuery plugin for modal dialog
 *
 * Copyright (c) 2016 David Linares
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Version:  1.1
 *
 */

(function ($) {
	
	var methods = {
		show : function() { 
			element = $(this);
		  	element.addClass("in");
			$("body").addClass("modalfy-open");
			$(".modalfy-backdrop").addClass("in");
		  
		  	element.find(".modalfy-close").click(function(){
				element.modalfy("hide");	
				return false
			})
			$(".modalfy").click(function(e){
				var $clickedTag = $(e.target);
				if($clickedTag.hasClass('modalfy') ) {
        			element.modalfy("hide");	
    			}
			})
		},
		resize : function(width,height) {
			$(".modalfy-dialog").width(width);
			$(".modalfy-dialog").height(height);
		},
		hide : function() { 
			$("body").removeClass("modalfy-open");
			$(this).removeClass("in");
			$(".modalfy-backdrop").removeClass("in");
		},
		ajax : function(url,callback) { 
			$("#modalfy-ajax .modalfy-body").html("Loading...");
			console.log("v3");
			$.ajax({
            	type: 'post',
           	 	url: url,
            	success: function(data) {
					$("#modalfy-ajax .modalfy-body").html(data);
					if(callback){
						eval(callback);
					}
            	}
        	})
		},
		iframe : function(url) {
			$("#modalfy-iframe .modalfy-body #iframe").attr('src',''); 
			$("#modalfy-iframe .modalfy-body #iframe").attr('src',url); 
		}
	}
		
	$.fn.modalfy = function(method,options){
		var opts = $.extend({}, $.fn.modalfy.defaults, options);
		
		if (methods[method]) {
		  	return methods[method].apply(this, Array.prototype.slice.call(arguments,1));
		}else if(typeof method === 'object'||!method) {
		  //Si no se pasa ningÃºn parÃ¡metro o el parÃ¡metro es un objeto de configuraciÃ³n llamamos al inicializador	
		  return methods.init.apply(this, arguments);
		}else{
			$.error('Method ' + method + ' does not exists.');
        }
		
		
	 
	 
	};
 
	// definimos los parÃ¡metros junto con los valores por defecto de la funciÃ³n
	$.fn.modalfy.defaults = {
		// para el fondo un color por defecto
		background: '#a6cdec'
	};
	
})(jQuery);