/*
 *
 * Annotate 0.1
 *
 */

(function($) {

	$.annotate = {

		init: function(defaults){
			this.buildWireframeBar();
			this.findAnnotations();
		},

    buildWireframeBar: function(){
			$('#wireframe-bar').append('<div id="annotation_controls"><ul></ul></div>');
			$('#annotation_controls ul').append('<li class="instructions">Annotations:</li><li><a href="#" id="callout-toggle">Show Callouts</li>');
			$('#annotation_controls ul').append('<li><a href="#" id="spec-toggle">Show Specification</li>');
			
      $('body').append('<table id="page-spec"></table>');
			$('#callout-toggle').click(function(){
        $(".annotation").toggle();
        $(this).text($(this).text() == "Show Callouts" ? "Hide Callouts" : "Show Callouts");
        return false;
			});
			$('#spec-toggle').click(function(){
        $("#page-spec").toggle();
        $(this).text($(this).text() == "Show Specification" ? "Hide Specification" : "Show Specification");
        return false;
			});
			
    },

    findAnnotations: function(){
      // TODO: Filter out those without titles attributes
      $('.annotate').each(function(index) {
        var annotation_text = $(this).attr("title");
        $(this).removeClass("annotate").addClass("annotated").removeAttr("title").append('<div class="annotation"><div class="annotation-callout">' +(index + 1)+ '</div><div class="annotation-text">'+ annotation_text +'</div');

        $('#page-spec').append('<tr><td><div class="annotation-callout">' +(index + 1)+ '</div></td><td>'+annotation_text+'</td></tr>');
      });
      
      $('.annotation-callout').mouseover(
        // FIXME: More efficient, remove flicker, add delay to remove?
        function(){ 
          $(".annotation-text").show();
          },
        function(){
          $(".annotation-text").hide();
          }
      );

    },

	};
	
	
})(jQuery);