/*
 *
 * Annotate 0.1
 *
 */

(function($) {

	$.annotate = {

		init: function(defaults){
			this.buildControlBar();
      this.buildPageDescriptor();
			this.findAnnotations();
		},

    buildControlBar: function(){
			$('#wireframe-bar').append('<div id="annotatr_controls"><ul></ul></div>');

			$('#annotatr_controls ul').append('<li class="instructions">Annotations:</li><li><a href="#" id="annotatr_callout_toggle">Show Callouts</li>');
			$('#annotatr_callout_toggle').click(function(){
        $(".annotatr_annotation").toggle();
        $(this).text($(this).text() == "Show Callouts" ? "Hide Callouts" : "Show Callouts");
        return false;
			});

			$('#annotatr_controls ul').append('<li><a href="#" id="annotatr_spec_toggle">Show Specification</li>');
      $('body').append('<table id="annotatr_spec"></table>');
      $("#annotatr_spec").hide();
			$('#annotatr_spec_toggle').click(function(){
        $("#annotatr_pageinfo").toggle();
        $("#annotatr_spec").toggle();
        $(this).text($(this).text() == "Show Specification" ? "Hide Specification" : "Show Specification");
        return false;
			});

			
    },

    buildPageDescriptor: function(){
      $('body').prepend('<div id="annotatr_pageinfo"></div>')
      $("#annotatr_pageinfo").hide();
			$('#annotatr_pageinfo')
			  .append('<h1>' + $('title').text() + '</h1>')
			  .append('<p class="description">' + $('meta[name=description]').attr("content") + '</p>')
			  .append('<p class="revision"><strong>Revision</strong> ' + $('meta[name=revision]').attr("content") + '</p>')
			  .append('<p class="date"><strong>Update</strong> ' + $('meta[name=date]').attr("content") + '</p>');
    },

    findAnnotations: function(){
      // TODO: Filter out those without titles attributes
      $('.annotate').each(function(index) {
        var annotation_text = $(this).attr("title");
        $(this).removeClass("annotate").addClass("annotatr_annotated").css("position","relative").removeAttr("title").append('<div class="annotatr_annotation"><div class="annotatr_callout">' +(index + 1)+ '</div><div class="annotatr_text">'+ annotation_text +'</div');

        $('#annotatr_spec').append('<tr><th><div class="annotatr_callout">' +(index + 1)+ '</div></th><td>'+annotation_text+'</td></tr>');
      });
      
      $('.annotatr_callout').hover(
        // FIXME: More efficient, remove flicker, add delay to remove?
        function(){ 
          $(this).next().show();
          },
        function(){
          $(this).next().hide();
          }
      );

    },

	};
	
	
})(jQuery);