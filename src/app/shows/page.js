"use client";

import AddShow from "@/components/billboard/AddShow/AddShow";
import ShowInfo from "@/components/billboard/ShowInfo/ShowInfo";
import TitleOverview from "@/components/billboard/TitleOverview/TitleOverview";
import Titles from "@/components/billboard/Titles/Titles";
import TrailerVideo from "@/components/billboard/TrailerVideo/TrailerVideo";
import Navbar from "@/components/header/Navbar/Navbar";
import { getAiringTodayShows, getOnTheAirShows, getPopularShows, getTopRatedShows, getSearchShows, getShowTrailer, getShowDetails } from "@/features/shows/data";
import { ShowCategories } from "@/utils/title-filter";
import { useState, useEffect, useRef } from "react";

export default function Shows() {
    const PAGE_LIMIT = 200;
    const TITLES_PER_PAGE = 20;
    const searchRef = useRef(null);

    const [selectedCategory, setSelectedCategory] = useState(ShowCategories.airingToday.tag);
    const [titles, setTitles] = useState();
    const [selectedTitle, setSelectedTitle] = useState();
    const [trailer, setTrailer] = useState();
    const [showDetails, setShowDetails] = useState();

    const [savedAiringTodayShows, setSavedAiringTodayShows] = useState();
    const [savedOnTheAirShows, setSavedOnTheAirShows] = useState();
    const [savedPopularShows, setSavedPopularShows] = useState();
    const [savedTopRatedShows, setSavedTopRatedShows] = useState();

    const searchShows = (event, page) => {
        if (!page) page = 1;
        setSelectedCategory(undefined);
        getSearchShows(searchRef.current.value, page).then((value)=>{
            setTitles(value.data);
        });
    }

    const fetchNewPage = (page) => {
        switch (selectedCategory) {
            case ShowCategories.airingToday.tag:
                getAiringTodayShows(page).then((value)=>{
                    setSavedAiringTodayShows(value.data);
                    if (selectedCategory === ShowCategories.airingToday.tag) setTitles(value.data);
                });
                break;
            case ShowCategories.onTheAir.tag:
                getOnTheAirShows(page).then((value)=>{
                    setSavedOnTheAirShows(value.data);
                    if (selectedCategory === ShowCategories.onTheAir.tag) setTitles(value.data);
                });
                break;
            case ShowCategories.popular.tag:
                getPopularShows(page).then((value)=>{
                    setSavedPopularShows(value.data);
                    if (selectedCategory === ShowCategories.popular.tag) setTitles(value.data);
                });
                break;
            case ShowCategories.topRated.tag:
                getTopRatedShows(page).then((value)=>{
                    setSavedTopRatedShows(value.data);
                    if (selectedCategory === ShowCategories.topRated.tag) setTitles(value.data);
                });
                break;
            default:
                searchShows(null, page);
        }
        
    }

    useEffect(()=>{
        getAiringTodayShows(1).then((value)=>{
            setSavedAiringTodayShows(value.data);
            if (selectedCategory === ShowCategories.airingToday.tag) {
                setTitles(value.data);
                setSelectedTitle({...value.data.results[0]});
            };
        });
        getOnTheAirShows(1).then((value)=>{
            setSavedOnTheAirShows(value.data);
            if (selectedCategory === ShowCategories.onTheAir.tag) {
                setTitles(value.data);
                setSelectedTitle({...value.data.results[0]});
            };
        });
        getPopularShows(1).then((value)=>{
            setSavedPopularShows(value.data);
            if (selectedCategory === ShowCategories.popular.tag) {
                setTitles(value.data);
                setSelectedTitle({...value.data.results[0]});
            };
        });
        getTopRatedShows(1).then((value)=>{
            setSavedTopRatedShows(value.data);
            if (selectedCategory === ShowCategories.topRated.tag) {
                setTitles(value.data);
                setSelectedTitle({...value.data.results[0]});
            };
        });

    }, []);

    useEffect(()=>{
        let selectedTitles;
        switch (selectedCategory) {
            case ShowCategories.airingToday.tag:
                selectedTitles = savedAiringTodayShows;
                break;
            case ShowCategories.onTheAir.tag:
                selectedTitles = savedOnTheAirShows;
                break;
            case ShowCategories.popular.tag:
                selectedTitles = savedPopularShows;
                break;
            case ShowCategories.topRated.tag:
                selectedTitles = savedTopRatedShows;
                break;
            default:
        }
        
        if (selectedTitles) setTitles(selectedTitles);
    }, [selectedCategory]);

    useEffect(()=>{
        if (selectedTitle) {
            getShowTrailer(selectedTitle.id).then((value) => {
                setTrailer(value.res);
            });
            getShowDetails(selectedTitle.id).then((value) => {
                setShowDetails(value.data);
            });
        }
    }, [selectedTitle]);

    const [currentSection, setCurrentSection] = useState("titles");

    const titlesSection = <div className="mt-6">
        <Titles
            titles={titles}
            categories={ShowCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            titlesPerPage={TITLES_PER_PAGE}
            pageLimit={PAGE_LIMIT}
            setCurrentPage={fetchNewPage}
            onSearch={searchShows}
            searchRef={searchRef}
            setSelectedTitle={setSelectedTitle}
            selectedTitle={selectedTitle}
            setCurrentSection={setCurrentSection}
        />
    </div>
    const infoSection = <ShowInfo showDetails={showDetails}/>
    const addShowSection = <AddShow/>
    const trailerSection = <TrailerVideo trailer={trailer}/>
    
    const section = (currentSection) => {
        switch(currentSection) {
            case "titles":
                return titlesSection;
            case "info":
                return infoSection;
            case "trailer":
                return trailerSection;
            case "add":
                return addShowSection;
        }
    }

    return (
        <div className="h-full">
            <Navbar active="shows"/>
            <TitleOverview 
                selectedTitle={selectedTitle} 
                setCurrentSection={setCurrentSection} 
                currentSection={currentSection}
                isTrailerAvailable={trailer != null}
            />
            <div className="fixed w-full h-screen bg-haiti mx-auto">
                <div className="flex justify-center">
                    {section(currentSection)}
                </div>
            </div> 
        </div>
    )
}