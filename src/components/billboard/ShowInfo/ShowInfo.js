import React from 'react'
import styles from './ShowInfo.module.css';
import { minsToHours } from '@/utils/format';

export default function ShowInfo(props) { 
    return (
        <div className={styles.showInfo}>
            {entryInfo("Status", props.showDetails.status)}
            {entryInfo("Type", props.showDetails.type)}
            {entryInfo("Duration", minsToHours(props.showDetails.episode_run_time[0]))}
            {entryInfo("Seasons", props.showDetails.number_of_seasons)}
            {entryInfo("Episodes", props.showDetails.number_of_episodes)}
            {entryInfo("Release date", props.showDetails.first_air_date)}
            {entryInfo("Last air date", props.showDetails.last_air_date)}
            {entryInfo("Next air date", props.showDetails.next_episode_to_air?.air_date)}
            {entryInfo("Language", props.showDetails.original_language)}
            {entryInfo("Website", "Homepage", props.showDetails.homepage)}
        </div>
    )
}

function entryInfo(label, value, link) {
    if (!value || !label || value.toString().includes("undefined")) {
        return <></>
    }
    return (
        <div className='flex gap-4 items-baseline justify-start mt-2'>
            <a className='w-44 uppercase text-right'>{label}</a>
            <a href={link} target="_blank" className='text-2xl capitalize'>{value}</a>
        </div>
    )
}