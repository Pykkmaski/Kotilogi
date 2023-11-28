import Button from "kotilogi-app/components/Button/Button";
import HoverOverlay from "../HoverOverlay/HoverOverlay";
import { MenuProps } from "./ImageContainer";

export default function PropertiesMenu(props: MenuProps){
    return (
        <HoverOverlay visible={props.showMenu}>
            <Button
                className="primary"
                desktopText="Avaa"
                onClick={() => props.router.push(`/auth/properties/new/${props.id}/info?section=general`)}
            />
        </HoverOverlay>
    );
}