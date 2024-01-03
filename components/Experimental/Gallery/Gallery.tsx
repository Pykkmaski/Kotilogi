import style from './style.module.scss';

type GalleryProps<DataT> = {
    data: DataT[],
    itemComponent: React.FC<{item: DataT}>
    display?: 'list' | 'card',
}

/**Responsible for receiving an array of data as props and then rendering them. */
export function Gallery<DataT>({display = 'list', itemComponent: ItemComponent, ...props}: GalleryProps<DataT>){
    return (
        <div className={style.container}>
            {
                props.data.map(item => <ItemComponent item={item}/>)
            }
        </div>
    );
}