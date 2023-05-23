import { useEffect } from "react";

function RegisterThankYou(props){
    useEffect(() => {
        setTimeout(() => {
            location.assign('/#/login');
        }, 2000);
    }, []);
    return(
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h1>Kiitos Rekisteröitymisestä!</h1>
            <span>Sinut uudelleenohjataan sisäänkirjautumiseen hetken kuluttua...</span>
        </div>
    );
}

export default RegisterThankYou;