import { useParams } from "react-router-dom"
import {useState} from 'react';
import useProperty from '../Hooks/useProperty';
import Loading from "./Loading";
import CreatePropertySection from "../Functions/CreatePropertySection";
import PropertyHeader from "../Components/PropertyHeader";
import LoadingSpinner from "../Components/Spinner";

function Property2(props){
    const {id, section} = useParams();

    return (
        <div id="property-page" className="px-10 h-100">
            <div id="property-page-nav" className="px-5 border-right">
                <nav className="d-flex flex-column gap-1 pt-5">
                    <a className="cursor-pointer" href={`/#/property/${id}/events`}>Tapahtumat</a>
                    <a className="cursor-pointer" href={`/#/property/${id}/pictures`}>Kuvat</a>
                    <a className="cursor-pointer" href={`/#/property/${id}/files`}>Tiedostot</a>
                    <a className="cursor-pointer">Poista Talo</a>
                </nav>
            </div>

            <div id="property-page-content">
                {
                    CreatePropertySection(id, section)
                }
            </div>
            
        </div>
    )
}

export default Property2;