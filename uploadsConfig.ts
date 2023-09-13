const path = require('path');
const env = process.env.UPLOAD_ENV || 'development';
export const uploadPath =  env === 'development' ? path.join(process.cwd(), '/uploads/') : process.env.UPLOAD_PATH;

const uploadSizeLimit = process.env.UPLOAD_FILESIZE_LIMIT;
export const limit: number = uploadSizeLimit ? parseInt(uploadSizeLimit) : 1024 * 1024 * 10;
