const bcrypt = require('bcrypt');

module.exports = async function checkPassword(password1, password2){
    return await bcrypt.compare(password1, password2);
}