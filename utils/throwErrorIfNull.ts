export function throwErrorIfNull(data: any, message: string): void{
    if(data === null) throw new Error(message);
}