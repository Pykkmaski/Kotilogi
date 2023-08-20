const fs = require('fs');
const path = require('path');

function DeleteFile(filename){
    const filepath = path.join(__dirname, `../uploads/${filename}`);
    fs.unlink(filepath, () => console.log('File: ' + filename + ' deleted.'));
}

module.exports = DeleteFile;