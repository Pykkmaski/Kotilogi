import Button from "kotilogi-app/components/Button/Button";
import { OverlayMenuProps } from "../../../GalleryBase/Components/Body/Components/Card/Card";
import HoverOverlay from "../../../GalleryBase/Components/Body/Components/Card/Components/HoverOverlay/HoverOverlay";
import { useCardContext } from "../../../GalleryBase/Components/Body/Components/Card/CardContext";
import { useRouter } from "next/navigation";

export default function EventsMenu(props: OverlayMenuProps){
    const {props: {item}} = useCardContext();
    const router = useRouter();

    return (
        <HoverOverlay visible={props.show}>
            <Button
                className="primary"
                desktopText="Avaa"
                onClick={() => {
                    router.push(`/auth/events/${item.id}?data=images`);
                }}
            />
        </HoverOverlay>
    );
}