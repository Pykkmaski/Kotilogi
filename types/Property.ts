export type EnergyClass = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Muu';
export type YardOwnership = 'Oma' | 'Vuokra' | 'Ei Kelvollinen';
export type PropertyType = 'Omakotitalo' | 'Kerrostalo' | 'Luhtitalo' | 'Rivitalo' |'Erillistalo' | 'Puutalo-osake' | 'Paritalo' | 'Muu';
export type BuildingMaterial = 'Puu' | 'Betoni' | 'Tiili' | 'Hirsi';
export type Color = 'Valkoinen' | 'Sininen' | 'Vihreä' | 'Punainen' | 'Ruskea' | 'Keltainen' | 'Musta' | 'Harmaa' | 'Muu';
export type RoofMaterial = 'Huopa' | 'Pelti' | 'Tiili' | 'Muu';
export type HeatingSystem = 'Ilmalämpöpumppu' | 'Kaukolämpö' | 'Vesi-Ilmalämpöpumppu' | 'Sähkö' | 'Takka' | 'Muu' | 'Ei Mitään';
export type RoofType = 'Harjakatto' | 'Tasakatto' | 'Pulpettikatto' | 'Muu';

export type Property = {
    id: number,
    owner?: string,
    room_count?: number,
    floor_count?: number,
    wc_count?: number,  
    area?: number,
    yard_area?: number,
    other_area?: number,
    build_year?: number,

    yard_ownership?: YardOwnership,
    building_material?: BuildingMaterial,
    roof_material?: RoofMaterial,
    roof_type?: RoofType,
    primary_heating_system?: HeatingSystem,
    secondary_heating_system?: HeatingSystem,
    color?: Color,
    address: string,
    zip_code?: string,
    description?: string,
    property_type?: PropertyType,
    energy_class?: EnergyClass,
}