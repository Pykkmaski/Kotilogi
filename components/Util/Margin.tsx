type MarginProps = React.PropsWithChildren & {
    direction: 'bottom' | 'top' | 'left' | 'right' | 'all';
    amount: string,
}

export function Margin({direction = 'all', amount, children}: MarginProps){
    const getMargin = () => {
        if(direction === 'left'){
            return `0 0 0 ${amount}`;
        }
        else if(direction === 'right'){
            return `0 ${amount} 0 0`;
        }
        else if(direction === 'top'){
            return `${amount} 0 0 0`;
        }
        else if(direction === 'bottom'){
            return `0 0 ${amount} 0`;
        }
        else{
            return amount;
        }
    }

    return (
        <div style={{margin: getMargin()}}>{children}</div>
    );
}