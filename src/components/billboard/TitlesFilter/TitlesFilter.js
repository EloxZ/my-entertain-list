import ElectricButton from '@/components/global/ElectricButton/ElectricButton';
import LeftGroupButton from '@/components/global/LeftGroupButton/LeftGroupButton'
import MidGroupButton from '@/components/global/MidGroupButton/MidGroupButton'
import RightGroupButton from '@/components/global/RightGroupButton/RightGroupButton'
import SearchInput from '@/components/global/SearchInput/SearchInput';
import React from 'react'

export default function TitlesFilter(props) {
    const categoriesButtonGroup = loadCategories(props.categories, props.selectedCategory, props.setSelectedCategory);
    
    return (
        <div className='flex flex-row justify-between'>
            <div style={{marginTop:5}}>
                {categoriesButtonGroup}
            </div>
            <div className='flex gap-2'>
                <SearchInput id="movieSearch" searchRef={props.searchRef} onSearch={props.onSearch}/>
                <ElectricButton text="Search" onClick={props.onSearch} className="search-button"/>
            </div>
            
        </div>
    )
}

function loadCategories(categories, selectedCategory, setSelectedCategory) {
    const categoriesButtonGroup = [];

    if (categories) {
        const categoriesValues = Object.values(categories);
        for (let i = 0; i < categoriesValues.length; i++) {
            if (i == 0) {
                categoriesButtonGroup.push(
                    <LeftGroupButton
                        key={"button"+i}
                        text={categoriesValues[i].name}
                        isSelected={selectedCategory === categoriesValues[i].tag}
                        onClick={() => {setSelectedCategory(categoriesValues[i].tag)}}
                    />
                );
            } else if (i == categoriesValues.length - 1) {
                categoriesButtonGroup.push(
                    <RightGroupButton
                        key={"button"+i}
                        text={categoriesValues[i].name}
                        isSelected={selectedCategory === categoriesValues[i].tag}
                        onClick={() => {setSelectedCategory(categoriesValues[i].tag)}}
                    />
                );
            } else {
                categoriesButtonGroup.push(
                    <MidGroupButton
                        key={"button"+i}
                        text={categoriesValues[i].name}
                        isSelected={selectedCategory === categoriesValues[i].tag}
                        onClick={() => {setSelectedCategory(categoriesValues[i].tag)}}
                    />
                );
            }
        }
    }

    return categoriesButtonGroup;
}
