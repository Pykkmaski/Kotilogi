export default function contentTypeError(functionName: string, contentType: any, message: string){
    throw new Error(`${functionName}: Received unsupported content type (${contentType})! ${message}`);
}