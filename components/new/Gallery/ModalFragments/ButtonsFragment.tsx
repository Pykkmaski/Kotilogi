import Form from "kotilogi-app/components/Form";
import useGalleryContext from "../GalleryBase/GalleryContext";
import Button from "kotilogi-app/components/Button/Button";

export default function ButtonsFragment(){
    const {dispatch, state} = useGalleryContext();

    return (
        <Form.ButtonGroup>
            <Button
                desktopText="Peruuta"
                className="secondary"
                type="button"
                onClick={() => dispatch({
                    type: 'toggle_add_modal',
                    value: false
                })}
                disabled={state.isLoading}
            />

            <Button
                desktopText="Lähetä"
                className="primary"
                type="submit"
                disabled={state.isLoading}
                loading={state.isLoading}
            />
        </Form.ButtonGroup>
    );
}