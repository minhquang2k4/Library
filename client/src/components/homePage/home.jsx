import React, { useEffect, useState, useContext } from "react";
import { Form, Input, TextArea, Select, Button } from 'semantic-ui-react';
import { authContext } from "../isLogin/isLogin.jsx";
import style from "./home.module.css";

const Home = () => {
  const optionsType = [
    { key: '1', text: 'mới', value: 'mới' },
    { key: '2', text: 'cũ', value: 'cũ' },
  ]

  const optionsGenre = [
    { key: '1', text: 'truyện tranh', value: 'truyện tranh' },
    { key: '2', text: 'khoa học', value: 'khoa học' },
    { key: '1', text: 'toán học', value: 'toán học' },
    { key: '2', text: 'văn học', value: 'văn học' },
  ]

  const [auth, setAuth] = useContext(authContext);

  // api get
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      fetch('http://localhost:8000/api/home')
        .then((res) => res.json())
        .then((data) => {
          setBooks(data);
          setLoading(false);
        });
    }
  }, [loading]);

  const [showForm, setShowForm] = useState(false);
  const handleForm = () => {
    setShowForm(!showForm);
  };

  // api add
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [bookType, setBookType] = useState('');
  const [genre, setGenre] = useState('');

  const addBook = async () => {
    if (!auth) {
      alert("Bạn cần đăng nhập để thêm sách");
      window.location.href = "/login";
      return;
    }
    fetch('http://localhost:8000/api/home', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: bookName,
        author: author,
        image: image,
        description: description,
        genre: genre,
        type: bookType,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((newBook) => {
        setBooks([...books, newBook]);
        setLoading(true);
        console.log('Success:', newBook);
      })
      .catch((err) => {
        console.log('Error:', err);
      });

    setShowForm(false);
    setBookName('');
    setAuthor('');
    setImage('');
    setDescription('');
    setBookType('');
    setGenre('');
  };

  // api delete
  // const deleteBook = (id) => {
  //   if(!auth) {
  //     alert("Bạn cần đăng nhập để xóa sách");
  //     window.location.href = "/login";
  //     return;
  //   }
  //   fetch(`http://localhost:8000/api/home/${id}`, {
  //     method: 'DELETE',
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return res.json();
  //     })
  //     .then(() => {
  //       setBooks(books.filter((book) => book._id !== id));
  //       console.log('Success:', books);
  //     })
  //     .catch((err) => {
  //       console.log('Error:', err);
  //     });
  //   };

  return (
    <>
      <h1 className={style.title}>Trang chủ</h1>
      <button className={` ${style.add} ui button`} onClick={handleForm} >
        <i className="plus icon"  ></i>Thêm sách
      </button>

      {showForm && (
        <Form>
          <Form.Field>
            <label>Tên sách</label>
            <Input value={bookName} onChange={(e) => setBookName(e.target.value)} placeholder="Nhập tên sách" required />
          </Form.Field>
          <Form.Field>
            <label>Tác giả</label>
            <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Nhập tác giả" required />
          </Form.Field>
          <Form.Field>
            <label>Ảnh</label>
            <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Nhập link ảnh" required />
          </Form.Field>
          <Form.Field>
            <label>Mô tả</label>
            <TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Nhập mô tả" required />
          </Form.Field>
          <Form.Field>
            <label>Kiểu sách</label>
            <Select value={bookType} onChange={(e, { value }) => setBookType(value)} placeholder="Chọn kiểu sách" options={optionsType} required />
          </Form.Field>
          <Form.Field>
            <label>Thể loại</label>
            <Select value={genre} onChange={(e, { value }) => setGenre(value)} placeholder="Chọn thể loại" options={optionsGenre} required />
          </Form.Field>
          <Button onClick={addBook}>Thêm</Button>
        </Form>
      )}

      <div className={style.books}>
        {books.map((book, index) => (
          <div className={style.book} key={index}>
            <icon className={style.icon} >x</icon>
            <img src={book.image} alt={book.title} />
            <div>
              <h2>{book.title}</h2>
              <h3>{book.author}</h3>
              <p><b>Mô tả: </b>{book.description}</p>
              <p><b>Thể loại: </b>{book.genre}</p>
            </div>
            <div className={style.edit}>sửa</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;