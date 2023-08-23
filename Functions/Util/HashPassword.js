const bcrypt = require('bcrypt');

module.exports = async function HashPassword(password, salt){
    return await bcrypt.hash(password, salt);
}