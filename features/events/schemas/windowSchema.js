const z = require('zod');

module.exports.windowRestorationSchemaVersion = 0;

module.exports.windowSchema = z
  .object({
    u_value: z.number().nonnegative(),
    min_db_rating: z.number().nonnegative().optional(),
    max_db_rating: z.number().nonnegative().optional(),
    quantity: z.number().positive(),
  })
  .strict()
  .refine(value => {
    const isNullOrUndefined = val => val === null || val === undefined;
    //If both the minimum and maximum db ratings are defined, then make sure the minimum is smaller or equal to the maximum.
    return !isNullOrUndefined(value.max_db_rating) && !isNullOrUndefined(value.min_db_rating)
      ? value.min_db_rating <= value.max_db_rating
      : true;
  });

module.exports.windowRestorationSchema = z
  .object({
    windows: z.array(module.exports.windowSchema).nonempty(),
  })
  .strict()
  .transform(result => {
    result._schemaVersion = module.exports.windowRestorationSchemaVersion;
    return result;
  });
