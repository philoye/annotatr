/*
 *
 * Annotate 0.1
 *
 */

(function($) {

	$.annotate = {

		init: function(defaults){
			this.buildControlBar();
      this.buildSpecification();
		},

    buildSpecification: function(){
      $('body').append('<div id="annotatr_specification"><div id="annotatr_specification_pageinfo"></div></div>')
      $("#annotatr_specification").hide();
			$('#annotatr_specification_pageinfo')
			  .append('<p class="description"><strong>Page:</strong> ' + $('title').text() + '</p>')
			  .append('<p class="description"><strong>Description:</strong> ' + $('meta[name=description]').attr("content") + '</p>')
			  .append('<p class="revision"><strong>Revision:</strong> ' + $('meta[name=revision]').attr("content") + '</p>')
			  .append('<p class="date"><strong>Last updated:</strong> ' + $('meta[name=date]').attr("content") + '</p>');
      $('#annotatr_specification').append('<table id="annotatr_specification_table"></table>');
			this.buildAnnotations();
    },

    buildControlBar: function(){
			$('#wireframe-bar').append('<div id="annotatr_controls"><ul><li class="instructions">Show</li></ul></div>');

			$('#annotatr_controls ul').append('<li><a href="#" id="annotatr_specification_toggle">specification</li>');
			$('#annotatr_specification_toggle').click(function(){
        $(".annotatr_annotation").toggle();
        $("#annotatr_specification").toggle();
        $(this).toggleClass("active");
        // $(this).text($(this).text() == "Show Specification" ? "Hide Specification" : "Show Specification");
        return false;
			});
    },

    updateAnnotationState: function(){
      // find all annotations
      // iterate over each annotation
        // remove the '(not shown in current state)' text
        // see annotation it is visible
        // if not, add not shown text and change color of callout 
    },

    buildAnnotations: function(){
      // TODO: Filter out those without titles attributes
      $('.annotate').each(function(index) {
        var annotation_text = $(this).attr("title") + " " + $(this).is(':hidden'); 

        $(this).removeClass("annotate").addClass("annotatr_annotated").css("position","relative").removeAttr("title").append('<div class="annotatr_annotation"><div class="annotatr_callout">' +(index + 1)+ '</div><div class="annotatr_text">'+ annotation_text +'</div');

        $('#annotatr_specification_table').append('<tr><th><div class="annotatr_callout">' +(index + 1)+ '</div></th><td>'+annotation_text+'</td></tr>');
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