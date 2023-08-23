import ContentSectionContext from "../Contexts/ContentSectionContext";

function ControlButtons(props){
    
    const {setEditing} = useContext(ContentSectionContext);
    return (
        <div className="group-row">
            <EditButton editFunction={() => setEditing(true)} cancelFunction={() => setEditing(false)}>Muokkaa</EditButton>

            <Button variant="add" className="primary" onClick={() => props.addButtonFunction}>Lisää Kuva</Button>
        </div>
    )
}

export default EditButtonGroup;