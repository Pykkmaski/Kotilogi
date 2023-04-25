import axios from "axios";
import { useEffect, useState } from "react";
import useLocalStorage from './useLocalStorage';
const {tokenStorageKey} = require('../appconfig');

function useAxiosDefaultHeader(header, initialValue){
    ///Internally retrieves the specified header and assigns it to the axios defaults.
    const [value, setValue] = useLocalStorage(tokenStorageKey, initialValue);

    useEffect(() => {
        axios.defaults.headers[header] = value;
    }, [value]);

    return [value, setValue];
}

export default useAxiosDefaultHeader;