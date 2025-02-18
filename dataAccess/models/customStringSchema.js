const z = require('zod');
module.exports.customStringSchema = z
  .string()
  .nonempty()
  .max(32)
  .trim()
  .transform(value => {
    return value.at(0).toUpperCase() + value.slice(1);
  });
