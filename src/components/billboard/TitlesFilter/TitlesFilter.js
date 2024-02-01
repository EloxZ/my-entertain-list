import ElectricButton from '@/components/global/ElectricButton/ElectricButton';
import LeftGroupButton from '@/components/global/LeftGroupButton/LeftGroupButton'
import MidGroupButton from '@/components/global/MidGroupButton/MidGroupButton'
import RightGroupButton from '@/components/global/RightGroupButton/RightGroupButton'
import SearchInput from '@/components/global/SearchInput/SearchInput';
import React from 'react'
import styles from './TitlesFilter.module.css';
import ClockSVG from '@/components/icons/ClockSVG/ClockSVG';
import StreamingSVG from '@/components/icons/StreamingSVG/StreamingSVG';
import TrendingSVG from '@/components/icons/TrendingSVG/TrendingSVG';
import StarSVG from '@/components/icons/StarSVG/StarSVG';

export default function TitlesFilter(props) {
    const categoriesButtonGroup = loadCategories(props.categories, props.selectedCategory, props.setSelectedCategory);
    
    return (
        <div className={styles.titlesFilter}>
            <div className={styles.categoriesFilter}>
                {categoriesButtonGroup}
            </div>
            <div className='flex gap-2'>
                <SearchInput id="movieSearch" searchRef={props.searchRef} onSearch={props.onSearch}/>
                <ElectricButton text="Search" onClick={props.onSearch} className="small-button"/>
            </div>
        </div>
    )
}

function loadCategories(categories, selectedCategory, setSelectedCategory) {
    const categoriesButtonGroup = [];
    const categoriesIcons = {
        'airToday' : <ClockSVG width={30} height={30} fill={selectedCategory === "airToday"? "white" : "black"}/>,
        'air' : <StreamingSVG width={30} height={30} fill={selectedCategory === "air"? "white" : "black"}/>,
        'popular' : <TrendingSVG width={30} height={30} fill={selectedCategory === "popular"? "white" : "black"}/>,
        'top' : <StarSVG width={30} height={30} fill={selectedCategory === "top"? "white" : "black"}/>
    }

    if (categories) {
        const categoriesValues = Object.values(categories);
        for (let i = 0; i < categoriesValues.length; i++) {
            if (i == 0) {
                categoriesButtonGroup.push(
                    <LeftGroupButton
                        key={"button"+i}
                        text={<div className='flex gap-1 items-center'>{categoriesIcons[categoriesValues[i].tag]}<a>{categoriesValues[i].name}</a></div>}
                        isSelected={selectedCategory === categoriesValues[i].tag}
                        onClick={() => {setSelectedCategory(categoriesValues[i].tag)}}
                    />
                );
            } else if (i == categoriesValues.length - 1) {
                categoriesButtonGroup.push(
                    <RightGroupButton
                        key={"button"+i}
                        text={<div className='flex gap-1 items-center'>{categoriesIcons[categoriesValues[i].tag]}<a>{categoriesValues[i].name}</a></div>}
                        isSelected={selectedCategory === categoriesValues[i].tag}
                        onClick={() => {setSelectedCategory(categoriesValues[i].tag)}}
                    />
                );
            } else {
                categoriesButtonGroup.push(
                    <MidGroupButton
                        key={"button"+i}
                        text={<div className='flex gap-1 items-center'>{categoriesIcons[categoriesValues[i].tag]}<a>{categoriesValues[i].name}</a></div>}
                        isSelected={selectedCategory === categoriesValues[i].tag}
                        onClick={() => {setSelectedCategory(categoriesValues[i].tag)}}
                    />
                );
            }
        }
    }

    return categoriesButtonGroup;
}
