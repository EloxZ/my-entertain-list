"use client";

import TitleOverview from "@/components/billboard/TitleOverview/TitleOverview";
import Titles from "@/components/billboard/Titles/Titles";
import Navbar from "@/components/header/Navbar/Navbar";
import { MovieCategories } from "@/utils/title-filter";
import { useState } from "react";

export default function Movies() {
    const PAGE_LIMIT = 100;
    const TITLES_PER_PAGE = 60;
    const [selectedCategory, setSelectedCategory] = useState(MovieCategories.nowPlaying.tag);
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="h-full">
            <Navbar/>
            <TitleOverview/>
            <div className="fixed w-full h-screen bg-haiti mx-auto">
                <div className="flex justify-center mt-6">
                    <Titles
                        categories={MovieCategories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        titlesPerPage={TITLES_PER_PAGE}
                        pageLimit={PAGE_LIMIT}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pages={1}
                    />
                </div>
            </div>
            
        </div>
    )
}