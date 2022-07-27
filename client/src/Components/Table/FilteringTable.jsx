import React from 'react';
import { useState, useMemo } from "react";
import Axios from "axios";
import { useTable, useGlobalFilter } from 'react-table';
import MOCK_DATA from '../../DataVisualization/data/MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS } from './Columns';
import 'D:/GitHub/licenta/client/src/Components/Table/Table.css';
import { GlobalFilter } from './GlobalFilter';

export const FilteringTable = (props) => {
  
    // useMemo hooks ensures that the data isn't recreated on every render
    const columns = useMemo(() => COLUMNS, []); 
    const data = useMemo(() => MOCK_DATA, []);
//CURS 9 next
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({
        columns: columns,
        data: data
    }, useGlobalFilter);

    const { globalFilter } = state;

    return (
        <div className='backgroundTable'>      
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />         
            <div className='tableGrid'>
                <table {...getTableProps}>  
                    <thead>
                        { 
                            headerGroups.map((headerGroup) => {
                                return (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {
                                            headerGroup.headers.map((column) => (
                                                <th {...column.getHeaderProps()}> {column.render('Header')} </th>            
                                            ))
                                        }                       
                                    </tr>
                                )
                            })
                        }

                    </thead>
                    <tbody {...getTableBodyProps}>
                        {
                            rows.map((row) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {
                                            row.cells.map((cell) => (
                                                <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                                            ))
                                        }

                                    </tr>
                                )
                            })
                        }

                    </tbody>
                    <tfoot>
                        {
                            footerGroups.map((footerGroup) => {
                                return (
                                    <tr {...footerGroup.getFooterGroupProps()}>
                                        {
                                            footerGroup.headers.map((column) => (
                                                <td {...column.getFooterProps}> {column.render('Footer')} </td>
                                            ))
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tfoot>
                </table>
            </div>  
        </div>
    )
}

