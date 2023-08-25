export default function PropertyGalleryHeader({properties}){
    return (
        <div className="gallery-header">
            <div>
                <h1>Kiinteistöt</h1>
            </div>

            <div className="group-row">
                <button type="button" className="primary" onClick={undefined}>Poista</button>
                <button type="button" className="primary add" onClick={undefined}>Lisää Uusi</button>
            </div>
        </div>
    );
}