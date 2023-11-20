"use client";

import TitleOverview from "@/components/billboard/TitleOverview/TitleOverview";
import Titles from "@/components/billboard/Titles/Titles";
import Navbar from "@/components/header/Navbar/Navbar";
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, getSearchMovies } from "@/features/movies/data";
import { MovieCategories } from "@/utils/title-filter";
import { useState, useEffect, useRef } from "react";

export default function Movies() {
    const PAGE_LIMIT = 200;
    const TITLES_PER_PAGE = 20;
    const searchRef = useRef(null);

    const [selectedCategory, setSelectedCategory] = useState(MovieCategories.nowPlaying.tag);
    const [titles, setTitles] = useState();
    const [selectedTitle, setSelectedTitle] = useState();

    const [savedNowPlayingMovies, setSavedNowPlayingMovies] = useState();
    const [savedPopularMovies, setSavedPopularMovies] = useState();
    const [savedTopRatedMovies, setSavedTopRatedMovies] = useState();
    const [savedUpcomingMovies, setSavedUpcomingMovies] = useState();

    const searchMovies = (event, page) => {
        if (!page) page = 1;
        setSelectedCategory(undefined);
        getSearchMovies(searchRef.current.value, page).then((value)=>{
            setTitles(value.data);
        });
    }

    const fetchNewPage = (page) => {
        switch (selectedCategory) {
            case MovieCategories.nowPlaying.tag:
                getNowPlayingMovies(page).then((value)=>{
                    setSavedNowPlayingMovies(value.data);
                    if (selectedCategory === MovieCategories.nowPlaying.tag) setTitles(value.data);
                });
                break;
            case MovieCategories.popular.tag:
                getPopularMovies(page).then((value)=>{
                    setSavedPopularMovies(value.data);
                    if (selectedCategory === MovieCategories.popular.tag) setTitles(value.data);
                });
                break;
            case MovieCategories.topRated.tag:
                getTopRatedMovies(page).then((value)=>{
                    setSavedTopRatedMovies(value.data);
                    if (selectedCategory === MovieCategories.topRated.tag) setTitles(value.data);
                });
                break;
            case MovieCategories.upcoming.tag:
                getUpcomingMovies(page).then((value)=>{
                    setSavedUpcomingMovies(value.data);
                    if (selectedCategory === MovieCategories.upcoming.tag) setTitles(value.data);
                });
                break;
            default:
                searchMovies(null, page);
        }
        
    }

    useEffect(()=>{
        getNowPlayingMovies(1).then((value)=>{
            setSavedNowPlayingMovies(value.data);
            if (selectedCategory === MovieCategories.nowPlaying.tag) setTitles(value.data);
        });
        getPopularMovies(1).then((value)=>{
            setSavedPopularMovies(value.data);
            if (selectedCategory === MovieCategories.popular.tag) setTitles(value.data);
        });
        getTopRatedMovies(1).then((value)=>{
            setSavedTopRatedMovies(value.data);
            if (selectedCategory === MovieCategories.topRated.tag) setTitles(value.data);
        });
        getUpcomingMovies(1).then((value)=>{
            setSavedUpcomingMovies(value.data);
            if (selectedCategory === MovieCategories.upcoming.tag) setTitles(value.data);
        });

    }, []);

    useEffect(()=>{
        console.log("Titles changed");
        console.log(titles);
    }, [titles]);

    useEffect(()=>{
        let selectedTitles;
        switch (selectedCategory) {
            case MovieCategories.nowPlaying.tag:
                selectedTitles = savedNowPlayingMovies;
                break;
            case MovieCategories.popular.tag:
                selectedTitles = savedPopularMovies;
                break;
            case MovieCategories.topRated.tag:
                selectedTitles = savedTopRatedMovies;
                break;
            case MovieCategories.upcoming.tag:
                selectedTitles = savedUpcomingMovies;
                break;
            default:
        }
        
        if (selectedTitles) setTitles(selectedTitles);
    }, [selectedCategory]);

    return (
        <div className="h-full">
            <Navbar/>
            <TitleOverview selectedTitle={selectedTitle}/>
            <div className="fixed w-full h-screen bg-haiti mx-auto">
                <div className="flex justify-center mt-6">
                    <Titles
                        titles={titles}
                        categories={MovieCategories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        titlesPerPage={TITLES_PER_PAGE}
                        pageLimit={PAGE_LIMIT}
                        setCurrentPage={fetchNewPage}
                        onSearch={searchMovies}
                        searchRef={searchRef}
                        setSelectedTitle={setSelectedTitle}
                        selectedTitle={selectedTitle}
                    />
                </div>
            </div> 
        </div>
    )
}