import { TargetType } from 'kotilogi-app/types/TargetType';
import { roofKeyTranslations } from './translateRoofKey';
import { heatingKeyTranslations } from './translateHeatingKey';
import { drainageDitchKeyTranslations } from './translateDrainageDitchKey';
import { cosmeticRenovationKeyTranslations } from './translateCosmeticRenovationKey';
import { sewerPipeKeyTranslations } from './translateSewerPipeKey';
import { waterPipeKeyTranslations } from './waterPipeKeyTranslations';

/**Returns a function that translates the key of the data-object associated with a defined event target, into readable format. */
export function getKeyTranslator(target_type: string) {
  switch (target_type) {
    case 'Katto':
      return translate(roofKeyTranslations);

    case 'Lämmitysmuoto':
      return translate(heatingKeyTranslations);

    case 'Salaojat':
      return translate(drainageDitchKeyTranslations);

    case 'WC':
    case 'Olohuone':
    case 'Makuuhuone':
    case 'Kodinhoitohuone':
    case 'Eteinen':
    case 'Keittiö':
      return translate(cosmeticRenovationKeyTranslations);
    case 'Viemäriputket':
      return translate(sewerPipeKeyTranslations);

    case 'Käyttövesiputket':
      return translate(waterPipeKeyTranslations);

    default:
      return (key: string) => key;
  }
}

const translate = (translationsObject: any) => (key: string) => translationsObject[key] || key;
