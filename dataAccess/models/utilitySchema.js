const z = require('zod');

module.exports.utilitySchemaVersion = 0;

module.exports.UtilityType = {
  VESI: 'Vesi',
  SÄHKÖ: 'Sähkö',
  LÄMMITYS: 'Lämmitys',
};

module.exports.utilitySchema = z
  .object({
    id: z.string().uuid(),
    property_id: z.string().uuid(),
    typeId: z.number().int(),
    unitAmount: z
      //Do this until the reason why the value is NaN in the form, if not inputting anything.
      .number()
      .optional()
      .transform(value => (isNaN(value) ? null : value)),
    monetaryAmount: z.number(),
    date: z.string().date(),
  })
  .transform(value => {
    const { monetaryAmount, unitAmount } = value;
    value.monetaryAmount = monetaryAmount * 100;
    value.unitAmount = unitAmount !== null ? unitAmount * 100 : unitAmount;
    return value;
  });
