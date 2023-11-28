import Button from "kotilogi-app/components/Button/Button";

export default function Footer(props: {
    onHide: () => void,
    loading: boolean,
    formId: string,
}){
    return  (
        <div className={'edit-modal-footer'}>
            <Button
                className="secondary"
                desktopText="Peruuta"
                onClick={() => props.onHide()}
                disabled={props.loading}
            />

            <Button
                className="primary"
                desktopText="Tallenna Muutokset"
                type="submit"
                form={props.formId}
                loading={props.loading}
                disabled={props.loading}
            />
        </div>
    );
}