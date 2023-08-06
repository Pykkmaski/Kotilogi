const eventsTableName = 'property_events';
const propertiesTableName = 'properties';
const eventFilesInfoTableName = 'event_files';
const propertyFilesTableName = 'property_files';
const usersTableName = 'users';
const passwordResetCodeTableName = 'password_reset_codes';

const imageMimeType = 'image/jpeg';

const db = require('../dbconfig');

exports.insertIntoTable = async (tableName, data, conflictOptions) => {
    if(!conflictOptions) return await db(tableName).insert(data);
    return await db(tableName).insert(data)
    .onConflict(conflictOptions.columnName)
    .merge(conflictOptions.mergeTargets);
}

exports.getPasswordResetCode = async (email) => {
    return await db(passwordResetCodeTableName).where({user: email}).first();
}

//USERS
exports.saveUser = async (user) => {
    return await db(usersTableName).insert(user);
}

exports.getUserByEmail = async (email) => {
    return await db(usersTableName).where({email}).first();
}

exports.updateUserByEmail = async (email, updatedData) => {
    return await db(usersTableName).where({email}).update(updatedData);
}

exports.deleteUserByEmail = async (email) => {
    return await db(usersTableName).where({email}).del();
}

//EVENT
exports.saveEvent = async (event) => {
    return await db(eventsTableName).insert(event);
}

exports.getEventById = async (id) => {
    return await db(eventsTableName).where({id}).first();
}

exports.updateEventById = async (id, updatedData) => {
    return await db(eventsTableName).where({id}).update(updatedData);
}

exports.deleteEventById = async (id) => {
    return await db(eventsTableName).where({id}).del();
}

//PROPERTY
exports.saveProperty = async (property) => {
    return await db(propertiesTableName).insert(property);
}

exports.getPropertyById = async (id) => {
    return await db(propertiesTableName).where({id}).first();
}

exports.updatePropertyById = async (id, updatedData) => {
    return await db(propertiesTableName).where({id}).update(updatedData);
}

exports.deleteProperty = async(id) => {
    return await db(propertiesTableName).where({id}).del();
}

//PROPERTY IMAGES
exports.savePropertyImage = async (info) => {
    //Saves 
    return await db(propertyFilesTableName).insert(info);
}

exports.getImagesByPropertyId = async (propertyId) => {
    //Returns all images for a property.
    return await db(propertyFilesTableName).where({mime_type: 'image/jpeg'})
}