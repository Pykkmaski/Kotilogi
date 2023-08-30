import { useEffect } from "react";

function RegisterThankYou(props){
    useEffect(() => {
        setTimeout(() => {
            location.assign('/#/login');
        }, 2000);
    }, []);
    return(
        <div id="register-thank-you-page">
            <h1>Kiitos Rekisteröitymisestä!</h1>
            <span>Sinut uudelleenohjataan sisäänkirjautumiseen hetken kuluttua...</span>
        </div>
    );
}

export default RegisterThankYou;