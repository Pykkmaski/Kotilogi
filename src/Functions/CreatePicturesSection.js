import LoadingSpinner from "../Components/Spinner";

function CreatePicturesSection(property_id){
    const [imageIds, loadImageIds] = useImageIds(property_id);
    if(!imageIds) return <LoadingSpinner/>
    return (
        <Gallery title="Kuvat">
            {
                imageIds.map(id => {
                    <img src={`/images/property/${property_id}`}/>
                })
            }
        </Gallery>
    )
}

export default CreatePicturesSection;