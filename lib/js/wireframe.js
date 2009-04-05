/*
 *
 */


		$(document).ready(function() {
    	$('body').prepend('<div id="wireframe-bar"></div>');
    	
      $("#wireframe-bar").annotatr();
      $("#wireframe-bar").polypage([], { label: 'Show page state' });
		});




