/**
 * Splits the contents of an object array into a 2d array containing arrays only containing items with the 
 * defined property set to the defined value.
 */

export function splitObjectArrayByProperty<T extends object, K = keyof T>(arr: T[], propertyName: keyof K, values: any[]){
    const obj: any = {};
}