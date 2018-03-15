export const removeCollectionHeadingLinks = (document: Document): void => {
    const links = Array.from(document.querySelectorAll('.kicker-link>a'));
    links.forEach(link => {
        const heading = link.textContent;
        link.parentElement.textContent = heading;
        // link.parentElement.removeChild(link);
    })
}