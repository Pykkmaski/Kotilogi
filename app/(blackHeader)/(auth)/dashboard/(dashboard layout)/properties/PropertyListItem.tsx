import { ModalRefType } from "@/components/Experimental/Modal/Modal";
import { ListItem, ListItemProps } from "@/components/ListItem/ListItem";
import { useRef } from "react";
import ActivatePropertyModal from "./ActivatePropertyModal";
import { CheckBox, ControlsContainer, DescriptionContainer, InfoContainer, TitleContainer } from "@/components/ListItem/ListItem.components";

export function PropertyListItem(props: ListItemProps<Kotilogi.PropertyType>){
    const activateModalRef = useRef<ModalRefType>(null);

    const deactivated = props.item.status === 'deactivated';
    const href = !deactivated ? `/properties/${props.item.id}/info` : '';

    return (
        <>
            <ActivatePropertyModal property={props.item} ref={activateModalRef}/>
            <ListItem<Kotilogi.PropertyType> {...props}>
                <InfoContainer href={href}>
                    <TitleContainer titleText={props.item.title} icon="fa-home" iconSrc='/icons/house.png'>
                    {
                        deactivated ? 
                        <div className="ml-4 flex justify-between w-full">
                            <span className="text-red-700 flex gap-2 items-center">
                                <i className="fa fa-ban"></i>
                                <span>Poistettu käytöstä</span>
                            </span>
                            <span className="text-orange-500 cursor-pointer hover:underline" onClick={() => activateModalRef.current?.toggleOpen(true)}>Ota käyttöön</span>
                        </div>
                        :
                        null
                    }
                    </TitleContainer>
                    <DescriptionContainer text={props.item.description || 'Ei Kuvausta.'}/>
                    <small>{props.item.buildingType}</small>
                </InfoContainer>

                <ControlsContainer>
                    {
                        props.item.status !== 'deactivated' ?
                        <CheckBox checked={props.selected}/>
                        :
                        null
                    }
                    
                </ControlsContainer>
            </ListItem>
        </>
    );
}