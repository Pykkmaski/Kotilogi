import Button from "kotilogi-app/components/Button/Button";
import useGalleryContext from "kotilogi-app/components/new/Gallery/GalleryBase/GalleryContext";
import { OverlayMenuProps } from "../../../GalleryBase/Components/Body/Components/Card/Card";
import HoverOverlay from "../../../GalleryBase/Components/Body/Components/Card/Components/HoverOverlay/HoverOverlay";
import { useCardContext } from "../../../GalleryBase/Components/Body/Components/Card/CardContext";

export default function EventsMenu(props: OverlayMenuProps){
    const {setMenuOpen, setShowEditModal} = useCardContext();

    return (
        <HoverOverlay visible={props.show}>
            <Button
                className="primary"
                desktopText="Avaa"
                onClick={() => {
                    setShowEditModal(true);
                    setMenuOpen(false);
                }}
            />
        </HoverOverlay>
    );
}