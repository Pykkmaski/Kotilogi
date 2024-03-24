export function DescriptionSection(){

    const FeaturesList = () => {
        const FeatureCard = ({title, description}) => (
            <div className="flex flex-col text-center">
                <h2 className="text-2xl mb-8 font-semibold">{title}</h2>
                <p className="text-xl">
                    {description}
                </p>
            </div>
        );

        return (
            <div className="flex flex-row gap-8 z-10">
                <FeatureCard title="Remonttihistoria" description="Tallenna kaikki korjaustoimenpiteet kuvien ja kuittien kanssa."/>
                <FeatureCard title="Kulutusseuranta" description="Voit tallentaa talosi sähkön, lämmityksen ja veden kulutuksen ja seurata kokonaismenoja helposti."/>
                <FeatureCard title="Asiakirjat" description="Esimerkiksi talon pohjapiirustukset on hyvä pitää tallessa."/>
                <FeatureCard title="Kuvat" description="Ota kuvia talostasi vuosien varrella ja talleta ne tähän osioon."/>
            </div>
        );
    };

    const Background = () => (
        <div className="bg-kitchen bg-cover bg-center absolute top-0 left-0 w-full h-full opacity-80"/>
    );

    return (
        <section className="flex flex-col gap-4 py-10 bg-primary">
            <div className="flex flex-col text-white items-center py-32 relative">
                <Background/>
                <div className="w-full bg-[#0006] py-20 flex flex-col items-center z-10 px-32">
                    <h1 className="text-7xl mb-20 z-10 font-semibold">Kaikki yhdessä paikassa</h1>
                    <FeaturesList/>
                </div>
            </div>
        </section>
    );
}