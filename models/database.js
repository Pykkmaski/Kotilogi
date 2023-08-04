const eventsTableName = 'property_events';
const propertiesTableName = 'properties';
const eventFilesInfoTableName = 'event_files';
const propertyFilesTableName = 'property_files';
const usersTableName = 'users';

const imageMimeType = 'image/jpeg';

class Database{
    constructor(config){
        this.database = config;
    }

    selectColumnsFromTable(tableName, conditions, ...columns){
        if(typeof(conditions) !== 'Object') throw new Error('Database, selectColumnsFromTable: conditions vairable must be an object!');
        return this.database.select(columns).from(tableName).where(conditions);
    }

    //USERS
    saveUser(user){
        return this.database(usersTableName).insert(user);
    }

    getUserByEmail(email){
        return this.database(usersTableName).where({email}).first();
    }

    updateUserByEmail(email, updatedData){
        return this.database(usersTableName).where({email}).update(updatedData);
    }

    deleteUserByEmail(email){
        return this.database(usersTableName).where({email}).del();
    }

    //EVENT
    saveEvent(event){
        return this.database(eventsTableName).insert(event);
    }

    getEventById(id){
        return this.database(eventsTableName).where({id}).first();
    }

    updateEventById(id, updatedData){
        return this.database(eventsTableName).where({id}).update(updatedData);
    }

    deleteEventById(id){
        return this.database(eventsTableName).where({id}).del();
    }

    //PROPERTY
    saveProperty(property){
        return this.database(propertiesTableName).insert(property);
    }

    getPropertyById(id){
        return this.database(propertiesTableName).where({id}).first();
    }

    updatePropertyById(id, updatedData){
        return this.database(propertiesTableName).where({id}).update(updatedData);
    }

    deleteProperty(id){
        return this.database(propertiesTableName).where({id}).del();
    }

    //PROPERTY IMAGES
    savePropertyImage(info){
        //Saves 
        return this.database(propertyFilesTableName).insert(info);
    }

    getImagesByPropertyId(propertyId){
        //Returns all images for a property.
        return this.database(propertyFilesTableName).where({mime_type: 'image/jpeg'})
    }

    getPropertyIma

}

module.exports = Database;