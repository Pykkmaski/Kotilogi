export default function formDataToType<T>(data: FormData): T{
    return {
        ...data
    } as T
}