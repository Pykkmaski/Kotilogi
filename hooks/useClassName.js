import { useEffect, useState } from "react";

function buildClassName(defaultClass, additionalClasses){
    if(additionalClasses === null) return defaultClass;
    return [defaultClass].concat(additionalClasses.split(' ')).join(' ');
}

function useClassName(defaultClass, additionalClasses = null){
    
    ///Concatenates provided additional classes with the default class into a single class string.
    const [className, setClassName] = useState(() => buildClassName(defaultClass, additionalClasses));

    function addClass(newClassName){
        const oldClasses = className.split(' ');
        const newClasses = [...oldClasses, newClassName].join(' ');
        setClassName(newClasses);
    }

    function removeClass(classToBeRemoved){
        const oldClasses = className.split(' ');

        const index = oldClasses.indexOf(classToBeRemoved);
        if(index === -1) return;

        //Remove the specified class from the array
        oldClasses.splice(index, 1);

        const newClasses = [...oldClasses].join(' ');
        setClassName(newClasses);        
    }

    useEffect(() => {
        setClassName(buildClassName(defaultClass, additionalClasses));
    }, [defaultClass, additionalClasses]);

    return {className, addClass, removeClass};
}

export default useClassName;