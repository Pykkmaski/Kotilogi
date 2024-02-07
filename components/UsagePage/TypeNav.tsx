import Link from "next/link";
import { Group } from "../Group";

export function TypeNav(){
    return (
        <nav>
            <Group direction="row" gap={4} align="center">
                <Link href="?type=heat">Lämmitys</Link>
                <Link href="?type=water">Vesi</Link>
                <Link href="?type=electric">Sähkö</Link>
            </Group>
        </nav>
    );
}