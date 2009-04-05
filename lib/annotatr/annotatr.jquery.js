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
       label_hotspots: "Hot spots",
       label_notshown: "(Not shown)",
       metadata_include: [],
       metadata_ignore: ["viewport","keywords"]
     },

    init: function(defaults, opts, elems){
      var elems = elems || 'body';
      $.extend(this.options,opts);
			this.buildControlBar(elems);
      this.buildSpecificationWrapper();
			this.createAnnotations();
      this.refreshSpecification();
		},

    buildControlBar: function(elems){
			$(elems).append('<div id="annotatr_controls"><ul></ul></div>');

      $('#annotatr_controls').prepend('<p>' + this.options.label_instructions + '</p>');
			$('#annotatr_controls ul')
			  .append('<li><a href="#" id="annotatr_callout_toggle">'+ this.options.label_callouts + '</li>')
			  .append('<li><a href="#" id="annotatr_specification_toggle">' + this.options.label_specification + '</li>')
			  .append('<li><a href="#" id="annotatr_hotspots_toggle">' + this.options.label_hotspots + '</li>');

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

			$('#annotatr_hotspots_toggle').toggle(
  			function(){
          $(this).addClass("active");
    			$.annotatr.createHotSpots();
        },
  			function(){
          $(this).removeClass("active");
          $('.annotatr_hotspot').removeClass('annotatr_hotspot');
        }
			);
    },

    addMetadata: function(elems){
      var elems = elems || '#annotatr_specification_pageinfo';
      var target = $(elems).append('<dl></dl>').children('dl');
      
      //TODO: filter results by ignoring ones defined in options.
      $('meta[name]').each(function(){
        $(target).append('<dt>' + $(this).attr("name") + '</dt><dd>' + $(this).attr("content") + '</dd>');
      });
      
    },

    buildSpecificationWrapper: function(){
      $("body").append('<div id="annotatr_specification"></div>')
      $('#annotatr_specification').hide().append('<div id="annotatr_specification_pageinfo"></div>');
      this.addMetadata("#annotatr_specification_pageinfo");
      $('#annotatr_specification').append('<table id="annotatr_specification_table"></table>');
      
    },

    buildPageSummary: function(){
      // Insert an element
      // Add page title
      // grab appropriate metadata
      // $('<style media="print"> .annotatr_hotspot{ background-color: inherit !important} </style>').appendTo('head');
    },

    createAnnotations: function(){
      $('.annotatr[title]').each(function(index) {
        if ($(this).css('position') == 'static') {
          $(this).css('position','relative');
        }
        
        var annotation_text = $(this).attr("title"); 
        $(this).removeAttr('title').append('<div class="annotatr_annotation" id="annotatr_annotation_' + (index + 1) + '"><div class="annotatr_callout">' + (index + 1) + '</div><div class="annotatr_text">'+ annotation_text +'</div');

        $('#annotatr_specification_table').append('<tr><th><div class="annotatr_callout">' +(index + 1)+ '</div></th><td>'+ annotation_text + '</td></tr>');

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
    
    createHotSpots: function(){
      //FIXME: This is an ugly way to find the wrapping div.
      selector = "#" + $('#annotatr_controls').parent().attr("id");

      //TODO: Add items that have onclick handler or a not null form action
      $('a[href]')
        .filter(function(){
          return !$(this).parents(selector).length;
        })
        .each(function(){
            // if ($(this).attr('href') != '#') {
              $(this).addClass('annotatr_hotspot');
            // }
          });
    },

  	refreshSpecification: function(){
      var hidden_note = '<span class="annotatr_notshown">' +this.options.label_notshown + '</span>';

      $('.annotatr_notshown').remove();
      $('#annotatr_specification_table tr').each(function(index){
        if ($('#annotatr_annotation_'+(parseInt(index)+1)).parent().is(':hidden')) {
          $(this).children('td').append(hidden_note);
        }
      });

  	}
	};

})(jQuery);