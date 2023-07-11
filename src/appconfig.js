const routeApiPortion = 'api';
const routePropertyPortion = 'properties';
const routeEventPortion = 'events';
const routeImagesPortion = 'images';
const routeFilesPortion = 'files';

module.exports = {
    tokenStorageKey : 'digikoti_token',
    userStorageKey: 'digikoti_user',
    serviceName : 'Kotilogi',

    serverTimeoutMessage : {
        "fi" : "Palvelin ei vastaa. Yritä hetken kuluttua uudelleen.",
    },

    heatingTypeNames: {
        ilmaLampoPumppu: 'ilmalampopumppu',
        maalampo: 'maalampo',
        takka: 'takka',
        kaukolampo: 'kaukolampo',
        vilp: 'vilp',
    },

    buildingMaterials:{
        "wood": {
            "fi": "Puu",
            "en": "Wood",
        },
        "concrete":{
            "fi": "Betoni",
            "en": "Concrete"
        },
    },

    routeImages: `/${routeApiPortion}/${routeImagesPortion}`,
    routeFiles: `/${routeApiPortion}/${routeFilesPortion}`,
    routeProperties: `/${routeApiPortion}/${routePropertyPortion}`,
    routeEvents: `/${routeApiPortion}/${routeEventPortion}`,
    routePropertyImages: `/${routeApiPortion}/${routeImagesPortion}/${routePropertyPortion}`,
    routeEventImages: `/${routeApiPortion}/${routeImagesPortion}/${routeEventPortion}`,
}