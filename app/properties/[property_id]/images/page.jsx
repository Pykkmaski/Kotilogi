import ImagesGallery from './_components/ImagesGallery';

export default function PropertyImagesPage(props){
    const images = []; //TODO fetch from database.

    return <ImagesGallery images={images}/>
}