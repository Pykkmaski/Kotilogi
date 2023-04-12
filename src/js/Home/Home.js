import './Style.scss';
import { useEffect, useRef, useState } from 'react';
import { serviceName } from '../appconfig';
import {Link} from 'react-router-dom';

function Home(props){

    const [content, setContent] = useState([]);

    return(
        <>
            <div id="home-page" className="page">
                <div id="welcome-text-box" className="page-element">
                    <div id="welcome-text">
                        <h1 id="home-page-intro-text">"Talosi Huoltokirja"</h1>
                        <h2>Korjaushistoria, kulutustiedot, kuvat matkan varrelta.<br/> Kaikki tallessa yhdessä paikassa</h2>
                        <Link to="/register" id="create-acc-link" className="primary-button">Aloita Ilmainen Kokeilu</Link>
                    </div>

                    <div id="animated-squares">
                        <img src="./img/people1.jpg" id="main-image"/>
                    </div>
                </div>

                <div className="page-element" id="news-content">
                    <div className="news-box">
                        <h1>Uutisjäbä</h1>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam nulla porttitor massa id neque aliquam vestibulum. Adipiscing elit pellentesque habitant morbi tristique senectus et netus et. Aliquet lectus proin nibh nisl condimentum. Eu ultrices vitae auctor eu. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Netus et malesuada fames ac turpis egestas integer eget. Aenean et tortor at risus viverra. Tortor posuere ac ut consequat semper viverra nam libero. Magna etiam tempor orci eu lobortis. In pellentesque massa placerat duis ultricies lacus sed turpis. Vitae proin sagittis nisl rhoncus mattis. Sagittis orci a scelerisque purus. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque. Interdum posuere lorem ipsum dolor sit amet consectetur. Arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales. Vulputate dignissim suspendisse in est ante in nibh. Iaculis at erat pellentesque adipiscing commodo elit at.

Sed augue lacus viverra vitae congue eu consequat ac. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Eu mi bibendum neque egestas congue quisque. Massa id neque aliquam vestibulum morbi blandit. Condimentum lacinia quis vel eros donec ac odio tempor. Quis risus sed vulputate odio ut. Proin sed libero enim sed faucibus turpis in. A cras semper auctor neque vitae tempus quam pellentesque. Dictum non consectetur a erat nam at. Lorem ipsum dolor sit amet consectetur adipiscing. Mattis ullamcorper velit sed ullamcorper morbi. Egestas maecenas pharetra convallis posuere morbi leo. Lacus luctus accumsan tortor posuere ac ut consequat semper viverra. Nibh mauris cursus mattis molestie a iaculis at. Placerat orci nulla pellentesque dignissim enim sit amet venenatis. Mi ipsum faucibus vitae aliquet nec ullamcorper. Mattis molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim convallis aenean et tortor at.

Massa sed elementum tempus egestas sed sed risus. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Sem et tortor consequat id. Vel pharetra vel turpis nunc eget. Non arcu risus quis varius quam quisque. Sollicitudin tempor id eu nisl. Est placerat in egestas erat imperdiet sed euismod nisi. Cursus mattis molestie a iaculis at erat. Egestas diam in arcu cursus. Nisi scelerisque eu ultrices vitae auctor eu augue. Et netus et malesuada fames ac turpis egestas integer. Tempus urna et pharetra pharetra massa massa ultricies mi quis. Aenean sed adipiscing diam donec adipiscing tristique risus. Nec ullamcorper sit amet risus nullam eget felis eget. Viverra adipiscing at in tellus integer. Adipiscing diam donec adipiscing tristique risus nec feugiat in. In est ante in nibh mauris cursus mattis molestie. Feugiat pretium nibh ipsum consequat nisl vel. Eget gravida cum sociis natoque penatibus et magnis. Neque convallis a cras semper auctor neque vitae.
                        </p>

                        <h2>
                            Lisää settiä
                        </h2>

                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam nulla porttitor massa id neque aliquam vestibulum. Adipiscing elit pellentesque habitant morbi tristique senectus et netus et. Aliquet lectus proin nibh nisl condimentum. Eu ultrices vitae auctor eu. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Netus et malesuada fames ac turpis egestas integer eget. Aenean et tortor at risus viverra. Tortor posuere ac ut consequat semper viverra nam libero. Magna etiam tempor orci eu lobortis. In pellentesque massa placerat duis ultricies lacus sed turpis. Vitae proin sagittis nisl rhoncus mattis. Sagittis orci a scelerisque purus. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque. Interdum posuere lorem ipsum dolor sit amet consectetur. Arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales. Vulputate dignissim suspendisse in est ante in nibh. Iaculis at erat pellentesque adipiscing commodo elit at.

Sed augue lacus viverra vitae congue eu consequat ac. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Eu mi bibendum neque egestas congue quisque. Massa id neque aliquam vestibulum morbi blandit. Condimentum lacinia quis vel eros donec ac odio tempor. Quis risus sed vulputate odio ut. Proin sed libero enim sed faucibus turpis in. A cras semper auctor neque vitae tempus quam pellentesque. Dictum non consectetur a erat nam at. Lorem ipsum dolor sit amet consectetur adipiscing. Mattis ullamcorper velit sed ullamcorper morbi. Egestas maecenas pharetra convallis posuere morbi leo. Lacus luctus accumsan tortor posuere ac ut consequat semper viverra. Nibh mauris cursus mattis molestie a iaculis at. Placerat orci nulla pellentesque dignissim enim sit amet venenatis. Mi ipsum faucibus vitae aliquet nec ullamcorper. Mattis molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim convallis aenean et tortor at.

Massa sed elementum tempus egestas sed sed risus. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Sem et tortor consequat id. Vel pharetra vel turpis nunc eget. Non arcu risus quis varius quam quisque. Sollicitudin tempor id eu nisl. Est placerat in egestas erat imperdiet sed euismod nisi. Cursus mattis molestie a iaculis at erat. Egestas diam in arcu cursus. Nisi scelerisque eu ultrices vitae auctor eu augue. Et netus et malesuada fames ac turpis egestas integer. Tempus urna et pharetra pharetra massa massa ultricies mi quis. Aenean sed adipiscing diam donec adipiscing tristique risus. Nec ullamcorper sit amet risus nullam eget felis eget. Viverra adipiscing at in tellus integer. Adipiscing diam donec adipiscing tristique risus nec feugiat in. In est ante in nibh mauris cursus mattis molestie. Feugiat pretium nibh ipsum consequat nisl vel. Eget gravida cum sociis natoque penatibus et magnis. Neque convallis a cras semper auctor neque vitae.
                        </p>
                    </div>
                </div>

                <div className="page-element" id="home-page-footer">
                    <div id="main-links">
                        <h2>Päälinkit</h2>
                        <Link to="">Etusivu</Link>
                        <Link to="">Tietoa</Link>
                        <Link to="">Hinnasto</Link>
                        <Link to="">Tarina</Link>
                        <Link to="">Ota yhteyttä</Link>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default Home;