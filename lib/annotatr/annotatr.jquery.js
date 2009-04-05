/*
 *
 * Annotate 0.1
 *
 */

(function($) {

	$.annotatr = {

		init: function(control_selector){
			this.buildControlBar(control_selector);
      this.buildSpecification();
      this.buildSpecificationTable();
		},

    buildSpecification: function(){
      $("body").append('<div id="annotatr_specification"></div>')
      $("#annotatr_specification").hide();
      $('#annotatr_specification').append('<div id="annotatr_specification_pageinfo"></div>');
			$('#annotatr_specification_pageinfo')
			  .append('<p class="description"><strong>Page:</strong> ' + $('title').text() + '</p>')
			  .append('<p class="description"><strong>Description:</strong> ' + $('meta[name=description]').attr("content") + '</p>')
			  .append('<p class="revision"><strong>Revision:</strong> ' + $('meta[name=revision]').attr("content") + '</p>')
			  .append('<p class="date"><strong>Last updated:</strong> ' + $('meta[name=date]').attr("content") + '</p>');
      $('#annotatr_specification').append('<table id="annotatr_specification_table"></table>');
			this.buildAnnotations();
    },

    buildControlBar: function(target){
      target = target || 'body';

			$(target).append('<div id="annotatr_controls"><ul><li class="instructions">Show</li></ul></div>');

			$('#annotatr_controls ul').append('<li><a href="#" id="annotatr_callout_toggle">callouts</li><li><a href="#" id="annotatr_specification_toggle">specification</li>');

			$('#annotatr_callout_toggle').click(function(){
        if ($(".annotatr_annotation").is(':hidden')) {
          $(".annotatr_annotation").show();
          $(this).addClass("active");
        }
        else {
          $(".annotatr_annotation").hide();
          $(this).removeClass("active");
          $("#annotatr_specification").hide();
          $("#annotatr_specification_toggle").removeClass("active");
        }
        return false;
			});

			$('#annotatr_specification_toggle').click(function(){
        if ($("#annotatr_specification").is(':hidden')) {
          $(".annotatr_annotation").show();
          $("#annotatr_specification").show();
          $(this).addClass("active");
          $("#annotatr_callout_toggle").addClass("active");
        }
        else {
          $("#annotatr_specification").hide();
          $(this).removeClass("active");
        }
        return false;
			});
    },

    buildAnnotations: function(){
      // TODO: Filter out those without titles attributes
      $('.annotate[title]').each(function(index) {
        var annotation_text = $(this).attr("title"); 

        $(this).css("position","relative").removeAttr("title").append('<div class="annotatr_annotation"><div class="annotatr_callout">' +(index + 1)+ '</div><div class="annotatr_text">'+ annotation_text +'</div');
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

  	buildSpecificationTable: function(){
      $('#annotatr_specification_table tr').remove();
      var hidden_note = '<br><span class="notshown">not shown in current page state</span>';

      $('.annotatr_annotation').each(function(index) {
        t = $(this).children(".annotatr_text").html();
        if ($(this).parent().is(':hidden')) {
          $('#annotatr_specification_table').append('<tr><th><div class="annotatr_callout_hidden">' +(index + 1)+ '</div></th><td>'+ t + hidden_note + '</td></tr>');
        }
        else {
          $('#annotatr_specification_table').append('<tr><th><div class="annotatr_callout">' +(index + 1)+ '</div></th><td>'+ t + '</td></tr>');
        };
      });
  	}
	};

})(jQuery);