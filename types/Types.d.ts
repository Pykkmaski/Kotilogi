namespace Kotilogi{
    type IdType = string;

    type HasId = {
        id: IdType,
    }

    type HasRefId = {
        refId: IdType,
    }

    type HasTimeStamp = {
        createdAt: string,
        updatedAt: string,
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
        time: number,
    }

    type MimeType = 'image/jpeg' | 'application/pdf';

    type Error = {
        message: string | null,
        code: number,
    }

    type Plans = 'regular' | 'pro';
    
    declare type HasMimeType = {
        mimeType: MimeType,
    }

    type UsageType = HasId & HasRefId & HasDate & HasTimeStamp & {
        type: 'heating' | 'electric' | 'water',
        price: number,
        time: string,
    }

    type HasMainImageId = {
        mainImageId: IdType,
    }
    
    type ItemType = HasTitle & HasDescription & HasId & HasTimeStamp;

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
        otherArea?: number,
    }

    type EventType = HasId & HasTitle & HasDescription & HasDate & HasRefId & HasMainImageId & HasTimeStamps;

    type BaseFileType = HasId & HasTitle & HasDescription & HasMimeType & HasDate & {
        fileName: string,
    }

    type PropertyFileType = BaseFileType & HasRefId;

    type EventFileType = BaseFileType & HasRefId;

    type UserType = HasId & {
        email: string,
        password: string,
    }

    type Table = 'propertyFiles' | 'eventFiles' | 'propertyImages' | 'eventImages' | 'properties' | 'propertyEvents' | 'usage' | 'files';
}
