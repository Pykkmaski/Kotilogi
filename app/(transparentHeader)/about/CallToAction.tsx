import Button from "@/components/Button/Button";
import Link from "next/link";

export function CallToAction(){
    return (
        <section className="flex flex-col justify-center items-center md:px-32 xs:px-4 py-32 bg-[#b8bc7f] text-white">
            <h1 className="md:text-7xl xs:text-5xl md:mb-10 xs:mb-20">Aloita sinäkin nyt.</h1>
            <Link href="/register">
                <Button variant="primary">
                    <span className="mx-8 text-secondary">Rekisteröidy</span>
                </Button>
            </Link>

            <p className="text-lg mt-10 md:text-left xs:text-center">
                Saat 30 päivän ajan tutustua palveluun ilmaiseksi.<br/>
                Yksittäisen talon vuosihinta on 9,90€.
            </p>
        </section>
    );
}