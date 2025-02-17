const z = require('zod');

//Increment this by one when adding fields to the schema.
module.exports.cosmeticRenovationSchemaVersion = 0;

module.exports.CosmeticRenovationTarget = {
  KATTO: 'Katto',
  SEINÄT: 'Seinät',
  LATTIA: 'Lattia',
};

module.exports.cosmeticRenovationSchema = z
  .object({
    targets: z
      .array(z.enum(Object.values(module.exports.CosmeticRenovationTarget)))
      .nonempty()
      //Only allow one of each target in the array.
      .refine(values => new Set(values).size === values.length),
  })
  .strict()
  .transform(payload => (payload._schemaVersion = module.exports.cosmeticRenovationSchemaVersion));
