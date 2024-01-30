export function planNameToLang(plan: string, lang: string){
    switch(lang){
        case 'fi': {
            if(plan === 'regular') return 'Perus';
            if(plan === 'pro') return 'Pro';
        }

        default: throw new Error('planNameToLang: Invalid language provided!');
    }
}