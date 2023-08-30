const eventsTableName = 'property_events';
const propertiesTableName = 'properties';
const eventFilesInfoTableName = 'event_files';
const propertyFilesTableName = 'property_files';
const usersTableName = 'users';
const passwordResetCodeTableName = 'password_reset_codes';

const imageMimeType = 'image/jpeg';

const db = require('../dbconfig');

exports.getPasswordResetCode = async (email) => {
    return db(passwordResetCodeTableName).where({user: email}).first();
}

//USERS
exports.saveUser = async (user) => {
    return db(usersTableName).insert(user);
}

exports.getUserByEmail = async (email) => {
    return db(usersTableName).where({email}).first();
}

exports.updateUserByEmail = async (email, updatedData) => {
    return db(usersTableName).where({email}).update(updatedData);
}

