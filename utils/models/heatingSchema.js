const z = require('zod');

module.exports.HeatingType = {
  KAUKOLÄMPÖ: 'Kaukolämpö',
  SÄHKÖ: 'Sähkö',
  ÖLJY: 'Öljy',
  ILMALÄMPÖPUMPPU: 'Ilmalämpöpumppu',
  VESI_ILMALÄMPÖPUMPPU: 'Vesi-ilmalämpöpumppu',
  MAALÄMPÖ: 'Maalämpö',
  TAKKA: 'Takka',
  PELLETTI: 'Pelletti',
  MUU: 'Muu',
};

module.exports.heatingGenesisSchema = z
  .object({
    heating_types: z
      .array(z.enum(Object.values(module.exports.HeatingType)))
      .nonempty()
      //Do not allow duplicate values.
      .refine(values => new Set(values).size === values.length),
  })
  .transform(result => {
    result._schemaVersion = 0;
    return result;
  });

const heatingTypeSchema = z.enum(module.exports.HeatingType);

module.exports.heatingSchema = z.object({
  old_heating_type: heatingTypeSchema.optional(),
  new_heating_type: heatingTypeSchema,
  heating_center_brand: z.string().optional(),
  heating_center_model: z.string().optional(),
});
