import EventDescriptionSection from "./EventDescriptionSection";

type HeaderProps = {
    eventId: Kotilogi.IdType,
}

export default function HeaderSection(props: HeaderProps){
    return (
        <EventDescriptionSection eventId={props.eventId}/>
    );
}