$(document).ready(function(){
	
	/*************************************************************/
	/* Collapse */
	/*************************************************************/

	$('.mod-collapse .collapseContent').css("display","none");
	$('.mod-collapse .nav-toggle').addClass("collapseHide");
	
	$(".mod-collapse h3.nav-toggle").replWith('<a></a>');
	
	$('.mod-collapse h3.nav-toggle').replaceWith(function(){
		return "<a>".$(this).contents()+"</a>";
	});

	$('.mod-collapse .nav-toggle').click(function(){
		var collapse_content_selector = $(this).attr('href');					
 
		var toggle_switch = $(this);
		
		$(collapse_content_selector).slideToggle(function(){
			if($(this).css('display')=='none'){
				toggle_switch.removeClass('collapseShow');
				toggle_switch.addClass('collapseHide');
			}else{
				toggle_switch.removeClass('collapseHide');
				toggle_switch.addClass('collapseShow');
			}
		});
		
		return false
	});	
	
	
	/*************************************************************/
	/* Youtube */
	/*************************************************************/
	$(".mod-youtube").each(function(index, element) {
        $(this).html('<div class="lazyYT" data-youtube-id="'+$(this).data("id")+'" data-ratio="16:9"></div>');
    }); 

	
	/*************************************************************/
	/* Read more */
	/*************************************************************/

	$('.mod-readmore .collapseContent').css("display","none");
	$('.mod-readmore .nav-toggle').addClass("collapseHide");
	
	$(".mod-readmore h3.nav-toggle").replWith('<a></a>');
	
	$('.mod-readmore h3.nav-toggle').replaceWith(function(){
		return "<a>".$(this).contents()+"</a>";
	});

	$('.mod-readmore .nav-toggle').click(function(){
		var collapse_content_selector = $(this).attr('href');					
 
		var toggle_switch = $(this);
		
		$(collapse_content_selector).slideToggle(function(){
			if($(this).css('display')=='none'){
				toggle_switch.removeClass('collapseShow');
				toggle_switch.addClass('collapseHide');
			}else{
				toggle_switch.removeClass('collapseHide');
				toggle_switch.addClass('collapseShow');
			}
		});
		
		return false
	});	
	
	
});

$.fn.replWith = function(replacement) {
	return this.each(function(){
	element = $(this);
	$(this)
		.after(replacement).next()
		.attr('class', element.attr('class')).attr('id',element.attr('id'))
		.attr('href', element.attr('href')).attr('id',element.attr('id'))
		.html(element.html())
		.prev().remove();
	});
};