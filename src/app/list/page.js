"use client";

import Navbar from "@/components/header/Navbar/Navbar";
import ListTable from "@/components/list/ListTable/ListTable";
import { PrimeReactProvider } from 'primereact/api';
import { useState, useEffect, useRef } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function List() {
    const fetchedData = {
        movies: [
            {
                id: 623,
                score: 8.7,
                status: "Watched"
            },
            {
                id: 728,
                score: 9.2,
                status: "Planned To Watch"
            },
            {
                id: 628,
                score: null,
                status: "Dropped"
            }
        ],
        shows: [

        ]
    }

    const [displayData, setDisplayData] = useState(fetchedData.movies);

    return (
        <PrimeReactProvider>
            <div className="h-full">
                <Navbar active="list"/>
                <div className="fixed w-full h-screen bg-haiti mx-auto">
                    <div className="flex justify-center mt-20">
                        <ListTable data={displayData}/>
                    </div>
                </div> 
            </div>
        </PrimeReactProvider>
    )
}