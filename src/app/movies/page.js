"use client";

import AddMovie from "@/components/billboard/AddMovie/AddMovie";
import MovieInfo from "@/components/billboard/MovieInfo/MovieInfo";
import TitleOverview from "@/components/billboard/TitleOverview/TitleOverview";
import Titles from "@/components/billboard/Titles/Titles";
import TrailerVideo from "@/components/billboard/TrailerVideo/TrailerVideo";
import Navbar from "@/components/header/Navbar/Navbar";
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, getSearchMovies, getMovieTrailer, getMovieDetails, getListMovies, addMovieToList, deleteMovieFromList } from "@/features/movies/data";
import { MovieCategories } from "@/utils/title-filter";
import { useState, useEffect, useRef } from "react";

export default function Movies() {
    const PAGE_LIMIT = 200;
    const TITLES_PER_PAGE = 20;
    const searchRef = useRef(null);

    const [selectedCategory, setSelectedCategory] = useState(MovieCategories.nowPlaying.tag);
    const [titles, setTitles] = useState();
    const [selectedTitle, setSelectedTitle] = useState();
    const [trailer, setTrailer] = useState();
    const [movieDetails, setMovieDetails] = useState();
    const [movieListData, setMovieListData] = useState();
    const [moviesListData, setMoviesListData] = useState();

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
            if (selectedCategory === MovieCategories.nowPlaying.tag) {
                setTitles(value.data);
                setSelectedTitle({...value.data.results[0]});
            };
        });
        getPopularMovies(1).then((value)=>{
            setSavedPopularMovies(value.data);
            if (selectedCategory === MovieCategories.popular.tag) {
                setTitles(value.data);
                setSelectedTitle({...value.data.results[0]});
            };
        });
        getTopRatedMovies(1).then((value)=>{
            setSavedTopRatedMovies(value.data);
            if (selectedCategory === MovieCategories.topRated.tag) {
                setTitles(value.data);
                setSelectedTitle({...value.data.results[0]});
            };
        });
        getUpcomingMovies(1).then((value)=>{
            setSavedUpcomingMovies(value.data);
            if (selectedCategory === MovieCategories.upcoming.tag) {
                setTitles(value.data);
                setSelectedTitle({...value.data.results[0]});
            };
        });

        getListMovies("6318cdd7b4629f715e57e8b6").then((value) => {
            const movies = value.movies ?? undefined;
            if (movies) {
                setMoviesListData(movies);
            }
        });

    }, []);

    useEffect(()=>{
        if (selectedTitle) {
            setMovieListData(moviesListData.find(movie=>movie.id == selectedTitle.id));
        }
    }, [moviesListData]);

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

    useEffect(()=>{
        if (selectedTitle) {
            if (moviesListData) {
                setMovieListData(moviesListData.find(movie=>movie.id == selectedTitle.id));
            }

            getMovieTrailer(selectedTitle.id).then((value) => {
                setTrailer(value.res);
            });
            getMovieDetails(selectedTitle.id).then((value) => {
                setMovieDetails(value.data);
            });
        }
    }, [selectedTitle]);

    const [currentSection, setCurrentSection] = useState("titles");

    const titlesSection = <div className="mt-6">
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
            setCurrentSection={setCurrentSection}
        />
    </div>

    const infoSection = <MovieInfo movieDetails={movieDetails}/>
    const addMovieSection = <AddMovie
        movieListData={movieListData}
        moviesListData={moviesListData}
        addMovieToList={addMovieToList}
        setMovieListData={setMovieListData}
        titleId={selectedTitle?.id}
        deleteMovieFromList={deleteMovieFromList}
    />
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
                return addMovieSection;
        }
    }

    return (
        <div className="bg-haiti">
            <Navbar active="movies"/>
            <div className="overview-space">
                <TitleOverview 
                    selectedTitle={selectedTitle} 
                    setCurrentSection={setCurrentSection} 
                    currentSection={currentSection}
                    isTrailerAvailable={trailer != null}
                    isAdded={movieListData != null}
                />
            </div>
            <div className="w-full mx-auto">
                <div className="flex justify-center">
                    {section(currentSection)}
                </div>
            </div> 
        </div>
    )
}