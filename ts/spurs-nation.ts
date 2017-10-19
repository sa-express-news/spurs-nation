// ZONE CREATION

const createZone = (document: Document, className: string): HTMLDivElement => {
    const zone = document.createElement('div');
    zone.classList.add('sn-zone');
    zone.classList.add(className);
    return zone;
}


const createZones = (document: Document) => {
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

createZones(document);



// Add collection headings

const arrayContainsSubstring = (array: string[], substring: string): boolean => {
    let containsSubstring = false;

    array.forEach((string) => {
        if (string.includes(substring)) containsSubstring = true;
    });

    return containsSubstring;
}

const addFirstChildElement = (targetElement: Element, elementToCreate: HTMLElement): void => {
    targetElement.insertBefore(elementToCreate, targetElement.firstChild);
}

const createHeading = (document: Document, headingText: string): HTMLHeadingElement => {
    const heading = document.createElement('h4');
    heading.classList.add('kicker-link');
    heading.innerText = headingText;
    return heading;
}


const addCollectionHeadings = (document: Document, data: { id: number, heading: string }[]): void => {
    const collections = Array.from(document.getElementsByClassName('hide-rss-link'));

    data.forEach((data) => {
        collections.forEach((collection) => {
            if (arrayContainsSubstring(Array.from(collection.classList), data.id.toString())) {
                const heading = createHeading(document, data.heading);
                addFirstChildElement(collection, heading);
            }
        });
    });
}

const headingsToAdd = [
    { id: 86752, heading: `Writers' Roundtable` },
    { id: 87017, heading: `Photos` },
    { id: 86829, heading: `Spurs Notebook` },
    { id: 86830, heading: `Off-Topic Conversation` },
    { id: 86831, heading: `Our Take` },
    { id: 87081, heading: 'Spurs by the Numbers' }
];

addCollectionHeadings(document, headingsToAdd);


// Remove links from collections that include them in headings


const removeCollectionHeadingLinks = (document: Document): void => {
    const links = Array.from(document.querySelectorAll('.kicker-link>a'));
    links.forEach(link => {
        const heading = link.textContent;
        link.parentElement.textContent = heading;
        // link.parentElement.removeChild(link);
    })
}

removeCollectionHeadingLinks(document);

const trimStatsTableHeading = (document: Document): void => {
    const statsTable = document.querySelector('div.spurs-stats').querySelector('table.shsTable');

    const tableHeading = statsTable.querySelector('td.shsTotDgold');

    tableHeading.textContent = `Stats`;

}

trimStatsTableHeading(document);