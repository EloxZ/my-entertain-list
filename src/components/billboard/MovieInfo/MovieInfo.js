import React from 'react'
import styles from './MovieInfo.module.css';
import { minsToHours } from '@/utils/format';

export default function MovieInfo(props) {
    return (
        <div className={styles.movieInfo}>
            {infoEntry("Status", props.movieDetails.status)}
            {infoEntry("Duration", minsToHours(props.movieDetails.runtime))}
            {infoEntry("Release date", props.movieDetails.release_date)}
            {infoEntry("Budget", "$" + props.movieDetails.budget)}
            {infoEntry("Revenue", "$" + props.movieDetails.revenue)}
            {infoEntry("Language", props.movieDetails.original_language)}
            {infoEntry("Website", "Homepage", props.movieDetails.homepage)}
            {infoEntry("Website", "IMDb", "https://www.imdb.com/title/" + props.movieDetails.imdb_id)}
        </div>
    )
}



function infoEntry(label, value, link) {
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