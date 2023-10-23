import stringToDate from 'kotilogi-app/utils/stringToDate';
import style from './style.module.scss';

type Props = {
    event: Kotilogi.EventType,
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function infoContainer(props: Props){

    const date = props.event.time !== '' && props.event.time !== null ? new Date(parseInt(props.event.time)).toLocaleDateString('fi-FI') : null;

    const headerContent = (
        <div className={style.titleContainer}>
            <p>
                {props.event.description || 'Ei kuvausta.'}
            </p>
        </div>
    );

    return (
        <span className={style.infoContainer} onClick={() => props.setShowEditModal(true)} title="Muokkaa klikkaamalla">
            {headerContent}
            <h2>Päivämäärä</h2>
            <p>
                {date || 'Ei tiedossa.'}
            </p>
        </span>
    )
}