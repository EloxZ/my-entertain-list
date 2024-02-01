import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getScoreColor } from '@/utils/color';
import { Dropdown } from 'primereact/dropdown';
import { movieStatus, statusMap } from '@/utils/status';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Tag } from 'primereact/tag';
import BinSVG from '@/components/icons/BinSVG/BinSVG';
import { addMovieToList, deleteMovieFromList } from '@/features/movies/data';

export default function MoviesList(props) {
    const style = {
        minWidth: '70vw'
    }

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(props.data);
    }, [props.data])

    const onGlobalFilterChange = (e) => {
        const value = e.target.value.toLowerCase();;

        if (props.data) {
            if (value === "") {
                setFilteredData(props.data);
            } else {
                const updatedFilteredData = props.data.filter((item) => {
                    const genres = item.genres.map((genre) => genre.name.toLowerCase());
                    const statusName = statusMap[item.status].toLowerCase();
                    return genres.some((genre) => genre.includes(value)) ||
                        statusName.includes(value) ||
                        item.name.toLowerCase().includes(value) ||
                        item.score.toString() === value;
                });
        
                setFilteredData(updatedFilteredData);
            }
        }

        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-between items-center w-full">
                <div></div>
                <h1>Movies</h1>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText className="px-4 py-2" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const header = renderHeader();

    // Item templates
    const statusItemTemplate = (option) => {
        return <a className={option + "-label"}>{statusMap[option]}</a>;
    };

    // Filter templates
    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={movieStatus} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
        );
    };

    // Body templates
    const statusBodyTemplate = (movie) => {
        return <div className='block text-center'>
            <a className={movie.status + "-label"}>{statusMap[movie.status]}</a>
        </div>
    };

    const scoreBodyTemplate = (movie) => {
        return <a className={"score-field w-full block text-center"} style={{color: getScoreColor(movie.score)}}>{movie.score}</a>;
    };

    const genresBodyTemplate = (movie) => {
        const genreTags = [];
        for (const genre of movie.genres) {
            genreTags.push(
                <a className={"genre-label genre-id-"+genre.id} key={genre.id}>{genre.name}</a>
            )
        }
        
        return <div className='flex flex-wrap gap-3'>
            {genreTags}
        </div>
    };

    const posterBodyTemplate = (movie) => {
        const HEIGHT = 150;
        const WIDTH = HEIGHT * 0.675;

        if (movie.poster) {
            return <img alt={movie.name} className="rounded-md" width={WIDTH} height={HEIGHT} src={"https://image.tmdb.org/t/p/w500" + movie.poster}/>;
        } else {
            return <div style={{width:WIDTH, height:HEIGHT}} className='rounded-md bg-gray-800 text-center break-words text-white px-2 h-full flex flex-col justify-center'>
                {movie.name}
            </div>
        }
    };

    const deleteBodyTemplate = (movie) => {
        return <button className='delete-button' onClick={()=>{onRowDelete(movie.id)}}>{<BinSVG/>}</button>
    }

    // Editors
    const statusEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={movieStatus}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select a Status"
                itemTemplate={(option) => {
                    return <Tag value={statusMap[option]} className={option+"-label"}></Tag>;
                }}
            />
        );
    };

    const scoreEditor = (options) => {
        return <InputNumber className="score-field w-28" step={0.05} min={0} max={10} minFractionDigits={2} buttonLayout="vertical" showButtons value={options.value} useGrouping={false} onValueChange={(e) => options.editorCallback(e.value)}/>;
    };

    const allowEdit = (rowData) => {
        return true;
    };

    const onRowEditComplete = (e) => {
        let { newData } = e;
        let _oldData = [...props.data];
        let _data = props.data?.filter((data) => data.id != newData.id);
        _data.push(newData);

        if (props.setData) {
            addMovieToList("6318cdd7b4629f715e57e8b6", newData).then((data) => {
                if (data.message !== "Movie added to list") {
                    props.setData(_oldData);
                    console.log("Error adding movie.");
                }
            });
            props.setData(_data);
        }
    };

    const onRowDelete = (id) => {
        let _oldData = [...props.data];
        let _data = props.data?.filter((data) => data.id != id);
        if (props.setData) {
            deleteMovieFromList("6318cdd7b4629f715e57e8b6", id).then((data) => {
                if (data.message !== "Movie removed from list") {
                    props.setData(_oldData);
                    console.log("Error removing movie.");
                }
            });
            props.setData(_data);
        }
    }

    return (
        <DataTable scrollHeight='1890px' dataKey="id" scrollable value={filteredData} sortField="score" sortOrder={-1}
            tableStyle={style} paginator rows={10} rowsPerPageOptions={[10, 25, 50, 100]}
            emptyMessage="No movies found."
            header={header}
            onRowEditComplete={onRowEditComplete}
            editMode="row"
        >
            <Column key={"score"} body={scoreBodyTemplate} field={"score"} 
                header={"Score"} sortable editor={(options) => scoreEditor(options)} />
            <Column key={"poster"} body={posterBodyTemplate} field={"poster"} header={"Poster"} />
            <Column key={"name"} field={"name"} header={"Title"} />
            <Column key={"genres"} body={genresBodyTemplate} field={"genres"} header={"Genres"} />
            <Column
                key={"status"} 
                body={statusBodyTemplate} 
                field={"status"} 
                header={"Status"} 
                headerStyle={{ justifyContent: 'center' }}
                sortable 
                showFilterMatchModes={false}
                showFilterMenuOptions={false}
                filter 
                filterElement={statusRowFilterTemplate}
                editor={(options) => statusEditor(options)}
            />
            <Column rowEditor={allowEdit} headerStyle={{ }} bodyStyle={{ textAlign: 'center' }}></Column>
            <Column headerStyle={{ }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={deleteBodyTemplate} />
        </DataTable>
    )
}

