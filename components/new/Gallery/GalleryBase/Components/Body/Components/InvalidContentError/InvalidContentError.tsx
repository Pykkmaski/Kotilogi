import useGalleryContext from '../../../../GalleryContext';
import style from './style.module.scss';

export default function InvalidContentError(){
    const {props: {contentType}} = useGalleryContext();

    return (
        <div className={style.invalidContentError}>
            <h2>Unsupported Content Type!</h2>
            <small>{contentType}</small>
        </div>
    )
}