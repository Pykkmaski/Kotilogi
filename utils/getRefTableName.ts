/**
 * Takes as an argument the name of a file table and returns the associated table of targets the files belong to.
 * @param tableName 
 * @returns 
 */

export function getRefTableName(tableName: Kotilogi.Table): Kotilogi.Table{
    switch(tableName){
        case 'propertyFiles': return 'properties';
        case 'eventFiles': return 'propertyEvents';
        default: throw new Error('getRefTableName: Unsupported tableName! (' + tableName + ')');
    }
}