import style from './style.module.scss';

export default function Item<ItemT>(props: {
    item: ItemT,
}){
    return (
        <div className={style.item}>

        </div>
    );
}