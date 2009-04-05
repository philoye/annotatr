/*
 *
 * Annotate 0.1
 *
 */

 (function($) {
   $.fn.annotatr = function(defaults, opts) {
     $.annotatr.init(defaults,opts,this);
   };

   $.annotatr = {

     options: {
       label_instructions: "Show",
       label_callouts: "Callouts",
       label_specification: "Specification",
       label_notshown: "(Not shown)",
       metadata_header_include: [],
       metadata_spec_ignore: ["viewport","keywords"]
     },

    init: function(defaults, opts, elems){
      var elems = elems || 'body';
      $.extend(this.options,opts);
			this.buildControlBar(elems);
      this.buildSpecification();
      this.buildSpecificationTable();
			this.buildAnnotations();
		},

    buildControlBar: function(elems){
			$(elems).append('<div id="annotatr_controls"><ul></ul></div>');

      $('#annotatr_controls').prepend('<p>' + this.options.label_instructions + '</p>');
			$('#annotatr_controls ul').append('<li><a href="#" id="annotatr_callout_toggle">'+ this.options.label_callouts + '</li>');
			$('#annotatr_controls ul').append('<li><a href="#" id="annotatr_specification_toggle">' + this.options.label_specification + '</li>');

			$('#annotatr_callout_toggle').toggle(
			  function(){
          $(".annotatr_annotation").show();
          $(this).addClass("active");
        },
			  function(){
          $(".annotatr_annotation").hide();
          $(this).removeClass("active");
          $("#annotatr_specification").hide();
          $("#annotatr_specification_toggle").removeClass("active");
        }
			);

			$('#annotatr_specification_toggle').toggle(
  			function(){
          $(".annotatr_annotation").show();
          $("#annotatr_specification").show();
          $(this).addClass("active");
          $("#annotatr_callout_toggle").addClass("active");
        },
  			function(){
          $("#annotatr_specification").hide();
          $(this).removeClass("active");
        }
			);
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
    },

    buildHeader: function(){
      $('<style media="print"> body {font-size: 12pt} </style>').appendTo('head');
    },

    buildAnnotations: function(){
      // TODO: Filter out those without titles attributes
      $('.annotate[title]').each(function(index) {
        var annotation_text = $(this).attr("title"); 

        $(this).css("position","relative").append('<div class="annotatr_annotation"><div class="annotatr_callout">' +(index + 1)+ '</div><div class="annotatr_text">'+ annotation_text +'</div');
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