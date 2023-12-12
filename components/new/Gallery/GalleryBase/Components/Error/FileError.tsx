import Error from "./Error";
import FileIcon from '@/assets/copy.png';

export default function FileError(props: {
    message: string,
}){
    return (
        <Error
            {...props}
            title="Ei Tiedostoja"
            icon={FileIcon}
        />
    );
}