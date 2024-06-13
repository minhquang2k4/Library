import React from 'react';
import { Button } from 'semantic-ui-react';
import * as XLSX from 'xlsx';
import style from './home.module.css';

const User = ({ books }) => {
    const listBook = books.map((book) => {
        const { _id, __v, ...rest } = book;
        return rest;
    });

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(listBook);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'books.xlsx');
    };

    return (
        <div>
           <Button onClick={exportToExcel} className={style.export} >Xuất dữ liệu</Button>
        </div>
    );
};

export default User;