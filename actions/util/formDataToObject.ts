export function formDataToObject(formData: FormData){
    const obj = {};

    formData.forEach((key, value) => {
        if(key instanceof File){
            obj['file'] = key;
        }
        else{
            obj[value] = key;
        }
    });

    console.log(obj);
    return obj;
}