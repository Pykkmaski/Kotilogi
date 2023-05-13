import { useEffect, useState } from "react";

function useClassName(defaultClass, additionalClasses){
    if(typeof(defaultClass) !== 'string' || (additionalClasses && typeof(additionalClasses) !== 'string')) throw new Error('useClassName: ' + 'Arguments must be strings!');
    const [className, setClassName] = useState(defaultClass);

    useEffect(() => {
        const newClassName = [defaultClass].concat(additionalClasses ? additionalClasses.split(' ') : '').join(' ');
        setClassName(newClassName);
    }, [defaultClass, additionalClasses]);

    return [className, setClassName];
}

export default useClassName;