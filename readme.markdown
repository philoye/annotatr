Annotatr
=========

WHAT IS IT?
-----------

Annotatr is a jQuery plugin designed to help you document and explain your HTML mockups. The goal is to use simple and standard HTML markup while ensuring the documentation is *never* confused with the mockup itself.


BASIC USAGE
-----------

Add Annotatr to your site by including the following css and scripts to the head of your document.

    <link rel="stylesheet" href="skins/basic.css" type="text/css" media="screen, projection">
    <!--[if lte IE 7]>
    	<link rel="stylesheet" href="skins/basic_ie7.css" type="text/css" media="screen, projection">
    <![endif]-->
    <!--[if lte IE 6]>
    	<link rel="stylesheet" href="skins/basic_ie6.css" type="text/css" media="screen, projection">
    <![endif]-->
    <link rel="stylesheet" href="skins/basic_print.css" type="text/css" media="print">
    <script type="text/javascript" charset="utf-8" src="lib/jquery.js"></script>
    <script type="text/javascript" charset="utf-8" src="lib/cookie.jquery.js"></script>
    <script type="text/javascript" charset="utf-8" src="lib/annotatr.jquery.js"></script>

You invoke annotatr by calling the function on whichever element you would like the controls added.

    <script type="text/javascript" charset="utf-8">
      $(document).ready(function() {
        $("body").annotatr();
    	});
    </script>

This appends the annotatr controls to the body element. If you pass in a collection, the controls will simply be added to the first item only.

To actually create annotations, simple add title attributes to the elements you want annotated.

ADVANCED USAGE
--------------

There are quite a few options you can pass in to Annotatr to customize its display. These are the options, along with the default values:

    metadata_ignore: ["viewport","keywords"]

This is an array of <meta> tags that are ignored when creating the page summary box. By default we're ignoring keywords and the viewport directive. Any others will be displayed.
  
    annotation_selector: "[title]"

This is a jQuery selector to target which items are used for the callouts. The default finds all items that have a title attribute. You could for example, restrict this to a particular class ".annotate[title]". I do recommend only calling it on a collection that has title tags though.

    label_instructions: "Show",
    label_annotations: "Notes",
    label_hotspots: "What's clickable?",
    label_notshown: "(Not shown in the current page state)",

These four options customize the user interface labels and have no effect on the functionality. 'label_notshown' only appears on the print version for items that happen to be hidden. This is especially useful if you are using the PolyPage plugin to hide elements and want to avoid "orphaned" annotations (more on PolyPage later).
    
    ignore_hotspots_selector: "#pp_options a"

If there are links that you don't want highlighted for the "What's Clickable?" feature, include a jQuery for what to *ignore*. The default value ignores links that PolyPage uses, but you can add to that set.
  
Here's an example of calling Annotatr with several custom options:  

    <script type="text/javascript" charset="utf-8">
      $(document).ready(function() {
        $("body").annotatr(
            {label_instructions: "Mockup Annotations", label_annotations: "Callouts", metadata_ignore: [ "viewport" ] }
          );
    	});
    </script>


TIPS & TRICKS
----------

* Few people seem to take advantage of it, but the meta tag can take any arbitrary key/value pairs. For example, you could use source control revision, last modified date, revision, a project status of some sort, etc. 

* Title attributes *seem* to allow arbitrary HTML. I wouldn't go crazy, but it seems that you can use bold, italic, br, etc., to style the annotation text.


KNOWN ISSUES
----------

* Given that we're inserting elements into your HTML it is extremely difficult to avoid CSS collision. All of Annotatr's styles are namespaced so that it is unlikely to affect your mockup, however, the reverse is not necessarily true. While, I've attempted to reset styles on each Annotatr element, any global styles you write on html elements tables, divs, spans, links, lists, etc. might collide. The best way to avoid any issues is to namespace your css by using classes/ids, or simply edit annotatr css file to override.

* Adding annotations to images is not supported at the moment, the annotation will silently disappear.

