const path = require('path');
const env = process.env.UPLOAD_ENV || 'development';
export default env === 'development' ? path.join(process.cwd(), '/uploads/') : process.env.UPLOAD_PATH;
