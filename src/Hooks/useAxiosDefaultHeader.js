import axios from "axios";
import { useEffect, useState } from "react";

function setInitialValue(initialValue){
    if(initialValue instanceof Function) return initialValue();
    return initialValue;
}

function useAxiosDefaultHeader(header, initialValue){
    const [value, setValue] = useState(() => {
        return setInitialValue(initialValue);
    });

    useEffect(() => {
        axios.defaults.headers[header] = value;
        console.log('Axios auth header set to: ', axios.defaults.headers[header]);
    }, [value]);

    return [value, setValue];
}

export default useAxiosDefaultHeader;