* Adding an annotation to a link tag doesn't work exactly right because the callout/annotation picks up the link behaviour/styling, meaning it'll likely be underlined and if you click it and it'll go where the link goes.


MORE INFO
---------
For an example open the index.html file in a web browser.


USING ANNOTATR WITH POLYPAGE
------------

[PolyPage](http://github.com/andykent/polypage/tree/master) is a jQuery plugin that "ease[s] the process of showing multiple page states in HTML mockups." I approached Annotatr such that it can co-exist with PolyPage without any conflicts. 

  * Annotatr comes bundled with the standard [jQuery Cookie plugin](http://plugins.jquery.com/project/Cookie). PolyPage on the other hand comes with a customized version, but Annotatr can use either. But just use one, ok?

  * Annotatr outputs all the annotations when the page is printed with Notes turned on. One nicety is that if an annotated element is not shown for whatever reason (say, if PolyPage hid it), a note is added that the item in question is not shown in the current page state.
  
    To ensure you take advantage of this, you'll need to call PolyPage such that it calls a refresh function in Annotatr each time you update the PolyPage state. Fortunately, it is easier than it sounds, just do this:
  
        <script type="text/javascript" charset="utf-8">
          $(document).ready(function() {
              $('body').bind('pp_stateChange', function(e, state) { 
                $.annotatr.refreshSpecification();
              });
            });
        </script>

  * Make sure you call set the ignore_hotspots_selector to include the PolyPage options links to prevent the state links from getting highlighted when using the "What clickable?" feature:
  
        ignore_hotspots_selector: "#pp_options a"


USING ANNOTATR WITH STATES.JS
------------

[States.js](http://github.com/toolmantim/states.js/tree/master) is a "A simple way of capturing and communicating different states in html+js mockups." In case you are interested in using Annotatr with this other awesome plugin, a few things to keep in mind:

1. Both plugins use the `title` attribute, so you'll need to ensure you don't create an annotation on the same element that defines a state. The easy workaround is to simply create another wrapping div, like so:
  
        <div class="state" title="Logged in">
          <ul title="This list of links is populated by... ">
            ...

2.  Annotatr in its default configuration will create annotations for every element that has a title tag, which in the above case would create an annotation with the text "Logged in". However, there is a option to call Annotatr with a custom selector.
  
    You could restrict Annotatr to only look titles with a particular class:
  
        <div class="state" title="Logged in">
          <ul class="annotation" title="This list of links is populated by... ">
            ...

    So you would call Annotatr like this:
  
        <script type="text/javascript" charset="utf-8">
          $(document).ready(function() {
            $("body").annotatr( { annotation_selector: ".annotation[title]" } )
      		});
        </script>
  
    Which would target only items with class "annotation" and a title tag. Altneratively, you could just ignore any item with class "state":
  
        <script type="text/javascript" charset="utf-8">
          $(document).ready(function() {
            $("body").annotatr( { annotation_selector: "[title]:not(.state)" } )
      		});
        </script>
  
3.  Unfortunately, States.js doesn't currently have the ability to fire a custom event when the state changes, so if you the print, the annotations table won't note which elements are hidden.
  
  
4.  Make sure you call set the ignore_hotspots_selector to include the States selector to prevent the state links from getting highlighted when using the "What clickable?" feature:

        ignore_hotspots_selector: "#state-selector a"

5.  You'll want to update the skin included with Annotatr so that all the controls are visible. A future release will include a skin that does this for you.

  
ACKNOWLEDGEMENTS
------------

As alluded to above, I was inspired to create Annotatr after seeing New Bamboo's [PolyPage](http://github.com/andykent/polypage/tree/master). I borrowed a lot of ideas for how to structure Annotatr from a early version of PolyPage, and for that I owe  thanks.


WHAT'S NEXT?
------------

You tell me. I'm open to suggestions/patches.


LICENSE
------------

This software is licensed under the MIT license.