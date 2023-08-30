const path = require('path');
const env = process.env.UPLOAD_ENV || 'development';
const multerPath = env === 'development' ? './uploads' : process.env.UPLOAD_PATH;
const uploadPath = env === 'development' ? path.join(__dirname, './uploads/') : process.env.UPLOAD_PATH;
module.exports = {multerPath, uploadPath}