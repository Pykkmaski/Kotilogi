const eventsTableName = 'property_events';
const propertiesTableName = 'properties';
const eventFilesInfoTableName = 'event_files';
const propertyFilesTableName = 'property_files';

class Database{
    constructor(config){
        this.database = config;
    }

    //EVENT
    saveEvent(event){
        return this.database(eventsTableName).insert(event);
    }

    loadEvent(id){
        return this.database(eventsTableName).where({id}).first();
    }

    updateEvent(event){
        return this.database(eventsTableName).where({id: event.id}).update(event);
    }

    deleteEvent(id){
        return this.database(eventsTableName).where({id}).del();
    }

    //PROPERTY
    saveProperty(property){
        return this.database(propertiesTableName).insert(property);
    }

    loadProperty(id){
        return this.database(propertiesTableName).where({id}).first();
    }

    updateProperty(property){
        return this.database(propertiesTableName).where({id: property.id}).update(property);
    }

    deleteProperty(id){
        return this.database(propertiesTableName).where({id}).del();
    }

    //PROPERTY IMAGES
    savePropertyImage(info){
        return this.database(propertyFilesTableName).insert(info);
    }
}

module.exports = Database;