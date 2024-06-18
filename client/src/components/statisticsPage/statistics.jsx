import React, { useState, useEffect } from 'react';
import { TableRow, TableHeaderCell, TableHeader, TableFooter, TableCell, TableBody, Table, } from 'semantic-ui-react'
import { Input, Button } from 'semantic-ui-react';
import * as XLSX from 'xlsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import style from './statistics.module.css';

const Statictics = () => {
    const [data, setData] = useState([]);
    const [start, setStart] = useState('none');
    const [end, setEnd] = useState('none');

    useEffect(() => {
        fetch(`http://localhost:8000/api/statistics?start=${start}&end=${end}`)
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
    }, [start, end]);

    const exportToExcel = () => {
        if (data.length === 0) {
            alert("Không có dữ liệu để xuất Excel.");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const headers = [
            'Tên sách',
            'Tác giả',
            'Kiểu sách',
            'Thể loại',
            'Số lượt mượn'
        ];
        XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });

        XLSX.writeFile(workbook, 'statistics.xlsx');
    };


    return (
        <div className={style.container}>
            <h1>Thống kê</h1>
            <div className={style.header}>
                <Input type='date' label='Ngày bắt đầu' onChange={(e) => { setStart(e.target.value || 'none') }}  ></Input>
                <Input type='date' label='Ngày kết thúc' onChange={(e) => { setEnd(e.target.value || 'none') }}  ></Input>
                <DatePicker
                    selected={start}
                    onChange={date => setStart(date)}
                    customInput={<Input label='Ngày bắt đầu' />}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="YYYY-MM-DD"
                />
                <DatePicker
                    selected={end}
                    onChange={date => setEnd(date)}
                    customInput={<Input label='Ngày kết thúc' />}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="YYYY-MM-DD"
                />
            </div>

            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell textAlign='center' >Tên sách</TableHeaderCell>
                        <TableHeaderCell textAlign='center' >Tác giả</TableHeaderCell>
                        <TableHeaderCell textAlign='center'>Kiểu sách</TableHeaderCell>
                        <TableHeaderCell textAlign='center'>Thể loại</TableHeaderCell>
                        <TableHeaderCell textAlign='center'>Số lượt mượn</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell textAlign='center'>{item.name}</TableCell>
                            <TableCell textAlign='center'>{item.author}</TableCell>
                            <TableCell textAlign='center'>{item.typeBook}</TableCell>
                            <TableCell textAlign='center'>{item.genreBook}</TableCell>
                            <TableCell textAlign='right' >{item.number}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <TableFooter >
                    <TableRow>
                        <TableHeaderCell colSpan='1' textAlign='center'>
                            Tổng
                        </TableHeaderCell>
                        <TableHeaderCell colSpan='5' textAlign='right' >
                            {data.reduce((total, item) => total + item.number, 0)}
                        </TableHeaderCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <Button onClick={exportToExcel} >Xuất dữ liệu</Button>
        </div>
    );
};

export default Statictics;