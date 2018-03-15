const createZone = (document: Document, className: string): HTMLDivElement => {
    const zone = document.createElement('div');
    zone.classList.add('sn-zone');
    zone.classList.add(className);
    return zone;
}

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