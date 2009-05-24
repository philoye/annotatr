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
       metadata_ignore: ["viewport","keywords"],
       annotation_selector: "[title]",
       label_instructions: "Show",
       label_annotations: "Notes",
       label_notshown: "(Not shown in the current page state)",
       label_hotspots: "What's clickable?",
       ignore_hotspots_selector: "#pp_options a"
     },

    init: function(defaults, opts, elems){
      var elems = elems || 'body';

      $.extend(this.options,opts);
			this.buildControlBar(elems);
      this.buildSpecificationWrapper();
			this.createAnnotations();
      this.refreshSpecification();
      
      if ($.cookie('annotatr_callouts') == 'on') {
        $('#annotatr_callout_toggle').trigger('click');
      }
      if ($.cookie('annotatr_hotspots') == 'on') {
        $('#annotatr_hotspots_toggle').trigger('click');
      }
      
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
          $.annotatr.catch_callouts();
          $("#annotatr_specification").show();
          $(this).addClass("active");
          $.cookie('annotatr_callouts', 'on');
        },
			  function(){
          $(".annotatr_annotation").hide();
          $("#annotatr_specification").hide();
          $(this).removeClass("active");
          $.cookie('annotatr_callouts', 'off');
        }
			);
    },

    // This function corrects position of callouts if they are off the canvas
    catch_callouts: function(){
      $(".annotatr_annotation .annotatr_callout").each(function() {

        callout = $(this);
        if (callout.offset().left <= 0) {
          callout.css({"right" : "auto", "left" : "0"});
        } 
        if (callout.offset().top <= 0) {
          callout.css({"top" : "0"});
          callout.next().css({"left" : "0"});
        } 
      });
    },

    buildHotSpotControls: function(){
			$('#annotatr_controls ul').append('<li><a href="#" id="annotatr_hotspots_toggle">' + this.options.label_hotspots + '</li>');
			$('#annotatr_hotspots_toggle').toggle(
  			function(){
          $(this).addClass("active");
    			$.annotatr.createHotSpots();
          $.cookie('annotatr_hotspots', 'on');
        },
  			function(){
          $(this).removeClass("active");
          $('.annotatr_hotspot').removeClass('annotatr_hotspot');
          $.cookie('annotatr_hotspots', 'off');
        }
			);
    },

    addMetadata: function(elems){
      var elems = elems || '#annotatr_specification_pageinfo';
      $('meta[name]').each(function(){
        if ( $.inArray(this.name, $.annotatr.options.metadata_ignore)  == -1) {
          $(elems).append('<tr><th>' + $(this).attr("name") + '</th><td>' + $(this).attr("content") + '</td></tr>');
        }
      });
    },

    buildSpecificationWrapper: function(){
      $("body").append('<div id="annotatr_specification"><div id="annotatr_header">Specification</div></div>')
      $('#annotatr_specification').hide().append('<table id="annotatr_specification_pageinfo"></table>');
      this.addMetadata("#annotatr_specification_pageinfo");
      $('#annotatr_specification').append('<table id="annotatr_specification_table"></table>');
    },

    createAnnotations: function(){
      $(this.options.annotation_selector).each(function(index) {
        var annotation_text = $(this).attr("title"); 

        if ($(this).css('position') == 'static') {
          $(this).css('position','relative');
        }

        $(this).removeAttr('title').append('<div class="annotatr_annotation" id="annotatr_annotation_' + (index + 1) + '"><div class="annotatr_callout">' + (index + 1) + '</div><div class="annotatr_text">'+ annotation_text +'</div');
        $('#annotatr_specification_table').append('<tr><th><div class="annotatr_callout">' +(index + 1)+ '</div></th><td>'+ annotation_text + '</td></tr>');
      });

      $('.annotatr_callout').hover(
        function(){ 
          $(this).next().show();
          },
        function(){
          $(this).next().hide();
          }
      );
    },
    
    createHotSpots: function(){
      var ignore_selector = this.options.ignore_hotspots_selector + ", " + "#annotatr_controls a";
      
      //TODO: Add items that have onclick handler or a not null form action?
      $('a[href][href != #]')
        .not(ignore_selector)
        .each(function(){
          $(this).addClass('annotatr_hotspot');
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