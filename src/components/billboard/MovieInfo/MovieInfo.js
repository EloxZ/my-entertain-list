import React from 'react'
import styles from './MovieInfo.module.css';
import { minsToHours } from '@/utils/format';

export default function MovieInfo(props) {
    return (
        <div className={styles.movieInfo}>
            {entryInfo("Status", props.movieDetails.status)}
            {entryInfo("Duration", minsToHours(props.movieDetails.runtime))}
            {entryInfo("Release date", props.movieDetails.release_date)}
            {entryInfo("Budget", "$" + props.movieDetails.budget)}
            {entryInfo("Revenue", "$" + props.movieDetails.revenue)}
            {entryInfo("Language", props.movieDetails.original_language)}
            {entryInfo("Website", "Homepage", props.movieDetails.homepage)}
            {entryInfo("Website", "IMDb", "https://www.imdb.com/title/" + props.movieDetails.imdb_id)}
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