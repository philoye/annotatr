/*  
 *  Annotate 0.1
 * 
 *  Developed by Phil Oye
 *  Copyright (c) 2009 Phil Oye, http://philoye.com/
 *
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 *
 */

 (function($) {
   $.fn.annotatr = function(defaults, opts) {
     $.annotatr.init(defaults,opts,this);
   };

   $.annotatr = {

     options: {
       label_instructions: "Show",
       label_annotations: "Annotations",
       label_hotspots: "Hot spots",
       label_notshown: "(Not shown in the current page state)",
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
      this.buildAnnotatorControls();
      this.buildHotSpotControls();
    },

    buildAnnotatorControls: function(){
      $('#annotatr_controls').prepend('<p>' + this.options.label_instructions + '</p>');
			$('#annotatr_controls ul').append('<li><a href="#" id="annotatr_callout_toggle">'+ this.options.label_annotations + '</li>');
			$('#annotatr_callout_toggle').toggle(
			  function(){
          $(".annotatr_annotation").show();
          $("#annotatr_specification").show();
          $(this).addClass("active");
        },
			  function(){
          $(".annotatr_annotation").hide();
          $("#annotatr_specification").hide();
          $(this).removeClass("active");
        }
			);
    },

    buildHotSpotControls: function(){
			$('#annotatr_controls ul').append('<li><a href="#" id="annotatr_hotspots_toggle">' + this.options.label_hotspots + '</li>');
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
      var target = $(elems).append('<table></table>').children('table');
      
      $('meta[name]').each(function(){
        if ( $.inArray(this.name, $.annotatr.options.metadata_ignore)  == -1) {
          $(target).append('<tr><th>' + $(this).attr("name") + '</th><td>' + $(this).attr("content") + '</td></tr>');
        }

      });
      
    },

    buildSpecificationWrapper: function(){
      $("body").append('<div id="annotatr_specification"></div>')
      $('#annotatr_specification').hide().append('<table id="annotatr_specification_pageinfo"></table>');
      this.addMetadata("#annotatr_specification_pageinfo");
      $('#annotatr_specification').append('<table id="annotatr_specification_table"></table>');
      
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
      var hidden_note = ' <span class="annotatr_notshown">' +this.options.label_notshown + '</span>';

      $('.annotatr_notshown').remove();
      $('.annotatr_callout_hidden').removeClass();;

      $('#annotatr_specification_table tr').each(function(index){
        if ($('#annotatr_annotation_'+(parseInt(index)+1)).parent().is(':hidden')) {
          $(this).addClass('annotatr_callout_hidden');
          $(this).children('td').append(hidden_note);
        }
      });

  	}
	};

})(jQuery);