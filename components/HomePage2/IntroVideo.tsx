export function IntroVideo(){
    return (
        <iframe 
            className="z-10 aspect-video lg:w-[900px] xs:w-full" 
            src="https://www.youtube.com/embed/Zz_DBq4yfng?si=whgsgc43ZVWBWwl_" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen/>
    );
}