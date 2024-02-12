export default function formDataToType<T extends {}>(data: FormData): T{
    return {
        ...data
    } as unknown as T
}