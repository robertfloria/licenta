import React from 'react';
import { useState, useMemo } from "react";
import Axios from "axios";
import { useTable } from 'react-table';
import MOCK_DATA from '../../DataVisualization/data/MOCK_DATA.json'
import { COLUMNS } from './Columns';
import 'D:/GitHub/licenta/client/src/Components/Table/Table.css';

export const TableGrid = (props) => {
  
    // useMemo hooks ensures that the data isn't recreated on every render
    const columns = useMemo(() => COLUMNS, []); 
    const data = useMemo(() => MOCK_DATA, []);

    const tableInstance = useTable({
        columns: columns,
        data: data
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance;

    return (
        <div className='dadadada'>               
            <div className='tableGrid'>
                <table {...getTableProps}>  
                    <thead>
                        { 
                            headerGroups.map((headerGroup) => {
                                return (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {
                                            headerGroup.headers.map((column) => {
                                                return (
                                                    <th {...column.getHeaderProps()}> {column.render('Header')} </th>
                                                )             
                                            })
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
                                            row.cells.map((cell) => {
                                                return  <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                                            })
                                        }

                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>  
        </div>
    )
}

