import React, { useState, useEffect } from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import style from './user.module.css';

const User = () => {
    const [userBooks, setUserBooks] = useState([]);
    const [filterType, setFilterType] = useState('none');
    const [filterGenre, setFilterGenre] = useState('none');

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    useEffect(() => {
        fetch(`http://localhost:8000/api/user/books?type=${filterType}&genre=${filterGenre}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('token'),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUserBooks(data.books);
            }).catch((error) => {
                console.error('Error:', error);
            });
    }, [filterType, filterGenre]);

    if (userBooks.length === 0) {
        return (
            <div className={style.container}>
                <h1>Your Books</h1>
                <p>Bạn chưa có sách, mượn sách <Link to='/'>tại đây</Link></p>
            </div>
        );
    }


    const handleReturnBook = (book, index) => {
        setUserBooks(userBooks.filter((book, i) => i !== index));
        fetch('http://localhost:8000/api/user/return', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('token'),
            },
            body: JSON.stringify({
                bookId: book._id,
            }),
        })
        console.log(book._id);
    };


    return (
        <div className={style.container}>
            <h1>Your Books</h1>
            <div className={style.filter}>
                <Dropdown
                    text="Lọc sách"
                    options={[
                        { key: 1, text: "Không", value: "none" },
                        { key: 2, text: "Mới", value: "newType" },
                        { key: 3, text: "Cũ", value: "oldType" }
                    ]}
                    simple
                    item
                    onChange={(e, { value }) => setFilterType(value)}
                />
                <Dropdown
                    text="Thể loại"
                    options={[
                        { key: 1, text: "Không", value: "none" },
                        { key: 2, text: "Truyện tranh", value: "truyenTranh" },
                        { key: 3, text: "Khoa học", value: "khoaHoc" },
                        { key: 4, text: "Toán học", value: "toanHoc" },
                        { key: 5, text: "Văn học", value: "vanHoc" }
                    ]}
                    simple
                    item
                    onChange={(e, { value }) => setFilterGenre(value)}
                />
            </div>
            <div className={style.books}>
                {userBooks.map((book, index) => (
                    <div className={style.book} key={index}>
                        <img src={book.image} alt={book.title} />
                        <div>
                            <h3>{book.title}</h3>
                            <p className={style.author} >{book.author}</p>
                            <p><b>Mô tả: </b>{book.description}</p>
                            <p className={style.padding}><b>Thể loại: </b>{book.genre}</p>
                        </div>
                        <Button color='blue' className={style.return} onClick={() => handleReturnBook(book, index)}>Trả sách</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default User;
