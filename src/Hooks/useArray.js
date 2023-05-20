function useArray(defaultValue){
    const [array, setArray] = useState(defaultValue);

    function push(item){
        setArray([...array, item]);
    }

    function removeAt(index){
        const newArray = [...array];
        newArray.splice(index, 1);
        setArray(newArray);
    }

    return [array, removeAt, push];
}