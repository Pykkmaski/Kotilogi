import { useEffect, useRef, useState } from "react";

/**A hook to hold data from inputs. 
 * Its responsibility is to store the data in an object as well as keep track of if the data has changed from the initial value.
 */

export function useChangeInput(initialData: any){
    const [data, setData] = useState(initialData);
    const [isEdited, setIsEdited] = useState(false);

    const onChange = (e) => {
        setData(prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value,
            }
        });

        setIsEdited(true);
    }

    const resetIsEdited = () => {
        setIsEdited(false);
    }

    return {
        data,
        onChange,
        isEdited,
        resetIsEdited,
    }
}