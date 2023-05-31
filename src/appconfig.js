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
    heatingTypeString : {
        "title" : {
            "fi" : "Lämmitystyyppi",
            "en" : "Heating type"
        },

        "central" : {
            "fi" : "Kaukolämpö",
            "en" : "Central"
        },

        "electric" : {
            "fi" : "Sähkö",
            "en" : "Electric"
        },

        "oil" : {
            "fi" : "Öljy",
            "en" : "Oil"
        }
    },

    routeImages: `/${routeApiPortion}/${routeImagesPortion}`,
    routeFiles: `/${routeApiPortion}/${routeFilesPortion}`,
    routeProperties: `/${routeApiPortion}/${routePropertyPortion}`,
    routeEvents: `/${routeApiPortion}/${routeEventPortion}`,
    routePropertyImages: `/${routeApiPortion}/${routeImagesPortion}/${routePropertyPortion}`,
    routeEventImages: `/${routeApiPortion}/${routeImagesPortion}/${routeEventPortion}`,
}