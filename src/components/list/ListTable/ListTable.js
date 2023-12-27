import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getScoreColor } from '@/utils/color';
import { Dropdown } from 'primereact/dropdown';

export default function ListTable(props) {
    const style = {
        minWidth: '320px',
    }

    const statuses = ["Watched", "Planned To Watch", "Dropped"];

    const statusBodyTemplate = (product) => {
        return <a className={product.status?.split(' ')[0] + "-label"}>{product.status}</a>;
    };

    const statusItemTemplate = (option) => {
        return <a className={option.split(' ')[0] + "-label"}>{option}</a>;
    };

    const scoreBodyTemplate = (product) => {
        return <a className={"score-field"} style={{color: getScoreColor(product.score)}}>{product.score ?? "-"}</a>;
    };

    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
        );
    };

    let columns = [];
    try {
        Object.keys(props.data[0]).map((col, i) => {
            if (col === "status") {
                columns.push(<Column 
                    key={col} 
                    body={statusBodyTemplate} 
                    field={col} 
                    header={"Status"} 
                    sortable 
                    showFilterMatchModes={false}
                    showFilterMenuOptions={false}
                    filter 
                    filterElement={statusRowFilterTemplate} 
                />)
            } else if (col === "score") {
                columns.push(<Column key={col} body={scoreBodyTemplate} field={col} header={"Score"} sortable />)
            } else if (col !== "id") {
                columns.push(<Column key={col} field={col} header={col.charAt(0).toUpperCase() + col.slice(1)} />)
            }
            
        });
    } catch (error) {

    }
    

    return (
        <DataTable value={props.data} tableStyle={style} >
            {columns}
        </DataTable>
    )
}
