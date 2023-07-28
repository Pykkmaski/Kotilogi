import {Link} from 'react-router-dom';
import AppDescription from './AppDescription';
import WelcomeText from './WelcomeText';
import Footer from './Footer';
import ProfileText from './ProfileText';

function Index(props){

    
    return(
        <div id="home-page" className="page y-scroll">
            
            <WelcomeText/>
            <AppDescription/>
            <ProfileText/>
            <Footer/>
           
        </div>
    )
}

export default Index;