import ImageCard from "./Cards/ImageCard";

function ControlButtons(props){
    
    const {setEditing} = useContext(ContentSectionContext);
    return (
        <div className="group-row">
            <EditButton editFunction={() => setEditing(true)} cancelFunction={() => setEditing(false)}>Muokkaa</EditButton>

            <Button variant="add" className="primary" onClick={() => props.addButtonFunction}>Lisää Kuva</Button>
        </div>
    )
}

function generateElement(props){
    if(props.type === 'image'){
        return (
            <ImageCard
                image={props.image}
                
        )
    }
}

function ContentSection(props){

    return (
        <Section>
            <Section.Header>
                <Section.Header.Heading
                    labelText={props.headerLabelText}
                    subLabelText={props.headerSubLabelText}
                />
            </Section.Header>

            <Section.Body>
                {
                    props.content?.map(item => {
                        const element = generateElement(props);

                        return element;
                    })
                }
            </Section.Body>
        </Section>
    )
}