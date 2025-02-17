const z = require('zod');

module.exports.heatingGenesisSchema = z
  .object({
    heating_types: z.array().nonempty(),
  })
  .transform(result => (result._schemaVersion = 0));
