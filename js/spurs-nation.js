'use strict';

// ZONE CREATION
var createZone = function createZone(document, className) {
    var zone = document.createElement('div');
    zone.classList.add('sn-zone');
    zone.classList.add(className);
    return zone;
};
var createZones = function createZones(document) {
    var mainSection = document.getElementsByTagName('section')[0];
    var divs = mainSection.children;
    var zones = [createZone(document, 'zone-a'), createZone(document, 'zone-b'), createZone(document, 'zone-c')];
    Array.from(divs).forEach(function (div, index) {
        var node = div.parentElement.removeChild(div);
        if (index < 5) {
            zones[0].appendChild(node);
        } else if (index >= 5 && index < 8) {
            zones[1].appendChild(node);
        } else if (index >= 8) {
            zones[2].appendChild(node);
        }
    });
    zones.forEach(function (zone) {
        mainSection.appendChild(zone);
    });
};
createZones(document);
// Add collection headings
var arrayContainsSubstring = function arrayContainsSubstring(array, substring) {
    var containsSubstring = false;
    array.forEach(function (string) {
        if (string.includes(substring)) containsSubstring = true;
    });
    return containsSubstring;
};
var addFirstChildElement = function addFirstChildElement(targetElement, elementToCreate) {
    targetElement.insertBefore(elementToCreate, targetElement.firstChild);
};
var createHeading = function createHeading(document, headingText) {
    var heading = document.createElement('h4');
    heading.classList.add('kicker-link');
    heading.innerText = headingText;
    return heading;
};
var addCollectionHeadings = function addCollectionHeadings(document, data) {
    var collections = Array.from(document.getElementsByClassName('hide-rss-link'));
    data.forEach(function (data) {
        collections.forEach(function (collection) {
            if (arrayContainsSubstring(Array.from(collection.classList), data.id.toString())) {
                var heading = createHeading(document, data.heading);
                addFirstChildElement(collection, heading);
            }
        });
    });
};
var headingsToAdd = [{ id: 87097, heading: "Writers' Roundtable" }, { id: 87017, heading: "Photos" }, { id: 87164, heading: "Spurs Notebook" }, { id: 87161, heading: "Off-Topic Conversation" }, { id: 87094, heading: "Our Take" }, { id: 87081, heading: 'Spurs by the Numbers' }];
addCollectionHeadings(document, headingsToAdd);
// Remove links from collections that include them in headings
var removeCollectionHeadingLinks = function removeCollectionHeadingLinks(document) {
    var links = Array.from(document.querySelectorAll('.kicker-link>a'));
    links.forEach(function (link) {
        var heading = link.textContent;
        link.parentElement.textContent = heading;
        // link.parentElement.removeChild(link);
    });
};
removeCollectionHeadingLinks(document);
var trimStatsTableHeading = function trimStatsTableHeading(document) {
    var statsTable = document.querySelector('div.spurs-stats').querySelector('table.shsTable');
    var tableHeading = statsTable.querySelector('td.shsTotDgold');
    tableHeading.textContent = "Stats";
};
trimStatsTableHeading(document);