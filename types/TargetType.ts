export enum TargetType {
  LÄMMÖNJAKO = 'Lämmönjako',
  LÄMMITYSMUOTO = 'Lämmitysmuoto',
  ILMANVAIHTO = 'Ilmanvaihto',
  HORMI = 'Hormi',
  IKKUNAT = 'Ikkunat',
  KATTO = 'Katto',
  JULKISIVU = 'Julkisivu',
  ETEINEN = 'Eteinen',
  KEITTIÖ = 'Keittiö',
  WC = 'WC',
  OLOHUONE = 'Olohuone',
  MAKUUHUONE = 'Makuuhuone',
  KODINHOITOHUONE = 'Kodinhoitohuone',
  SALAOJAT = 'Salaojat',
  KÄYTTÖVESIPUTKET = 'Käyttövesiputket',
  VIEMÄRIPUTKET = 'Viemäriputket',
  ERISTYS = 'Eristys',
  SAVUPIIPPU = 'Savupiippu',
  VESIKOURUT = 'Vesikourut',
  SÄHKÖT = 'Sähköt',
  LUKITUS = 'Lukitus',
  RAKENTEET = 'Rakenteet',
  PISTORASIA = 'Pistorasia',
  SÄHKÖKESKUS = 'Sähkökeskus',
  VALOKATKAISIA = 'Valokatkaisia',
  PIIPUNHATTU = 'Piipunhattu',
  SADEVESIKOURUT = 'Sadevesikourut',
  PATTERIT = 'Patterit',
  SOKKELI = 'Sokkeli',
  MUU = 'Muu',
  PALOVAROITTIMET = 'Palovaroittimet',
  ULKOVERHOUS = 'Ulkoverhous',
}

/**Returns the entries from TargetType, that apply to service/maintenance events. */
export const getServiceableTargetTypes = () => {
  const valuesToFilter = [
    'Lämmönjako',
    'Lämmitysmuoto',
    'Ilmanvaihto',
    'Ikkunat',
    'Katto',
    'Salaojat',
    'Käyttövesiputket',
    'Viemäriputket',
    'Eristys',
    'Sähköt',
    'Rakenteet',
    'Muu',
    'Palovaroittimet',
  ];
  return Object.values(TargetType).filter(v => valuesToFilter.includes(v));
};

/**Returns the entries from TargetType, that apply to restoration events. */
export const getRestorableTargetTypes = () => {
  const valuesToFilter = [
    'Lämmönjako',
    'Lämmitysmuoto',
    'Ilmanvaihto',
    'Ikkunat',
    'Katto',
    'Salaojat',
    'Käyttövesiputket',
    'Viemäriputket',
    'Eristys',
    'Sähköt',
    'Lukitus',
    'Muu',
    'Ulkoverhous',
  ];
  return Object.values(TargetType).filter(v => valuesToFilter.includes(v));
};

/**Returns the entries in TargetType, that apply to cosmetic renovations. */
export const getCosmeticTargetTypes = () => {
  const valuesToFilter = [
    'Eteinen',
    'Keittiö',
    'WC',
    'Olohuone',
    'Makuuhuone',
    'Kodinhoitohuone',
    'Muu',
  ];
  return Object.values(TargetType).filter(v => valuesToFilter.includes(v));
};
