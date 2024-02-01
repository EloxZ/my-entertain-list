import React, { useEffect } from 'react'
import { useState } from 'react';
import styles from './AddShow.module.css';
import ElectricButton from '@/components/global/ElectricButton/ElectricButton';
import RedButton from '@/components/global/RedButton/RedButton';
import PencilSVG from '@/components/icons/PencilSVG/PencilSVG';
import BinSVG from '@/components/icons/BinSVG/BinSVG';
import LoadingSVG from '@/components/icons/LoadingSVG/LoadingSVG';
import OkSVG from '@/components/icons/OkSVG/OkSVG';
import AddSVG from '@/components/icons/AddSVG/AddSVG';
import ErrorSVG from '@/components/icons/ErrorSVG/ErrorSVG';


export default function AddShow(props) {
  const [scoreInput, setScoreInput] = useState(0);
  const [episodesInput, setEpisodesInput] = useState(0);
  const [statusInput, setStatusInput] = useState("plan");
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackIcon, setFeedbackIcon] = useState();
  const maxEpisodes = props.numberOfEpisodes ?? 0;

  useEffect(()=>{
    if (props.showListData) {
      setScoreInput(props.showListData.score);
      setEpisodesInput(props.showListData.episodes);
      setStatusInput(props.showListData.status);
    }
  }, [props.showListData]);

  return (
    <div className={styles.addShow}>
      {formEntry("Status",
        <select
            name="status"
            id="statusInput"
            value={statusInput}
            onChange={(event)=>{
              setStatusInput(event.target.value);
              autofillEpisodesInput(event.target.value, maxEpisodes, setEpisodesInput);
            }}
          >
          <option value="plan">Planned To Watch</option>
          <option value="watching">Watching</option>
          <option value="completed">Completed</option>
          <option value="hold">On Hold</option>
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
      {formEntry("Episodes", <input
        value={episodesInput}
        type="number"
        id="episodesInput" 
        min="0"
        max={maxEpisodes}
        name="episodes" 
        step="1" 
        pattern="\d?" 
        maxLength={3}
        onChange={(event)=>updateNumberInput(event.target.value, maxEpisodes, setEpisodesInput)}
        ></input>, (props.numberOfEpisodes)? "/ " + props.numberOfEpisodes : "")}

      <div className='flex gap-4 justify-around mt-8'>
        <div className='flex gap-4 items-center'>
          <ElectricButton
            icon={(props.showListData)? <PencilSVG/> : <AddSVG/>}
            text={(props.showListData)? "Edit" : "Add"}
            onClick={()=>{if(!isLoading) {
              onAddShow(
                props.addShowToList,
                statusInput,
                scoreInput,
                episodesInput,
                props.titleId,
                props.setShowListData,
                setFeedbackIcon,
                setIsLoading,
                props.showsListData
              );
            }}}
          />
          {feedbackIcon}
        </div>
        
        {(props.showListData)? <RedButton
          text="Remove"
          icon={<BinSVG/>}
          onClick={()=>{if(!isLoading) {
            onDeleteShow(
              props.deleteShowFromList,
              setIsLoading,
              props.titleId,
              props.setShowListData,
              props.showsListData,
              setFeedbackIcon
            );
          }}}
          /> : undefined}
      </div>
    </div>
  )
}

function onAddShow(addShowToList, statusInput, scoreInput, episodesInput, titleId, setShowListData, setFeedbackIcon, setIsLoading, showsListData) {
  if (addShowToList && titleId && setFeedbackIcon && setIsLoading) {
    const show = {
      id: titleId,
      status: statusInput,
      score: isNaN(scoreInput) ? 0 : scoreInput,
      episodes: isNaN(episodesInput) ? 0 : episodesInput
    }
    setIsLoading(true);
    setFeedbackIcon(<LoadingSVG/>);
    addShowToList("6318cdd7b4629f715e57e8b6", show).then((data)=>{
      setIsLoading(false);

      if (data.message === "Show added to list") {
        setFeedbackIcon(<OkSVG/>);
        if (setShowListData) {
          setShowListData(show);
          if (showsListData) {
            const oldShowIndex = showsListData.findIndex(oldShow=>oldShow.id == show.id);

            if (oldShowIndex != -1) {
              showsListData[oldShowIndex] = {...show};
            } else {
              showsListData.push({...show});
            }
          }
        }
      } else {
        setFeedbackIcon(<ErrorSVG/>);
      }
    });
  }
}

function onDeleteShow(deleteShowFromList, setIsLoading, titleId, setShowListData, showsListData, setFeedbackIcon) {
  if (deleteShowFromList && titleId && setIsLoading && setShowListData && showsListData && setFeedbackIcon) {
    setIsLoading(true);
    setFeedbackIcon(<LoadingSVG/>);
    deleteShowFromList("6318cdd7b4629f715e57e8b6", titleId).then((data)=>{
      setIsLoading(false);

      if (data.message === "Show removed from list") {
        setFeedbackIcon(<OkSVG/>);
        if (setShowListData) {
          setShowListData(undefined);
          if (showsListData) {
            const showIndex = showsListData.findIndex(show=>show.id == titleId);

            if (showIndex != -1) {
              showsListData.splice(showIndex, 1);
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

function autofillEpisodesInput(value, maxEpisodes, setEpisodesInput) {
  if (value === 'completed') {
    setEpisodesInput(maxEpisodes);
  } else if (value === 'plan') {
    setEpisodesInput(0);
  }
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