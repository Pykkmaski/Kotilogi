namespace Kotilogi{
    type IdType = string;

    type HasId = {
        id: IdType,
    }

    type HasRefId = {
        refId: IdType,
    }

    type HasTimeStamp = {
        createdAt?: string,
        updatedAt?: string,
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
        time: string,
    }

    type MimeType = 'image/jpeg' | 'application/pdf';

    type Error = {
        message: string | null,
        code: number,
    }

    type Plans = 'regular' | 'pro';
    
    declare type HasMimeType = {
        mimeType?: MimeType,
    }

    type UsageType = HasId & HasRefId & HasDate & HasTimeStamp & {
        type: 'heat' | 'electric' | 'water',
        price: number,
    }

    type HasMainImageId = {
        mainImageId?: IdType,
    }
    
    type ItemType = HasTitle & HasDescription & HasId & HasTimeStamp & HasRefId;

    type PropertyType = ItemType & HasMainImageId & {
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

    type EventType = ItemType & HasDate & HasRefId & HasMainImageId & {
        consolidationTime: string,
    }

    type FileType = ItemType & {
        fileName: string,
        mimeType: 'image/jpeg' | 'application/pdf',
    }

    type UserType = HasId & {
        email: string,
        password: string,
    }

    type Table = 'propertyFiles' | 'eventFiles' | 'propertyImages' | 'eventImages' | 'properties' | 'propertyEvents' | 'usage' | 'files';
}
