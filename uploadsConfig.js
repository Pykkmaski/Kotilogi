const env = process.env.UPLOADS_ENVIRONMENT || 'development';
const path = require('path');

var uploadPath;

if(env === 'development'){
    uploadPath = path.relative(__dirname, '/uploads');
}
else if(env === 'production'){
    uploadPath = '/uploads';
}

console.log('Upload path: ' + uploadPath);

module.exports = uploadPath;