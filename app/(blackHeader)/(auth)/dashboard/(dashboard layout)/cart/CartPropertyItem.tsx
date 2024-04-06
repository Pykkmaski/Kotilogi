'use client';

import { useEffect, useState } from "react";
import * as database from '@/actions/database';
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner/Spinner";

type CartItemProps = {
    property: Kotilogi.PropertyType;
}

export function CartPropertyItem({property}: CartItemProps){

    return (
        <div className="flex justify-between items-center rounded-lg shadow-md p-2 bg-white">
           <div className="flex flex-row gap-8">
                <div className="flex flex-col">
                    <small className="text-sm text-slate-500">Osoite</small>
                    <span className="text-base">{property.title}</span>
                </div>

                <div className="flex flex-col">
                    <small className="text-sm text-slate-500">Kiinteistötunnus</small>
                    <span className="text-base">{property.propertyNumber}</span>
                </div>
            </div>

            <div className="flex flex-col">
                <small className="text-slate-500">Määrä</small>
                <span className="text-green-700">9,90€</span>
            </div>
            
        </div>
    );
}