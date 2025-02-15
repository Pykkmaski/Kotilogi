const z = require('zod');
module.exports.windowSchema = z
  .object({
    windows: z.array().min(1, 'Window data must contain at least one window!'),
  })
  .strip();
