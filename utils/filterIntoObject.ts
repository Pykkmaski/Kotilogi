/**
 * Splits the contents of an object array into a 2d array containing arrays only containing items with the 
 * defined property set to the defined value.
 */

export function filterIntoObject<T extends Record<string, any>, K extends keyof T>(arr: T[], propertyName: K, values: T[K][]): Record<T[K], T[]>{
    const obj = {} as Record<T[K], T[]>;

    for(const val of values){
        if(val in obj) continue;
        obj[val] = arr.filter(item => item[propertyName] === val);
    }

    return obj as Record<T[K], T[]>;
}