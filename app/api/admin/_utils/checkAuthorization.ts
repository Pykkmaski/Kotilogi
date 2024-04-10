export function checkAuthorization(auth: string){
    return auth === process.env.API_KEY;
}