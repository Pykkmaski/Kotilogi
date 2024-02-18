type IconProps = {
    type: Kotilogi.UsageTypeType | 'all',
}

export function Icon({type}: IconProps){
    const getIcon = () => {
        if(type === 'heat'){
            return '/icons/flame.png';
        }
        else if(type === 'water'){
            return '/icons/drop.png';
        }
        else{
            return '/icons/bolt.png';
        }
    }

    return (
        <div className={['flex p-1 rounded-md w-[25px]', `bg-${type}`].join(' ')}>
            <img className={`aspect-square h-[1rem] ${type !== 'electric' ? 'invert' : 'filter-none'}`} src={getIcon()}/>
        </div>
    );
}