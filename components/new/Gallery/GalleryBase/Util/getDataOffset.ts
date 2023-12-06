/**
 * Returns the offset for a knex query to return the correct items onto a gallery page.
 * @param pageNumber The current page number
 * @param itemsPerPage How many items are displayed on each page
 */
export default function getDataOffset(pageNumber: number, itemsPerPage: number): number{
    return pageNumber * itemsPerPage;
}