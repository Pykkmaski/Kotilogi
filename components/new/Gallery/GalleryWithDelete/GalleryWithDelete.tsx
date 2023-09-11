import GalleryBase from "../GalleryBase/GalleryBase";
import DeleteButton from "./DeleteButton";
export default function GalleryWithDelete(props: GalleryWithDelete.Props){
    
    const headerButtons: JSX.Element[] = [
        ...props.headerButtons,
        <DeleteButton deleteModalOptions={props.deleteModalOptions}/>
    ];

    return (
        <GalleryBase
            data={props.data}
            headerButtons={headerButtons}
            title={props.title}
            subtitle={props.subtitle}
            addModalOptions={props.addModalOptions}
            dbTableName={props.dbTableName}
        />
    )
}