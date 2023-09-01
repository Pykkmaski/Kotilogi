export default function processFormData<T>(data: FormData): T{
    return {
        ...data
    } as T
}