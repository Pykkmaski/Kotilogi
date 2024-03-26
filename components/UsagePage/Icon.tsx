type IconProps = {
    type: Kotilogi.UsageTypeType | 'all',
}

export function Icon({type}: IconProps){
    const getIcon = () => {
        if(type === 'heat'){
            return 'fa fa-fire';
        }
        else if(type === 'water'){
            return 'fa fa-tint';
        }
        else{
            return 'fa fa-bolt';
        }
    }

    return (
        <div className={['flex p-1 rounded-md w-[25px]', `bg-${type}`].join(' ')}>
            <i className={`${getIcon()} text-lg`}/>
        </div>
    );
}