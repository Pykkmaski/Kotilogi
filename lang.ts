import { BuildingMaterial } from './models/enums/BuildingMaterial';
import { BuildingType } from './models/enums/BuildingType';
import { Color } from './models/enums/Color';
import { HeatingType } from './models/enums/HeatingType';
import { PropertyType } from './models/enums/PropertyType';
import { RoofMaterial } from './models/enums/RoofMaterial';
import { RoofType } from './models/enums/RoofType';
import { YardOwnershipType } from './models/enums/YardOwnershipType';

export const lang = {
  propertyType: {
    title: {
      fi: 'Kiinteistötyyppi',
    },
    [PropertyType.HOUSE]: {
      fi: 'Kiinteistö',
    },
    [PropertyType.APT]: {
      fi: 'Huoneisto',
    },
  },

  buildingType: {
    title: {
      fi: 'Talotyyppi',
    },

    [BuildingType.HOUSE]: {
      fi: 'Omakotitalo',
    },
    [BuildingType.ROWHOUSE]: {
      fi: 'Rivitalo',
      sv: 'Radhus',
      en: 'Row house',
    },
    [BuildingType.PAIRHOUSE]: {
      fi: 'Paritalo',
    },
    [BuildingType.APT]: {
      fi: 'Kerrostalo',
    },
    [BuildingType.SEPT]: {
      fi: 'Erillistalo',
    },
    [BuildingType.SHARE]: {
      fi: 'Puutalo-osake',
    },
    [BuildingType.ABA]: {
      fi: 'Luhtitalo',
    },
    [BuildingType.OTHER]: {
      fi: 'Muu',
    },
  },

  buildingMaterial: {
    title: {
      fi: 'Rakennusmateriaali',
    },

    [BuildingMaterial.BRICK]: {
      fi: 'Tiili',
      en: 'Brick',
    },
    [BuildingMaterial.CONCRETE]: {
      fi: 'Betoni',
      en: 'Concrete',
      sv: 'Betong',
    },
    [BuildingMaterial.LOG]: {
      fi: 'Hirsi',
      en: 'Log',
    },
    [BuildingMaterial.WOOD]: {
      fi: 'Puu',
      en: 'Wood',
      sv: 'Trä',
    },
    [BuildingMaterial.OTHER]: {
      fi: 'Muu',
      en: 'Other',
    },
  },

  heatingType: {
    title: {
      fi: 'Lämmitysjärjestelmä',

      primary: {
        fi: 'Ensisijainen',
      },

      secondary: {
        fi: 'Toissijainen',
      },
    },

    [HeatingType.DISTRICT]: {
      fi: 'Kaukolämpö',
      en: 'District',
    },
    [HeatingType.AIRHEAT]: {
      fi: 'Ilmalämpöpumppu',
    },
    [HeatingType.AIR_TO_WATER]: {
      fi: 'Vesi-ilmalämpöpumppu',
    },
    [HeatingType.ELECTRIC]: {
      fi: 'Sähkö',
      en: 'Electric',
      sv: 'El',
    },
    [HeatingType.FIREPLACE]: {
      fi: 'Takka',
    },
    [HeatingType.GROUND]: {
      fi: 'Maalämpö',
    },
    [HeatingType.OIL]: {
      fi: 'Öljy',
      en: 'Oil',
      sv: 'Olja',
    },
    [HeatingType.OTHER]: {
      fi: 'Muu',
      en: 'Other',
    },
    [HeatingType.NONE]: {
      fi: 'Ei Mitään',
      en: 'None',
    },
  },

  color: {
    title: {
      fi: 'Väri',
    },

    [Color.WHITE]: {
      fi: 'Valkoinen',
      en: 'White',
      sv: 'Vit',
    },
    [Color.BLUE]: {
      fi: 'Sininen',
      en: 'Blue',
      sv: 'Blå',
    },
    [Color.RED]: {
      fi: 'Punainen',
      en: 'Red',
      sv: 'Röd',
    },
    [Color.GREEN]: {
      fi: 'Vihreä',
      en: 'Green',
      sv: 'Grön',
    },
    [Color.YELLOW]: {
      fi: 'Keltainen',
      en: 'Yellow',
      sv: 'Gul',
    },
    [Color.BROWN]: {
      fi: 'Ruskea',
      en: 'Brown',
      sv: 'Brun',
    },
    [Color.BLACK]: {
      fi: 'Musta',
      en: 'Black',
      sv: 'Svart',
    },
    [Color.GRAY]: {
      fi: 'Harmaa',
      en: 'Gray',
      sv: 'Grå',
    },
    [Color.OTHER]: {
      fi: 'Muu',
      en: 'Other',
      sv: 'Annat',
    },
  },

  roofType: {
    title: {
      fi: 'Kattotyyppi',
    },

    [RoofType.FLAT]: {
      fi: 'Tasakatto',
    },
    [RoofType.GABLE]: {
      fi: 'Harjakatto',
      en: 'Gable roof',
      sv: 'Sadeltak',
    },
    [RoofType.SHED]: {
      fi: 'Pulpettikatto',
    },
    [RoofType.OTHER]: {
      fi: 'Muu',
      en: 'Other',
      sv: 'Annat',
    },
  },

  roofMaterial: {
    title: {
      fi: 'Kattomateriaali',
    },

    [RoofMaterial.METAL]: {
      fi: 'Pelti',
      en: 'Metal',
      sv: 'Metall',
    },
    [RoofMaterial.BRICK]: {
      fi: 'Tiili',
      en: 'Brick',
    },
    [RoofMaterial.SHEET]: {
      fi: 'Huopa',
      en: 'Sheet',
      sv: 'Tak',
    },
    [RoofMaterial.OTHER]: {
      fi: 'Muu',
      en: 'Other',
      sv: 'Annat',
    },
  },

  yardOwnershipType: {
    title: {
      fi: 'Tontin omistus',
    },

    [YardOwnershipType.OWNED]: {
      fi: 'Oma',
    },

    [YardOwnershipType.RENT]: {
      fi: 'Vuokra',
    },

    [YardOwnershipType.NONE]: {
      fi: 'Ei Mitään',
    },
  },
};

/**Helper function to get the translation for an enum field. */
export const getTranslation = (
  property: string,
  enumValue: number,
  selectedLang: string = 'fi'
) => {
  const translationObj = lang[property];
  if (!translationObj)
    throw new Error(`Lang configuration object does not contain a property named ${property}!`);

  const translationData = translationObj[enumValue];
  if (!translationData) return `No translation. Value: ${enumValue}`;
  return translationData[selectedLang];
};
