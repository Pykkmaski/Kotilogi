import { useState } from "react";
import toast from "react-hot-toast";

export type UseOnSubmitOptions = {
    dataToSubmit: any,
    submissionFunction: (e) => Promise<void>,
    onSuccess?: (res: any) => void,
    onFail?: (err) => void,

    /**Called at the end of the submission call, both on success and failure. */
    callback?: () => void,
}

/**A hook returning a form submission function that calls the provided submissionFunction, and deals with the results of the call. 
 * Lastly it calls the callback function, if one is provided.
*/
export function useOnSubmit(options: UseOnSubmitOptions){

    const [loading, setLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        options.submissionFunction(options.dataToSubmit)
        .then(res => {
            if(options.onSuccess) options.onSuccess(res);
            toast.success('Kohteen lisäys onnistui!');
        })
        .catch(err => {
            if(options.onFail) options.onFail(err);
            toast.error('Kohteen lisäys ei onnistunut!');
        })
        .finally(() => {
            setLoading(false);
            if(options.callback) options.callback();
        });
    }

    return {onSubmit, loading}
}