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

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = useTable({
        columns: columns,
        data: data
    });

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

