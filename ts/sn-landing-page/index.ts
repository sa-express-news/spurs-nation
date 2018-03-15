import { addCollectionHeadings } from './add-collection-headings';
import { createZones } from './create-zones';
import { removeCollectionHeadingLinks } from './remove-collection-heading-links';
import { trimStatsTableHeading } from './trim-stats-table-heading';

createZones(document);
addCollectionHeadings(document);
removeCollectionHeadingLinks(document);
trimStatsTableHeading(document);