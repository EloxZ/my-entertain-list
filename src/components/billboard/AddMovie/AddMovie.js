import React, { useEffect } from 'react'
import { useState } from 'react';
import styles from './AddMovie.module.css';
import ElectricButton from '@/components/global/ElectricButton/ElectricButton';
import RedButton from '@/components/global/RedButton/RedButton';
import PencilSVG from '@/components/icons/PencilSVG/PencilSVG';
import BinSVG from '@/components/icons/BinSVG/BinSVG';
import LoadingSVG from '@/components/icons/LoadingSVG/LoadingSVG';
import OkSVG from '@/components/icons/OkSVG/OkSVG';
import AddSVG from '@/components/icons/AddSVG/AddSVG';
import ErrorSVG from '@/components/icons/ErrorSVG/ErrorSVG';


export default function AddMovie(props) {
  const [scoreInput, setScoreInput] = useState(0);
  const [statusInput, setStatusInput] = useState("plan");
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackIcon, setFeedbackIcon] = useState();

  useEffect(()=>{
    if (props.movieListData) {
      setScoreInput(props.movieListData.score);
      setStatusInput(props.movieListData.status);
    }
  }, [props.movieListData]);

  return (
    <div className={styles.addMovie}>
      {formEntry("Status",
        <select
            name="status"
            id="statusInput"
            value={statusInput}
            onChange={(event)=>{
              setStatusInput(event.target.value);
            }}
          >
          <option value="plan">Planned To Watch</option>
          <option value="watched">Watched</option>
          <option value="dropped">Dropped</option>
        </select>
      )}
      {formEntry("Score", <input 
        value={scoreInput}
        type="number"
        id="scoreInput" 
        min="0"
        max="10" 
        name="score" 
        step="0.05" 
        pattern="\d+(\.\d{2})?" 
        maxLength={3}
        onChange={(event)=>updateNumberInput(event.target.value, 10, setScoreInput)}
        ></input>)}
      <div className='flex gap-4 justify-around mt-8'>
        <div className='flex gap-4 items-center'>
          <ElectricButton
            icon={(props.movieListData)? <PencilSVG/> : <AddSVG/>}
            text={(props.movieListData)? "Edit" : "Add"}
            onClick={()=>{if(!isLoading) {
              onAddMovie(
                props.addMovieToList,
                statusInput,
                scoreInput,
                props.titleId,
                props.setMovieListData,
                setFeedbackIcon,
                setIsLoading,
                props.moviesListData
              );
            }}}
          />
          {feedbackIcon}
        </div>
        
        {(props.movieListData)? <RedButton
          text="Remove"
          icon={<BinSVG/>}
          onClick={()=>{if(!isLoading) {
            onDeleteMovie(
              props.deleteMovieFromList,
              setIsLoading,
              props.titleId,
              props.setMovieListData,
              props.moviesListData,
              setFeedbackIcon
            );
          }}}
          /> : undefined}
      </div>
    </div>
  )
}

function onAddMovie(addMovieToList, statusInput, scoreInput, titleId, setMovieListData, setFeedbackIcon, setIsLoading, moviesListData) {
  if (addMovieToList && titleId && setFeedbackIcon && setIsLoading) {
    const movie = {
      id: titleId,
      status: statusInput,
      score: isNaN(scoreInput) ? 0 : scoreInput,
    }
    setIsLoading(true);
    setFeedbackIcon(<LoadingSVG/>);
    addMovieToList("6318cdd7b4629f715e57e8b6", movie).then((data)=>{
      setIsLoading(false);

      if (data.message === "Movie added to list") {
        setFeedbackIcon(<OkSVG/>);
        if (setMovieListData) {
          setMovieListData(movie);
          if (moviesListData) {
            const oldMovieIndex = moviesListData.findIndex(oldMovie=>oldMovie.id == movie.id);
  
            if (oldMovieIndex != -1) {
              moviesListData[oldMovieIndex] = {...movie};
            } else {
              moviesListData.push({...movie});
            }
          }
        }
      } else {
        setFeedbackIcon(<ErrorSVG/>);
      }
    });
  }
}

function onDeleteMovie(deleteMovieFromList, setIsLoading, titleId, setMovieListData, moviesListData, setFeedbackIcon) {
  if (deleteMovieFromList && titleId && setIsLoading && setMovieListData && moviesListData && setFeedbackIcon) {
    setIsLoading(true);
    setFeedbackIcon(<LoadingSVG/>);
    deleteMovieFromList("6318cdd7b4629f715e57e8b6", titleId).then((data)=>{
      setIsLoading(false);
      
      if (data.message === "Movie removed from list") {
        setFeedbackIcon(<OkSVG/>);
        if (setMovieListData) {
          setMovieListData(undefined);
          if (moviesListData) {
            const movieIndex = moviesListData.findIndex(movie=>movie.id == titleId);

            if (movieIndex != -1) {
              moviesListData.splice(movieIndex, 1);
            }
          }
        }
      } else {
        setFeedbackIcon(<ErrorSVG/>);
      }
    });
  }
}

function updateNumberInput(value, maxValue, setInput) {
  let number = convertToNumber(value);
  if (number > maxValue) number = maxValue;
  setInput(number);
}

function convertToNumber(value) {
  const numericString = value.replace(/[^0-9.]/g, '');
  return parseFloat(numericString);
}

function formEntry(label, input, secondLabel) {
  if (!label) {
      return <></>
  }
  
  return (
      <div className='flex gap-4 items-center justify-start mt-2'>
          <a className='w-44 uppercase text-right'>{label}</a>
          {input}
          <a className='uppercase text-right'>{secondLabel}</a>
      </div>
  )
}