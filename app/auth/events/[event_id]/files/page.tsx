import Form from "kotilogi-app/components/Form";
import GalleryWithDelete from "kotilogi-app/components/new/Gallery/GalleryWithDelete/GalleryWithDelete";
import Error from "kotilogi-app/components/new/Gallery/GalleryBase/Error";
import ErrorImage from 'kotilogi-app/assets/copy.png';

export default function EventFilesPage({params}){

    const addModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Lisää Tiedosto',
        bodyContent: (
            <Form.Group>
                <label>Tiedosto</label>
                <input type="file" name="file" accept={'application/pdf' as Kotilogi.MimeType} required/>
            </Form.Group>
        )
    }

    const deleteModalOptions: GalleryBase.ModalOptions = {
        headerText: 'Poista Tiedostoja',
        bodyContent: <span>Haluatko varmasti poistaa valitsemasi tiedostot?</span>
    }

    const error = <Error title="Ei tiedostoja." message="Et ole vielä lisännyt tapahtumalle tiedostoja." imageUrl={ErrorImage}/>

    return (
        <GalleryWithDelete
            contentType={'event_file'}
            title="Tiedostot"
            subTitle=""
            refId={params.event_id}
            dbTableName='eventFiles'
            headerButtons={[]}
            addModalOptions={addModalOptions}
            deleteModalOptions={deleteModalOptions}
            error={error}
        />
    )
}