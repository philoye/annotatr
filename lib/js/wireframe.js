/*
 *
 */


		$(document).ready(function() {
    	$('body').prepend('<div id="wireframe-bar"></div>');
    	
			$.annotatr.init('#wireframe-bar');
      $("#wireframe-bar").polypage([], { label: 'Show page states' });
		});




