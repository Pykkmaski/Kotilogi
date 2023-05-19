import {useState} from 'react';
import Section from './Section';
import useSubComponents from '../Hooks/useSubComponents';
import EditableSectionContext from '../Contexts/EditableSectionContext';

function EditableSection(props){
    const [editing, setEditing] = useState(false);
    const subComponents = useSubComponents(Object.keys(EditableSection), props);

    return (
        <EditableSectionContext.Provider value={{
            editing,
            setEditing
        }}>
            <Section>
                {
                    subComponents.map(component => component)
                }
            </Section>
        </EditableSectionContext.Provider>
        
    )
}

export default EditableSection;