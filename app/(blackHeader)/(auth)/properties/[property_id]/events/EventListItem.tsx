import { ListItem, ListItemProps } from "@/components/ListItem/ListItem";
import { CheckBox, ControlsContainer, DeleteButton, DescriptionContainer, EventTitleContainer, InfoContainer } from "@/components/ListItem/ListItem.components";
import { deleteEvent } from "kotilogi-app/actions/experimental/deleteEvent";
import toast from "react-hot-toast";

export function EventListItem(props: ListItemProps<Kotilogi.EventType>){
    const timestamp: string | null = props.item.time;
    const date = timestamp !== null ? new Date(timestamp).toLocaleDateString('fi-FI') : 'Ei Päivämäärää.';

    const del = () => {
        const response = confirm('Olet poistamassa tapahtumaa ' + props.item.title + '. Oletko varma?');
        if(!response) return;

        const loadingToast = toast.loading('Poistetaan tapahtumaa...');

        deleteEvent(props.item.id)
        .then(() => {
            toast.success('Tapahtuma poistettu!')
        })
        .catch(err => {
            toast.error(err.message);
        })
        .finally(() => {
            toast.dismiss(loadingToast);
        })
    }

    const HighlightBadge = () => (
        <div style={{
            width: '25px',
            height: '25px',
            borderRadius: '50%',
            backgroundColor: 'orange',
            position: 'absolute',
            top: '-5px',
            right: '-5px',
        }} title="Tämä tapahtuma on poistettavissa. Varmista että tapahtuman tiedot ovat oikein ennenkuin tapahtuma vakiinutetaan!" hidden={parseInt(props.item.consolidationTime) <= Date.now()}/>
    );

    const isConsolidated = Date.now() >= parseInt(props.item.consolidationTime);

    return (
        <ListItem<Kotilogi.EventType> {...props}>
            <InfoContainer href={`/events/${props.item.id}/info`}>
                <EventTitleContainer titleText={props.item.title} icon="fa-history" iconSrc='/icons/history.png' consolidationTime={props.item.consolidationTime}/>
                <DescriptionContainer text={props.item.description || 'Ei Kuvausta.'}/>
                <small>{date}</small>
            </InfoContainer>
            
            {
                !isConsolidated ? 
                <ControlsContainer>
                    <CheckBox checked={props.selected}/>
                    <DeleteButton onClick={del} hidden={isConsolidated}/>
                </ControlsContainer>
                :
                null
            }
            
        </ListItem>
    );
}