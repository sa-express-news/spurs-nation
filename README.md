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

There are two processes to build the JS files. The NPM `build` script bundles all of the Spurs Nation code into a `spurs-nation.js` file in a newly created `dist/` directory. The NPM `build-article` command creates two folders in the `dist/` directory; grab the `sn-article/index.js` file to update the article JS in the article design template in the WCM.

## Making Updates ##

### Updating the section ###

Simply open the Spurs Nation site section in the WCM, find whatever freeform you need to change, and replace the old code inside with your new stuff.

### Updating the article template ###

Head to the EN side of the WCM and search `type:articleDesign`. That will list all the article templates - Spurs Nation should be near the top.

The article template is similar to a section in that you can open the design tab and add/tweak freeforms to your heart's content. Note that that the bottom of the page you'll find a freeform with the contents of the article page JS; use the NPM `build-article` command described in the "JavaScript" section above to build this file.

### Updating the number of zones on the page ###

Unfortunately, because our zones are a hack created on the fly via JavaScript, merely adding another freeform/collection/etc. to the page will probably make everything look terrible. Luckily, it's pretty easy to change the code. Open up `ts/sn-landing-page/create-zones.ts` and look for the following segment:

```typescript
export const createZones = (document: Document) => {
    const mainSection = document.getElementsByTagName('section')[0];
    const divs = mainSection.children;

    const zones: HTMLDivElement[] = [createZone(document, 'zone-a'), createZone(document, 'zone-b'), createZone(document, 'zone-c')];

    Array.from(divs).forEach((div, index) => {
        const node = div.parentElement.removeChild(div);
        if (index < 5) {
            zones[0].appendChild(node);
        } else if (index >= 5 && index < 8) {
            zones[1].appendChild(node);
        } else if (index >= 8) {
            zones[2].appendChild(node);
        }
    });

    zones.forEach((zone: HTMLDivElement) => {
        mainSection.appendChild(zone);
    });

}
```

This is a function defined like a variable. It may look like a lot, but check out the `if/else if` block:

```typescript
        if (index < 5) {
            zones[0].appendChild(node);
        } else if (index >= 5 && index < 8) {
            zones[1].appendChild(node);
        } else if (index >= 8) {
            zones[2].appendChild(node);
        }
```

This code essentially says "For every number below 5 (aka 0-4), add things into the first zone. Then, from 5 to 8, add things into the second zone. Add everything else into the last zone."

This is another way of saying:

- There should be five items in the first zone (0-4)
- There should be four items in the second zone (5-8)
- There should be however many items you want in the third zone (8-infinity)

That means we just need to tweak this small code piece to change the number of sections in a given zone. If we wanted six items in the first zone instead of five, we would do this:

```typescript
        if (index < 6) { // This will take 0-5, which is 6
            zones[0].appendChild(node);
        } else if (index >= 6 && index < 9) { // Bump both of these numbers up, since we want same number of zones here
            zones[1].appendChild(node);
        } else if (index >= 9) { // Bump this number up, because 9 is the new threshold instead of 8
            zones[2].appendChild(node);
        }
```

Etc. etc. Now we need to rebuild the landing page code and replace it in the WCM. Open up a terminal at the root of this project and install its dependencies if you haven't yet, using [Yarn](https://yarnpkg.com/) or [NPM](https://www.npmjs.com/).

`yarn` or `npm install`

Run the NPM `build` command to recompile all the landing page TypeScript into one file.

`yarn build` or `npm run build`

Grab the new file at `dist/spurs-nation.js` and open the WCM. Use the query `site:premiummysa AND id:84437`to find the freeform containing the page code. Delete everything between the `<script>` tags and replace it with the contents of the JS file we just created, then republish the freeform.

Finally, open the Spurs Nation site section with the query `site:premiummysa AND id:18493`. Make the modification you accounted for by adding/removing the item(s) in whatever zone you wanted. Republish the site section and you should be good! ...After the WCM cache refreshes, which can take 20 minutes or so.

### Other Changes ###

Other changes to the page should follow a similar workflow: work in the repo, compile TypeScript into JavaScript (if necessary), replace the contents of whatever freeform you need to. Be sure to push your changes back up to this repository when you're done:

```bash
git add .
git commit -m "Description of what you did"
git push origin master
```