
import React, { useEffect, useState, useRef } from 'react'
import ShowsList from '../ShowsList/ShowsList';
import { getListShows, getShowDetails } from '@/features/shows/data';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import LeftGroupButton from '@/components/global/LeftGroupButton/LeftGroupButton';
import RightGroupButton from '@/components/global/RightGroupButton/RightGroupButton';
import { getListMovies, getMovieDetails } from '@/features/movies/data';
import MoviesList from '../MoviesList/MoviesList';
import ShowSVG from '@/components/icons/ShowSVG/ShowSVG';
import MovieSVG from '@/components/icons/MovieSVG/MovieSVG';

export default function Lists() {
    const initialized = useRef(false);
    const [showsListData, setShowsListData] = useState();
    const [moviesListData, setMoviesListData] = useState();
    const [displayedList, setDisplayedList] = useState("shows");

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            getListShows("6318cdd7b4629f715e57e8b6").then((value) => {
                if (value.shows) {
                    const promises = value.shows.map((show, i) =>
                        getShowDetails(show.id).then((details) => {
                            const updatedShow = {
                                ...show,
                                number_of_episodes: details.data.number_of_episodes,
                                poster: details.data.poster_path,
                                name: details.data.name,
                                genres: details.data.genres
                            };
                            return updatedShow;
                        })
                    );
            
                    Promise.all(promises).then((updatedShows) => {
                        setShowsListData(updatedShows);
                    });
                }
            })
        }

        getListMovies("6318cdd7b4629f715e57e8b6").then((value) => {
            if (value.movies) {
                const promises = value.movies.map((movie, i) =>
                    getMovieDetails(movie.id).then((details) => {
                        const updatedMovie = {
                            ...movie,
                            poster: details.data.poster_path,
                            name: details.data.title,
                            genres: details.data.genres
                        };
                        return updatedMovie;
                    })
                );
        
                Promise.all(promises).then((updatedMovies) => {
                    setMoviesListData(updatedMovies);
                });
            }
        })
    }, []);


    return (
        <PrimeReactProvider>
            <div className='flex flex-col'>
                <div className='flex mb-4'>
                    <LeftGroupButton
                        text={<div className='flex gap-2 items-center h-10'><ShowSVG fill={(displayedList == "shows")? 'white' : 'black' }/><span>Shows</span></div>}
                        isSelected={displayedList == "shows"}
                        onClick={() => {setDisplayedList("shows")}}
                    />
                    <RightGroupButton
                        text={<div className='flex gap-2 items-center'><MovieSVG fill={(displayedList == "movies")? 'white' : 'black' }/><span>Movies</span></div>}
                        isSelected={displayedList == "movies"}
                        onClick={() => {setDisplayedList("movies")}}
                    />
                </div>
                {(displayedList == "shows")? <ShowsList data={showsListData} setData={setShowsListData} /> : <MoviesList data={moviesListData} setData={setMoviesListData} />
                }
            </div>
        </PrimeReactProvider>
    )
}

