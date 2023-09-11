import FileCard from "../Card/FileCard";
import useGalleryContext from "./GalleryContext"

type BodyWithFilesProps = {

}

export default function BodyWithFiles(props: BodyWithFilesProps){
    const {state} = useGalleryContext();

    const cards = state.data.map((entry, index: number) => {
        return <FileCard data={entry as Kotilogi.PropertyFileType | Kotilogi.EventFileType}/>
    });

    return(
        <div className="gallery-body">
            {cards}
        </div>
    )
}