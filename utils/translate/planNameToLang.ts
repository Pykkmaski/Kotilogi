export function planNameToLang(plan: string, lang: string){
    switch(lang){
        case 'fi': {
            if(plan === 'regular') return 'Perus';
            if(plan === 'pro') return 'Pro';
        }

        default: throw new Error('planNameToLang: Invalid language provided!');
    }
}

export function monthNameToLang(month: number, lang: string){
    switch(lang){
        default: {
            switch(month){
                case 0: 
                return 'Tammikuu';
            case 1: 
                return 'Helmikuu';
            case 2:
                return 'Maaliskuu';
            case 3:
                return 'Huhtikuu';
            case 4:
                return 'Toukokuu';
            case 5:
                return 'Kesäkuu';
            case 6:
                return 'Heinäkuu';
            case 7:
                return 'Elokuu';
            case 8:
                return 'Syyskuu';
            case 9:
                return 'Lokakuu';
            case 10:
                return 'Marraskuu';
            case 11:
                return 'Joulukuu';
            default: 
                return 'Kuukausi';
            }
        }
    }
}