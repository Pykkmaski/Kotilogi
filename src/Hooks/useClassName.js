import { useEffect, useState } from "react";

function buildClassName(defaultClass, additionalClasses){
    if(additionalClasses === null) return defaultClass;
    return [defaultClass].concat(additionalClasses.split(' ')).join(' ');
}

function useClassName(defaultClass, additionalClasses = null){

    ///Concatenates provided additional classes with the default class into a single class string.
    const [className, setClassName] = useState(() => buildClassName(defaultClass, additionalClasses));

    useEffect(() => {
        setClassName(buildClassName(defaultClass, additionalClasses));
    }, [defaultClass, additionalClasses]);

    return className;
}

export default useClassName;