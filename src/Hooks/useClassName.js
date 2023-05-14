import { useEffect, useState } from "react";

function buildClassName(defaultClass, additionalClasses){
    return [defaultClass].concat(additionalClasses.split(' ')).join(' ');
}

function useClassName(defaultClass, additionalClasses = ''){
    if(typeof(defaultClass) !== 'string') throw new Error('useClassName: ' + 'default class must be a string!');
    if(typeof(additionalClasses) !== 'string') throw new Error('useClassName: ' + 'additional classes must be a string!');

    const [className, setClassName] = useState(() => buildClassName(defaultClass, additionalClasses));
    
    useEffect(() => {
        setClassName(buildClassName(defaultClass, additionalClasses));
    }, [defaultClass, additionalClasses]);

    return className;
}

export default useClassName;