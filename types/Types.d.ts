namespace Kotilogi{
    type IdType = string;

    type HasId = {
        id?: IdType,
    }

    type HasRefId = {
        ref_id: IdType,
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

    type HasEventId = {
        event_id: IdType,
    }

    type HasDate = {
        date: number,
    }

   type MimeType = 'image/jpeg' | 'application/pdf';

    declare type HasMimeType = {
        mime_type: MimeType,
    }

    type UsageType = HasId & HasRefId & HasDate & {
        type: 'heating' | 'electric' | 'water',
        price: number,
    }

    type HasMainImageId = {
        main_image_id: IdType,
    }
    
    type PropertyType = HasId & HasDescription & HasMainImageId & HasDate & HasRefId & {
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
        title: string,
        zip_code?: string,
        property_type?: string,
        energy_class?: string,
    }

    type EventType = HasId & HasDescription & HasDate & HasRefId & HasMainImageId &{
        name: string,
    };

    type BaseFileType = HasId & HasTitle & HasDescription & HasMimeType & HasDate & {
        filename: string,
    }

    type PropertyFileType = BaseFileType & HasRefId;

    type EventFileType = BaseFileType & HasRefId;

    type Table = 'property_files' | 'event_files' | 'property_images' | 'event_images' | 'properties' | 'property_events';
}
