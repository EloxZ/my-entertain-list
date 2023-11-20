import React from 'react'
import styles from './Titles.module.css';
import TitlesFilter from '../TitlesFilter/TitlesFilter';
import TitlesContainer from '../TitlesContainer/TitlesContainer';
import Pagination from '@/components/global/Pagination/Pagination';

export default function Titles(props) {
    return (
        <div className={styles.titles}>
            <TitlesFilter
                categories={props.categories}
                selectedCategory={props.selectedCategory}
                setSelectedCategory={props.setSelectedCategory}
                onSearch={props.onSearch}
                searchRef={props.searchRef}
            />
            <div className={styles.titleContainerWrapper}>
                <TitlesContainer 
                    titles={props.titles}
                    setSelectedTitle={props.setSelectedTitle}
                    selectedTitle={props.selectedTitle}
                />
            </div>
            <div className='flex justify-center'>
                <Pagination
                    pages={Math.min(props.pageLimit, props.titles?.total_pages ?? 1)}
                    currentPage={props.titles?.page ?? 1}
                    setCurrentPage={props.setCurrentPage}
                />
            </div>
            
        </div>
    )
}
