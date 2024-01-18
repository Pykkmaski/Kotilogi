export function getFileTableName(targetTableName: string){
    return (
        targetTableName === 'properties' ? 'propertyFiles' : targetTableName === 'propertyEvents' ? 'eventFiles' : null
    );
}