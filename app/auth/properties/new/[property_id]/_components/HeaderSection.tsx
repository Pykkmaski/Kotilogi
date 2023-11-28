import PropertyDescriptionSection from "./PropertyDescriptionSection";

type HeaderProps = {
    propertyId: Kotilogi.IdType,
}

export default function HeaderSection(props: HeaderProps){
    return (
        <PropertyDescriptionSection propertyId={props.propertyId}/>
    );
}