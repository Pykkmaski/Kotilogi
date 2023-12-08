'use client';

import Button from "kotilogi-app/components/Button/Button";
import { useRouter } from "next/navigation";
import HoverOverlay from "../../../GalleryBase/Components/Body/Components/Card/Components/HoverOverlay/HoverOverlay";
import { OverlayMenuProps } from "../../../GalleryBase/Components/Body/Components/Card/Card";
import { useCardContext } from "../../../GalleryBase/Components/Body/Components/Card/CardContext";

export default function PropertiesMenu(props: OverlayMenuProps){
    const router = useRouter();
    const {props: {item}} = useCardContext();

    return (
        <HoverOverlay visible={props.show}>
            <Button
                className="primary"
                desktopText="Avaa"
                onClick={() => router.push(`/auth/properties/new/${item.id}/info?section=general`)}
            />
        </HoverOverlay>
    );
}