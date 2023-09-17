namespace Kotilogi{
    type IdType = string;

    type HasId = {
        id?: IdType,
    }

    type HasRefId = {
        refId: IdType,
    }

    type HasMainImageFilename = {
        mainImageFilename?: string,
    }

    type HasTitle = {
        title: string,
    }

    type HasDescription = {
        description: string,
    }

    type HasDate = {
        date: number,
    }

   type MimeType = 'image/jpeg' | 'application/pdf';

    declare type HasMimeType = {
        mimeType: MimeType,
    }

    type UsageType = HasId & HasRefId & HasDate & {
        type: 'heating' | 'electric' | 'water',
        price: number,
    }

    type HasMainImageId = {
        mainImageId: IdType,
    }
    
    type PropertyType = HasId & HasDescription & HasMainImageId & HasDate & HasRefId & {
        roomCount?: number,
        floorCount?: number,
        wcCount?: number,  
        livingArea?: number,
        yardArea?: number,
        buildYear?: number,
    
        yardOwnership?: string,
        buildingMaterial?: string,
        roofMaterial?: string,
        roofType?: string,
        primaryHeatingSystem?: string,
        secondaryHeatingSystem?: string,
        color?: string,
        title: string,
        zipCode?: string,
        buildingType?: string,
        energyClass?: string,
    }

    type EventType = HasId & HasDescription & HasDate & HasRefId & HasMainImageId &{
        name: string,
    };

    type BaseFileType = HasId & HasTitle & HasDescription & HasMimeType & HasDate & {
        fileName: string,
    }

    type PropertyFileType = BaseFileType & HasRefId;

    type EventFileType = BaseFileType & HasRefId;

    type Table = 'propertyFiles' | 'eventFiles' | 'propertyImages' | 'eventImages' | 'properties' | 'propertyEvents';
}
