/**
 * Returns the offset for a knex query to return the correct items onto a gallery page.
 * @param pageNumber 
 * @param itemsPerPage 
 */
export default function getDataOffset(pageNumber: number, itemsPerPage: number): number{
    return pageNumber * itemsPerPage;
}