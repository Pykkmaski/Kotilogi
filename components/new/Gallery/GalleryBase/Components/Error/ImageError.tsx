import {Error} from "./Error";

export function ImageError(props: {
    message: string,
}){
    return (
        <Error
            {...props}
            title="Ei Kuvia"
            icon={'/icons/image.png'}
        />
    );
}