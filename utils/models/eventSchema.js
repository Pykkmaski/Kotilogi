const z = require('zod');
const { windowRestorationSchema } = require('./windowSchema');
const { roofSchema } = require('./roofSchema');
const { maintenanceDataSchema } = require('./maintenanceDataSchema');
const { drainageDitchSchema } = require('./drainageDitchSchema');
const { cosmeticRenovationSchema } = require('./cosmeticRenovationSchema');
const { heatingGenesisSchema } = require('./heatingSchema');
module.exports.EventType = {
  GENESIS: 'Genesis',
  PERUSKORJAUS: 'Peruskorjaus',
  HUOLTOTYÖ: 'Huoltotyö',
  PINTAREMONTTI: 'Pintaremontti',
  MUU: 'Muu',
};

module.exports.TargetType = {
  LÄMMÖNJAKO: 'Lämmönjako',
  LÄMMITYSMUOTO: 'Lämmitysmuoto',
  ILMANVAIHTO: 'Ilmanvaihto',
  HORMI: 'Hormi',
  IKKUNAT: 'Ikkunat',
  KATTO: 'Katto',
  JULKISIVU: 'Julkisivu',
  ETEINEN: 'Eteinen',
  KEITTIÖ: 'Keittiö',
  WC: 'WC',
  OLOHUONE: 'Olohuone',
  MAKUUHUONE: 'Makuuhuone',
  KODINHOITOHUONE: 'Kodinhoitohuone',
  SALAOJAT: 'Salaojat',
  KÄYTTÖVESIPUTKET: 'Käyttövesiputket',
  VIEMÄRIPUTKET: 'Viemäriputket',
  ERISTYS: 'Eristys',
  SAVUPIIPPU: 'Savupiippu',
  VESIKOURUT: 'Vesikourut',
  SÄHKÖT: 'Sähköt',
  LUKITUS: 'Lukitus',
  RAKENTEET: 'Rakenteet',
  PISTORASIA: 'Pistorasia',
  SÄHKÖKESKUS: 'Sähkökeskus',
  VALOKATKAISIA: 'Valokatkaisia',
  PIIPUNHATTU: 'Piipunhattu',
  SADEVESIKOURUT: 'Sadevesikourut',
  PATTERIT: 'Patterit',
  SOKKELI: 'Sokkeli',
  MUU: 'Muu',
  PALOVAROITTIMET: 'Palovaroittimet',
  ULKOVERHOUS: 'Ulkoverhous',
};

module.exports.eventSchema = z
  .object({
    id: z.string().uuid().optional(),
    property_id: z.string().uuid(),
    title: z.string().optional(),
    description: z.string().optional(),
    event_type: z.enum(Object.values(module.exports.EventType)),
    target_type: z.enum(Object.values(module.exports.TargetType)),
    labour_expenses: z.number().nonnegative().default(0),
    material_expenses: z.number().nonnegative().default(0),
    date: z.string().date(),
    data: z.any(),
  })
  .strict()
  .transform((payload, ctx) => {
    const { event_type, target_type } = payload;
    let requiredSchema = null;
    switch (event_type) {
      case module.exports.EventType.GENESIS:
        if (target_type === module.exports.TargetType.KATTO) {
          requiredSchema = roofSchema;
        } else if (target_type === module.exports.TargetType.LÄMMITYSMUOTO) {
          requiredSchema = heatingGenesisSchema;
        }
        break;

      case module.exports.EventType.PERUSKORJAUS:
        if (target_type === module.exports.TargetType.KATTO) {
          requiredSchema = roofSchema;
        } else if (target_type === module.exports.TargetType.IKKUNAT) {
          requiredSchema = windowRestorationSchema;
        }
        break;

      case module.exports.EventType.HUOLTOTYÖ:
        requiredSchema = maintenanceDataSchema;
        break;
    }

    if (!requiredSchema) {
      return payload;
    }

    try {
      payload.data = requiredSchema.parse(payload.data);
      return payload;
    } catch (err) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: err.message,
      });
    }
  });
