export const trimStatsTableHeading = (document: Document): void => {
    const statsTable = document.querySelector('div.spurs-stats').querySelector('table.shsTable');

    const tableHeading = statsTable.querySelector('td.shsTotDgold');

    tableHeading.textContent = `Stats`;

}