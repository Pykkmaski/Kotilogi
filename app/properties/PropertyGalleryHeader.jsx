import { useItemGalleryContext } from "kotilogi-app/contexts/ItemGalleryContext";
import axios from 'axios';

export default function PropertyGalleryHeader(props){
    const {deleteItems, selectedItems, items, setItems, addItem, loading, setShowDeleteModal} = useItemGalleryContext();
    
    async function addProperty(){
        const newProperty = {
            owner: 'testUser',
            address: 'Test Property ' + items.length,
            description: 'Placeholder property for testing purposes',
        }

        try{
            const res = await axios.post('/api/properties', newProperty);
            console.log(res);
            setItems(prev => [...prev, res.data]);
        }
        catch(err){
            console.log(err.message);
        }
    }

    return (
        <div className="gallery-header">
            <div>
                <h1>Kiinteistöt</h1>
            </div>

            <div className="group-row">
                <button type="button" className="primary" onClick={() => setShowDeleteModal(true)} disabled={selectedItems.length === 0}>Poista</button>
                <button type="button" className="primary add" onClick={() => addItem(() => addProperty())}>Lisää Uusi</button>
            </div>
        </div>
    );
}