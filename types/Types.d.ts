namespace Kotidok {
  type IdType = string;

  type HasId = {
    id: IdType;
  };

  type HasRefId = {
    refId: IdType;
  };

  type HasTimeStamp = {
    createdAt?: string;
    updatedAt?: string;
  };

  type HasMainImageFilename = {
    mainImageFilename?: string;
  };

  type HasTitle = {
    title: string;
  };

  type HasDescription = {
    description: string;
  };

  type HasDate = {
    time: string;
  };

  type MimeType = 'image/jpeg' | 'application/pdf';

  type Error = {
    message: string | null;
    code: number;
  };

  type Plans = 'regular' | 'pro';

  declare type HasMimeType = {
    mimeType?: MimeType;
  };

  type UsageTypeType = 'heat' | 'electric' | 'water';

  type UsageType = HasId &
    HasRefId &
    HasDate &
    HasTimeStamp & {
      type: UsageTypeType;
      price: number;
      unitAmount?: number;
    };

  type HasMainImageId = {
    mainImageId?: IdType;
  };

  type ItemType = HasTitle & HasDescription & HasId & HasTimeStamp & HasRefId;

  type PropertyType = ItemType &
    HasMainImageId & {
      status?: string;
      roomCount?: number;
      floorCount?: number;
      wcCount?: number;
      livingArea?: number;
      yardArea?: number;
      buildYear?: number;
      targetType?: 'Huoneisto' | 'Kiinteistö';
      yardOwnership?: string;
      buildingMaterial?: string;
      roofMaterial?: string;
      roofType?: string;
      primaryHeatingSystem?: string;
      secondaryHeatingSystem?: string;
      color?: string;
      title: string;
      zipCode?: string;
      buildingType?: string;
      energyClass?: string;
      otherArea?: number;
      propertyNumber?: string;
      appartmentNumber?: number;
      hasGarage?: boolean;
      hasBalcony?: boolean;
    };

  type EventType = ItemType &
    HasDate &
    HasMainImageId & {
      consolidationTime: string;
      createdBy: string;
    };

  type FileType = ItemType & {
    fileName: string;
    mimeType: 'image/jpeg' | 'application/pdf';
  };

  type UserType = HasId & {
    email: string;
    password: string;
  };

  type Table =
    | 'propertyFiles'
    | 'eventFiles'
    | 'propertyImages'
    | 'eventImages'
    | 'properties'
    | 'propertyEvents'
    | 'usage'
    | 'files';
}

declare type TODO = any;
