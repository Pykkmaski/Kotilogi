export function getFileTableName(dataTableName: string){
    switch(dataTableName){
        case 'properties': return 'propertyFiles';
        case 'propertyEvents': return 'eventFiles';
        default: throw new Error('Invalid dataTableName! ' + dataTableName);
    }
}