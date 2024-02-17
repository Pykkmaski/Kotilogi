export const serviceName = 'Kotidok';

export const fileNameTimestampSeparator = '--';

export const MaxProperties = {
    REGULAR: 1,
    PRO: -1,
}

export const Prices = {
    REGULAR: 2000,
    PRO: 4900,
    TAX: 0.24,
}

export const MIN_PASSWORD_LENGTH = 8;

export const ErrorCode = {
    SUCCESS: 0,
    INVALID_USER: 1,
    INVALID_PASSWORD: 2,
    UNEXPECTED: 3,
    PASSWORD_MISMATCH: 4,
    NOT_FOUND: 5,
    EXPIRED: 6,
    INVALID_TRANSFERCODE: 7,
    INVALID_RESETCODE: 8,
    NOT_ALLOWED: 9,
}

export const buildingTypes = [
    'Kerrostalo',
    'Omakotitalo',
    'Rivitalo',
    'Luhtitalo',
    'Erillistalo',
    'Paritalo',
    'Puutalo-osake',
    'Muu'
];

export const yardOwnershipTypes = [
    'Oma',
    'Vuokra',
    'Ei Mitään'
];

export const buildingMaterials = [
    'Betoni',
    'Tiili',
    'Puu',
    'Hirsi',
    'Muu'
];

export const colors = [
    'Valkoinen',
    'Keltainen',
    'Sininen',
    'Punainen',
    'Ruskea',
    'Musta',
    'Muu'
];

export const energyClasses = ['A', 'B', 'C', 'D', 'E', 'F', 'Ei Määritelty'];

const sharedHeatingSystems = [
    'Öljy',
    'Muu'
];

export const primaryHeatingSystems = [
    'Kaukolämpö',
    'Sähkö',
    'Maalämpö',
    'Vesi-Ilmalämpöpumppu',
    ...sharedHeatingSystems,
];

export const secondaryHeatingSystems = [
    'Takka',
    'Ilmalämpöpumppu',
    ...sharedHeatingSystems,
    'Ei Mitään'
];

export const roofMaterials = [
    'Pelti',
    'Huopa',
    'Tiili',
    'Muu'
];

export const roofTypes = [
    'Harjakatto',
    'Pulpettikatto',
    'Tasakatto',
    'Muu'
];

type ColumnType = {
    LABEL: string,
    TYPE: 'number' | 'textarea' | 'text' | 'select',
    OPTIONS?: string[],
}

type PropertyColumnsType = {
    ADDRESS: ColumnType;
    ZIP_CODE: ColumnType;
    YARD_AREA: ColumnType;
    LIVING_AREA: ColumnType;
    OTHER_AREA: ColumnType;
    ROOM_COUNT: ColumnType;
    WC_COUNT: ColumnType;
    FLOOR_COUNT: ColumnType;
    BUILDING_TYPE: ColumnType;
    BUILDING_MATERIAL: ColumnType;
    ROOF_TYPE: ColumnType;
    ROOF_MATERIAL: ColumnType;
    YARD_OWNERSHIP: ColumnType;
    MAIN_IMAGE_ID: ColumnType;
    PRIMARY_HEATING_SYSTEM: ColumnType;
    SECONDARY_HEATING_SYSTEM: ColumnType;
    ENERGY_CLASS: ColumnType;
    COLOR: ColumnType;
    BUILD_YEAR: ColumnType;
};

export const PropertyColumns: PropertyColumnsType = {

    ADDRESS: {
        LABEL: 'title',
        TYPE: 'text',
    },

    ZIP_CODE: {
        LABEL: 'zipCode',
        TYPE: 'text',
    },

    YARD_AREA: {
        LABEL: 'yardArea',
        TYPE: 'number',
    },

    LIVING_AREA: {
        LABEL: 'livingArea',
        TYPE: 'number'
    },

    OTHER_AREA: {
        LABEL: 'otherArea',
        TYPE: 'number'
    },

    ROOM_COUNT: {
        LABEL: 'roomCount',
        TYPE: 'number',
    },

    WC_COUNT: {
        LABEL: 'wcCount',
        TYPE: 'number',
    },

    FLOOR_COUNT: {
        LABEL: 'floorCount',
        TYPE: 'number',
    },

    BUILDING_TYPE: {
        LABEL: 'buildingType',
        TYPE: 'select',
        OPTIONS: buildingTypes,
    },

    BUILDING_MATERIAL: {
        LABEL: 'buildingMaterial',
        TYPE: 'select',
        OPTIONS: buildingMaterials,
    },

    BUILD_YEAR: {
        LABEL: 'buildYear',
        TYPE: 'number',
    },
    
    ROOF_TYPE: {
        LABEL: 'roofType',
        TYPE: 'select',
        OPTIONS: roofTypes,
    },

    ROOF_MATERIAL: {
        LABEL: 'roofMaterial',
        TYPE: 'select',
        OPTIONS: roofMaterials,
    },

    YARD_OWNERSHIP: {
        LABEL: 'yardOwnership',
        TYPE: 'select',
        OPTIONS: yardOwnershipTypes,
    },

    MAIN_IMAGE_ID: {
        LABEL: 'mainImageId',
        TYPE: 'text',
    },

    PRIMARY_HEATING_SYSTEM: {
        LABEL: 'primaryHeatingSystem',
        TYPE: 'select',
        OPTIONS: primaryHeatingSystems,
    },

    SECONDARY_HEATING_SYSTEM: {
        LABEL: 'secondaryHeatingSystem',
        TYPE: 'select',
        OPTIONS: secondaryHeatingSystems,
    },

    ENERGY_CLASS: {
        LABEL: 'energyClass',
        TYPE: 'select',
        OPTIONS: energyClasses,
    },

    COLOR: {
        LABEL: 'color',
        TYPE: 'select',
        OPTIONS: colors,
    },
}



