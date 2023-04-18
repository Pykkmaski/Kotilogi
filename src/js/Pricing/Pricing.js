import './Style.scss';

function Pricing(props){
    return (
        <div className="page" id="pricing-page">
            <div className="page-element" id="tier-list">
                <div className="card" id="free-tier">
                    <header className="card-header">
                        <h1>Yksityinen</h1>
                        <h2>
                            <span className="big-text">1,19</span>
                            <span className="small-text">€/kk</span>
                        </h2>
                    </header>

                    <div className="card-body">
                        <header>
                            <h1>Kenelle</h1>
                        </header>
                        <p>
                            Yksityishenkilöille jotka omistavat korkeintaan kaksi asuntoa tai mökkiä.
                        </p>
                    </div>
                </div>

                <div className="card">
                    <header className="card-header">
                        <h1>Perus</h1>
                        <h2>
                            <span className="big-text">4,90</span>
                            <span className="small-text">€/kk</span>
                        </h2>
                    </header>

                    <div className="card-body">
                        <header>
                            <h1>Kenelle</h1>
                        </header>
                        <p>
                           Asuntosijoittajille.
                        </p>
                    </div>
                </div>

                <div className="card">
                    <header className="card-header">
                        <h1>Pro</h1>
                        <h2>
                            <span className="big-text">5,99</span>
                            <span className="small-text">€/kk</span>
                        </h2>
                    </header>

                    <div className="card-body">
                        <header>
                            <h1>Kenelle</h1>
                        </header>
                        <p>
                            Kaikille pikipruukeille jokka vuokroo nistiille kämppää.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing;