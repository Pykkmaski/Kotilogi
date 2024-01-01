import Error from "./Error";

export default function FileError(props: {
    message: string,
}){
    return (
        <Error
            {...props}
            title="Ei Tiedostoja"
            icon={'/icons/copy.png'}
        />
    );
}