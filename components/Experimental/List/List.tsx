type ListProps = {
    data: Kotilogi.ItemType[];
    ItemComponent: React.FC<{item: Kotilogi.ItemType}>;
    direction?: 'vertical' | 'horizontal';
    gap?: number;
}

export function List({data, ItemComponent, direction = 'vertical', gap = 0}: ListProps){

    const className = [
        'flex',
        `gap-${gap}`,
        direction === 'vertical' ? 'flex-col' : 'flex-row',
    ];

    return (
        <ul className={className.join(' ')}>
            {
                data.map(item => (
                    <li>
                        <ItemComponent item={item}/>
                    </li>
                ))
            }
        </ul>
    );
}