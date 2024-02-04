'use client';
/**
 * Returns a date object from a provided string.
 * @param {string} timestamp The string from which to create a date.
 * @returns {Date} A date object of the timestamp.
 */

export default function stringToDate(timestamp: string): string | null{
    if(!timestamp || timestamp.length === 0) return null;

    return new Date(parseInt(timestamp)).toLocaleDateString('fi-FI');
}