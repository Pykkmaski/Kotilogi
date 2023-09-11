declare namespace Kotilogi{
    declare type IdType = string;

    declare type HasId = {
        id: IdType,
    }

    declare type HasMainImageFilename = {
        mainImageFilename: string,
    }

    declare type HasTitle = {
        title: string,
    }

    declare type HasDescription = {
        description: string,
    }

    declare type HasEventId = {
        event_id: IdType,
    }

    declare type HasPropertyId = {
        property_id: IdType,
    }

    declare type HasDate = {
        date: number,
    }

    declare type MimeType = 'image/jpeg' | 'application/pdf';

    declare type HasMimeType = {
        mime_type: MimeType,
    }

    declare type UsageType = HasId & HasPropertyId & HasDate & {
        type: 'heating' | 'electric' | 'water',
        price: number,
    }
    
    declare type PropertyType = HasId & HasDescription & HasMainImageFilename & {
        owner?: string,
        room_count?: number,
        floor_count?: number,
        wc_count?: number,  
        area?: number,
        yard_area?: number,
        other_area?: number,
        build_year?: number,
    
        yard_ownership?: string,
        building_material?: string,
        roof_material?: string,
        roof_type?: string,
        primary_heating_system?: string,
        secondary_heating_system?: string,
        color?: string,
        address: string,
        zip_code?: string,
        property_type?: string,
        energy_class?: string,
    }

    declare type EventType = HasId & HasDescription & HasDate & HasPropertyId & HasMainImageFilename &{
        name: string,
    };

    declare type BaseFileType = HasId & HasTitle & HasDescription & HasMimeType & HasDate & {
        filename: string,
    }

    declare type PropertyFileType = BaseFileType & HasPropertyId;

    declare type EventFileType = BaseFileType & HasEventId;
}
