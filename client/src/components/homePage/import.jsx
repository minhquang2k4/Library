import React, { useState } from 'react';
import { Button, Input } from 'semantic-ui-react';
import * as ExcelJS from 'exceljs';
import style from './home.module.css';
import { useContext } from 'react';
import { authContext } from "../isLogin/isLogin.jsx";

const Import = () => {
    const [list, setList] = useState([]);
    const [auth] = useContext(authContext);

    const handleImport = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = async (event) => {
            const data = event.target.result;
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(data);
            const worksheet = workbook.worksheets[0];
            const dataParse = [];
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber > 1) { 
                    const rowData = {
                        title: row.getCell(1).value,
                        author: row.getCell(2).value,
                        image: row.getCell(3).value,
                        description: row.getCell(4).value,
                        genre: row.getCell(5).value,
                        type: row.getCell(6).value,
                    };
                    dataParse.push(rowData);
                }
            });
            setList(dataParse);
        };
        reader.readAsArrayBuffer(file);
    };

    const handle = () => {
        if (!auth) {
            alert("Bạn cần đăng nhập để thêm sách");
            window.location.href = "/login";
            return;
        }
        fetch('http://localhost:8000/api/home/many', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(list),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert('success');
                    window.location.reload();
                } else {
                    alert('fail');
                }
            });
    };

    return (
        <div>
            <Button className={style.import} onClick={handle}>thêm nhiều</Button>
            <Input type='file' className={style.inputFile} onChange={handleImport} />
        </div>
    );
};

export default Import;
