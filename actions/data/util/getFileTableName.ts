export function getFileTableName(targetTableName: string){
    return (
        targetTableName === 'properties' ? 'propertyFiles' : 'eventFiles'
    );
}