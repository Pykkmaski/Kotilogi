import style from '../layout.module.scss';

type BackgroundImageProps = {
    mainImageId: Kotilogi.IdType,
}

export default function BackgroundImage(props: BackgroundImageProps){
    const backgroundImageUrl = `/api/files/${props.mainImageId}`;
    const backgroundStyle = {
        background: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPositionY: '-500px',
    }

    return (
        <div className={style.backgroundImage} style={backgroundStyle}/>
    )
}