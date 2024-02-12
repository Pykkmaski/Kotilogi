import { Padding } from "@/components/Util/Padding";
import { Group } from "kotilogi-app/components/Group";
import { Header } from "kotilogi-app/components/Header/Header";
import { SecondaryHeading } from "kotilogi-app/components/Heading";
import IconLink from "kotilogi-app/components/IconLink/IconLink";
import { Layout } from "kotilogi-app/components/Layout";
import { NavBar } from "kotilogi-app/components/NavBar/NavBar";
import { SplitScreen } from "kotilogi-app/components/SplitScreen/SplitScreen";
import db from "kotilogi-app/dbconfig"
import Link from "next/link";

export default async function EventLayout({children, params}){
    const event = await db('propertyEvents').where({id: params.event_id}).first();
    if(!event) throw new Error('Tapahtuman lataus epäonnistui!');

    return (
        <Layout>
            <Padding>
                

                <div className="flex gap-4">
                    <div className="flex-1 flex flex-col gap-4">
                        <Header>
                            <Group direction="col" gap={0}>
                                <SecondaryHeading>Tapahtuma</SecondaryHeading>
                                <span className="text-black text-xl">{event.title}</span>
                            </Group>
                        </Header>

                        <NavBar>
                            <IconLink href={`info`} imageSrc="/icons/info.png">Tiedot</IconLink>
                            <IconLink href={'images'} imageSrc='/icons/image.png'>Kuvat</IconLink>
                            <IconLink href={'files'} imageSrc="/icons/copy.png">Tiedostot</IconLink>
                            <Link href={`/properties/${event.refId}/events`}>Takaisin Tapahtumiin</Link>
                        </NavBar>
                    </div>
                    

                    <div className="ml-8 mb-8 flex-[9]">
                        {children}
                    </div>
                </div>
            </Padding>
            
        </Layout>
    )
}