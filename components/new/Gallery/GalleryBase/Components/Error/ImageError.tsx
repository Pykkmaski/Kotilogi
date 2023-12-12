import Error from "./Error";
import ImageIcon from '@/assets/image.png';

export default function ImageError(props: {
    message: string,
}){
    return (
        <Error
            {...props}
            title="Ei Kuvia"
            icon={ImageIcon}
        />
    );
}