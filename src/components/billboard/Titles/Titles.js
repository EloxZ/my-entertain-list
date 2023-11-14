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
            />
            <div className={styles.titleContainerWrapper}>
                <TitlesContainer/>
            </div>
            <div className='flex justify-center'>
                <Pagination
                    pages={props.pages}
                    currentPage={props.currentPage}
                    setCurrentPage={props.setCurrentPage}
                />
            </div>
            
        </div>
    )
}
