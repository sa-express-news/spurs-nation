# Spurs Nation #

This repo holds the code used to build the new [Spurs Nation](http://expressnews.com/spurs-nation) site section in the WCM. You can use it to make any tweaks to how the page looks or functions.

## Overview ##

Spurs Nation uses the relatively new [WCM special section template](https://thetower.atlassian.net/wiki/spaces/CORE/pages/155615431/Creating+Special+Projects+in+the+WCM), designed to provide a blank slate for designers and developers.

The page is a combination of freeforms (to load JavaScript/CSS and add custom components, like a box with author photos) and collections to hold content. Annie Millerbernd has already writted [an excellent guide for producing the page](https://docs.google.com/document/d/1klBIdvElm2mCpLDVIDNv62uwOyaled2Agcs2nu8b-s4/edit); this README is geared toward any development tweaks.

## HTML ##

Code for things like the header, footer and author box lives in the `html-partials/` directory. Unfortunately, there's no better way I could find to get it into the WCM than to copy it into whatever freeform corresponding to it.

You can find each freeform by opening the Spurs Nation site section in the EN WCM site.

## Styling/CSS ##

All styling for the Spurs Nation page lives in `css/spurs-nation.css`. There's also a bit of code in `css/spurs-nation-article.css` geared toward articles added to the Spurs Nation hierarchy - i.e. cleaning up slideshows, as they look ugly in the special project article template.

Since we need to support many old browsers, please remember to autoprefix your CSS before updating it in the WCM. This project had to get up and running quick so I never bothered setting up build scripts (PRs welcome), so you can just use [the default settings on this online autoprefixer](https://autoprefixer.github.io/).

## JavaScript ##

Not much JS runs on the Spurs Nation page, but what's there is absolutely critical. When we started this project, the WCM's special project template did not allow for separate zones - every freeform/collection stacks on one another. 

We didn't want a one-column page layout, so we created a script (`create-zones.ts`) that creates three zones - A, B and C - and moves the first x number of freeforms/collections into A, the next x number into B, etc. It's hacky, but it was our only option.

The code is written in [TypeScript](https://www.typescriptlang.org/), a superset of JavaScript. The `.ts` files live in the `ts/` directory, but if you're more comfortable with JavaScript you can write plain JS straight into those files, too.

There are a few other scripts in that folder:

- `add-collection-headings.ts` adds collection headings to collections that don't naturally pull them into the WCM.
- `remove-collection-heading-links.ts` removes _links_ from collections that _do_ normally have headings, because the WCM makes the links link to pages like the local news section.
- `trim-stats-table-heading.ts` just takes the stats.com table we use and changes the heading from "Spurs: Stats" to "Stats."
- `resize-vertical-article-photos.ts` lives in the Spurs Nation article template. It shrinks vertical lead photos, because the WCM currently pulls in small versions of them and stretches them and it looks horrible.

Again, I never set up a good build process here. I copied each of the scripts into `ts/spurs-nation.ts` (along with the actual calls to the functions to run them), then passed that Typescript code through the [Typescript Playground](https://www.typescriptlang.org/play/) to convert it to JS. I then passed the JS through [the Babel REPL](https://babeljs.io/repl/), though it's basic ES5 and you should be fine support-wise without that step.

## Making Updates ##

### Updating the Section ###

Simply open the Spurs Nation site section in the WCM, find whatever freeform you need to change, and replace the old code inside with your new stuff.

### Updating the Article Template ###

Head to the EN side of the WCM and search `type:articleDesign`. That will list all the article templates - Spurs Nation should be near the top.

The article template is similar to a section in that you can open the design tab and add/tweak freeforms to your heart's content.