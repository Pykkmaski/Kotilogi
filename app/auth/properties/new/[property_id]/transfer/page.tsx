import { testAction } from "kotilogi-app/actions/testAction";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import Form from "kotilogi-app/components/Form/Form";
import db from "kotilogi-app/dbconfig"

export default async function TransferPage({params}){
    const property = await db('properties').where({id: params.property_id}).first();
    if(!property) throw new Error('Property failed to load!');

    return (
        <>
            <h2>Omistajuus</h2>

            <Form action={testAction}>
                <h2>Siirrä</h2>
                <p>
                    Siirrä talon omistajuus toiselle käyttäjälle
                </p>

                <Form.Group>
                    <label>Uuden omistajan sähköpostiosoite<span className="danger">*</span></label>
                    <input type="email" required={true} name="receiverEmail" placeholder="Kirjoita vastaanottajan sähköpostiosoite..."/>
                </Form.Group>

                <Form.Group direction="horizontal">
                    <label>Ymmärrän, että omistajuuden siirto on pysyvä:</label>
                    <input type="checkbox" required={true}/>
                </Form.Group>

                <Form.Group direction="horizontal">
                    <PrimaryButton desktopText="Siirrä" type="submit"/>
                </Form.Group>
            </Form>
        </>
    )
}