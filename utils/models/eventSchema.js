const z = require('zod');

module.exports.EventType = {
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
    property_id: z.string().uuid(),
    author_id: z.string().uuid(),
    event_type: z.enum(Object.values(EventType)),
    target_type: z.enum(Object.values(TargetType)),
    date: z.date().default(null),
    description: z.string().optional(),
    data: z.object(),
  })
  .strip();
