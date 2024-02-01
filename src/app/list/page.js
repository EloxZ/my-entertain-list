"use client";

import Navbar from "@/components/header/Navbar/Navbar";
import Lists from "@/components/list/Lists/Lists";

export default function List() {
    return (
        <div className="list-wrapper bg-haiti">
            <Navbar active="list"/>
            <div className="flex justify-center mt-20">
                <Lists/>
            </div>
        </div>
    )
}