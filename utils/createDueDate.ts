/**
 * Creates a due date.
 * @param days The number of days into the future when the date is due. Defaults to 0, due immediately.
 * @returns 
 */
export function createDueDate(days: number = 0){
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + days);
    return dueDate.getTime();
}