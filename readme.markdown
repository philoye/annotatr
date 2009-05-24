Annotatr
=========

WHAT IS IT?
-----------

?


WHY MIGHT YOU WANT THIS?
------------------------



BASIC USAGE
-----------

After including the JS file, call it with a CSS-style font stack declaration on the element of choice. Make sure you wrap the entire declaration in quotes.

    $(document).ready(function() {
      $("h1").fontunstack( ' "Gill Sans", "Helvetica Neue", Helvetica, sans-serif ' );
      $("p").fontunstack( ' "obscure font", Palatino, Georgia, Times, "Times New Roman", serif ' ] );
    });

Assuming Gill Sans and Palatino were installed, this would result in:

    <h1 class="set_in_gillsans">Heading</h1>
    <p class="set_in_palatino">This is some text</p>

Notice that we add a prefix (which you can override), remove spaces, and force lowercase to ensure a valid name. With this, we can use CSS to do something useful.

    h1                  { }
    h1.set_in_gillsans  { letter-spacing: .1em;  }
    p                   { line-height: 1.5; }
    p.set_in_georgia    { line-height: 1.6; }
    p.set_in_palatino   { line-height: 1.4; }


TIPS& TRICKS
------------

Be careful with calling FontUnstack more than once. If your selectors overlap, the last one wins and removes and previous font classes. Try calling fontUnstack on containing divs for your baseline font, and then call it on particular elements to override.


ADVANCED USAGE
--------------

There are quite a few options you can pass in to Annotatr to customize its display:


    $(document).ready(function() {
      $("h1").fontunstack( ' Gotham, "Gill Sans", serif ', "rendered_in_" );
    });




ISSUES
----------

* Given that we're inserting elements into your HTML it is extremely difficult to avoid CSS collision. All of Annotatr's styles are namespaced so that it is unlikely to affect your mockup, however, the reverse is not true. While, I've attempted to reset styles on each Annotatr elements, any global styles you write on html elements tables, divs, spans, links, lists, etc. might collide. The best way to avoid any issues is to namespace your css by using classes/ids, or simply edit annotatr css file to override.


MORE INFO
---------
For an example open the index.html file in a web browser.



USING ANNOTATR WITH POLYPAGE
------------

PolyPage version 0.8 or later can be called in such a way that it'll 


ACKNOWLEDGEMENTS
------------


WHAT'S NEXT?
------------

You tell me. I'm open to suggestions/patches.


LICENSE
------------

This software is licensed under the MIT license.