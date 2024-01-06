'use client';

import { SplitScreen } from "kotilogi-app/components/SplitScreen/SplitScreen";
import style from './layout.module.scss';
import { useState } from "react";
import Link from "next/link";
import { NavBar } from "kotilogi-app/components/NavBar/NavBar";
import { HeaderButtons } from "./properties/page.components";
import IconLink from "kotilogi-app/components/IconLink/IconLink";
import { Header } from "kotilogi-app/components/Header/Header";
import { Layout } from "kotilogi-app/components/Layout/Layout";

export default function DashboardLayout({children}){
    return (
        <Layout>
            <Header>
                <h3>Hallintapaneeli</h3>
            </Header>
            <SplitScreen rightWeight={9} gap="1rem">
                <NavBar>
                    <IconLink imageSrc="/icons/house.png" href="/dashboard/properties">Talot</IconLink>
                    <IconLink imageSrc="/icons/settings.png" href="/dashboard/settings">Asetukset</IconLink>
                </NavBar>
                {children}
            </SplitScreen>
        </Layout>
    );
}