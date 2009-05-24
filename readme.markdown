Annotatr
=========

WHAT IS IT?
-----------

Annotatr is a jQuery plugin designed to help you document and explain your HTML mockups. The goal is to use simple and standard HTML markup while ensuring the documentation is *never* confused with the mockup itself.


BASIC USAGE
-----------

Add Annotatr to your site by including the following css and scripts to the <head> of your document.

    <script type="text/javascript" charset="utf-8" src="lib/jquery.js"></script>
    <script type="text/javascript" charset="utf-8" src="lib/cookie.jquery.js"></script>
    <script type="text/javascript" charset="utf-8" src="lib/annotatr.jquery.js"></script>
    <link rel="stylesheet" href="skins/basic.css" type="text/css" media="screen, projection">
    <link rel="stylesheet" href="skins/print.css" type="text/css" media="print">

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

These four options customize the user interface labels and have no effect on the functionality. 'label_notshown' only appears on the print version for items that happen to be hidden. This is especially useful if you are using the PolyPage plugin to hide elements and want to avoid "orphaned" annotations.
    
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

* Few people seem to take advantage of it, but the <meta> tag can take any arbitrary key/value pairs. For example, you could use source control revision, last modified date, revision, a project status of some sort, etc. 

* Title attributes *seem* to allow arbitrary HTML. I wouldn't go crazy, but you it seems that you can use bold, italic, br, etc., to style the annotation text.


KNOWN ISSUES
----------

* Given that we're inserting elements into your HTML it is extremely difficult to avoid CSS collision. All of Annotatr's styles are namespaced so that it is unlikely to affect your mockup, however, the reverse is not necessarily true. While, I've attempted to reset styles on each Annotatr elements, any global styles you write on html elements tables, divs, spans, links, lists, etc. might collide. The best way to avoid any issues is to namespace your css by using classes/ids, or simply edit annotatr css file to override.

* Adding an annotation to an <a> tag doesn't work exactly right because the callout/annotation picks up the link behaviour/styling, meaning it'll likely be underlined and if you click it and it'll go where the link goes.

* I haven't checked any of this in IE 6/7/8. I will likely be sad when I do.


MORE INFO
---------
For an example open the index.html file in a web browser.


ACKNOWLEDGEMENTS
------------

I was inspired to create Annotatr after seeing New Bamboo's PolyPage, a jQuery plugin that "ease[s] the process of showing multiple page states in HTML mockups." I borrowed a lot of ideas for how to structure Annotatr, and for that I owe  thanks.


WHAT'S NEXT?
------------

You tell me. I'm open to suggestions/patches.


LICENSE
------------

This software is licensed under the MIT license.