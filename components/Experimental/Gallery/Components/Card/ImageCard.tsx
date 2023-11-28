import Image from 'next/image';
import style from './style.module.scss';

type Props = {
    src: string,
}

export default function ImageCard(props: Props){
    return (
        <div className={style.imageCard}>
            <Image
                src={props.src}
                fill={true}
                alt="Ei Kuvaa"
            />
        </div>
    );
}