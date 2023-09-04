function convertDatabasePropertyField(field: string): string{
    switch(field){
        case 'address':
            return 'Osoite';

        case 'energy_class':
            return 'Energialuokka';

        case 'build_year':
            return 'Rakennusvuosi';

        case 'build_material':
            return 'Rakennusmateriaali';

        case 'roof_type':
            return 'Kattotyyppi';

        case 'roof_material':
            return 'Kattomateriaali';

        case 'room_count':
            return 'Huonelukumäärä';

        case 'floor_count':
            return 'Kerroslukumäärä';

        default: return 'Tuntematon ominaisuus';
    }
}

export function convertDatabaseField(field: string): string{
    return '';
}