import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";
import SelectAllButton from "../GalleryBase/Components/SelectAllButton";
import GalleryBase from "../GalleryBase/GalleryBase";
import DeleteButton from "./DeleteButton";
import { GalleryWithDeleteProvider } from "./GalleryWithDeleteProvider";
export default function GalleryWithDelete(props: GalleryWithDelete.Props){
    
    const headerButtons: JSX.Element[] = [
        ...props.headerButtons,
        <SelectAllButton/>,
        <DeleteButton deleteModalOptions={props.deleteModalOptions}/>
    ];

    const deleteItem = async (id: Kotilogi.IdType) => {
        "use server"
        try{
            const result = await serverDeleteDataByIds([id], props.dbTableName);
            if(!result) throw new Error('Failed to delete item with id ' + id);
        }
        catch(err){
            console.log(err.message);
        }
    }

    const contextValue = {
        deleteItem,
    }
    return (
        <GalleryWithDeleteProvider value={contextValue}>
            <GalleryBase
                {...props}
                headerButtons={headerButtons}
            />
        </GalleryWithDeleteProvider>
    )
}