'use client';

import { createTransferOrder } from "kotilogi-app/actions/property/createTransferOrder";
import { getData } from "kotilogi-app/actions/data/getData";
import Button from "kotilogi-app/components/Button/Button";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import Form from "kotilogi-app/components/Form/Form";
import { Input } from "kotilogi-app/components/Input/Input";
import { CSSProperties, createContext, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import style from './style.module.scss';

type FormFieldValidityState = 'valid' | 'invalid' | 'unknown';

/**Runs a check to see if a value exists on a given database table, based on query.
 * @returns An object containing the validity state of the data, as well as a handler to use on input onChange-events.
 */
function useCheckValueIsValid<ValueT>(tableName: string, column: string){
    const [isValid, setIsValid] = useState<FormFieldValidityState>('unknown');
    const [value, setValue] = useState<ValueT | null>(null);

    const onChange = (e) => {
        setIsValid('unknown');
        setValue(e.target.value);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            getData(tableName, {
                [column] : value,
            } , true)
            .then(data => {
                if(data){
                    setIsValid('valid');
                }
                else{
                    setIsValid('invalid');
                }
            })
            .catch(err => console.log(err.message));
        }, 250);

        return () => clearTimeout(timeout);
    }, [value]);

    return {
        isValid,
        onChange,
    }
}

type FormDataType = {
    receiver?: string,
}

function ReceiverEmailField(){
    const {isValid, onChange} = useCheckValueIsValid('users', 'email');
    const {updateData} = usePropertyTransferFormContext();

    const inputStyle: CSSProperties = {
        backgroundColor: isValid === 'valid' ? 'lime' : isValid === 'invalid' ? 'red' : 'white',
    }

    return (
        <Input
            label='Vastaanottaja'
            type="email" 
            required={true} 
            name="receiver" 
            placeholder="Kirjoita vastaanottavan käyttäjän sähköpostiosoite" 
            onChange={(e) => {
                onChange(e);
                updateData(e);
            }}/>
    );
}

function PasswordField(){
    return (
        <Input
            label="Salasana"
            type="password"
            required={true}
            name="password"
            placeholder="Anna salasanasi"/>
    )
}

function TransferCodeField(props: {
    code: string | null,
}){
    const transferCodeFieldStyle: CSSProperties = {

    }

    return (
        <Input
            label="Varmenne"
            disabled={true}
            value={props.code || undefined}
            type="password"
            placeholder="Varmenne ilmestyy tähän..."/>
    )
}

type PropertyTransferFormContextValueType = {
    updateData: (e) => void,
}

const PropertyTransferFormContext = createContext<PropertyTransferFormContextValueType | null>(null);

export function PropertyTransferForm(props: {
    property: {id: string, title: string},
}){
    const data = useRef<FormDataType>({
        receiver: '',
    });

    const [code, setCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    /**Updated the saved data on the top-level form component. */
    const updateData = (e) => {
        data.current = {
            ...data.current,
            [e.target.name] : e.target.value,
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        createTransferOrder(props.property.id)
        .then(code => {
            setCode(code);
            toast.success('Varmenne luotu onnistuneesti!');
        })
        .catch(err => toast.error(err.message))
        .finally(() => setLoading(false));
    }

    const copyToClipboard = async (e) => {
        navigator.clipboard.writeText(code!)
        .then(() => toast.success('Koodi kopioitu leikepöydälle!'))
        .catch(err => toast.error(err.message))
    }

    return (
        <>
            <p className={style.description}>
                Käytä tätä lomaketta luodaksesi varmenteen, jonka avulla toinen kotilogin käyttäjä voi vastaanottaa
                talon <strong>{props.property.title}</strong> omistajuuden itselleen.<br/> Omistajuuden siirto on pysyvä, jos vastaanottaja käyttää koodin <br/>
                puolen tunnin sisällä.
            </p>

            <Form onSubmit={onSubmitHandler} className={style.form}>
                <PropertyTransferFormContext.Provider value={{
                    updateData,
                }}>
                    <TransferCodeField code={code}/>
                    <Form.Group direction="horizontal">
                        <PrimaryButton type="submit" desktopText="Luo Varmenne" loading={loading} disabled={loading}/>
                        <PrimaryButton type="button" desktopText="Kopio koodi" disabled={!code} onClick={copyToClipboard}/>
                    </Form.Group>

                </PropertyTransferFormContext.Provider>
            </Form>
        </> 
    );
}

function usePropertyTransferFormContext(){
    const context = useContext(PropertyTransferFormContext);
    if(!context) throw new Error('usePropertyTransferContext must be used within a PropertyTransferContext!');
    return context;
}