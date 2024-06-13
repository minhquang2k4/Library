/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { Form, Input, TextArea, Select, Button, Dropdown } from 'semantic-ui-react';
// import XLSX from 'xlsx';
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

  const [auth] = useContext(authContext);

  // api get
  const [books, setBooks] = useState([]);
  const [filterType, setFilterType] = useState('none');
  const [filterGenre, setFilterGenre] = useState('none');

  useEffect(() => {
    fetch(`http://localhost:8000/api/home?type=${filterType}&genre=${filterGenre}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      });
  }, [filterType, filterGenre]);

  const [showForm, setShowForm] = useState(false);

  const handleForm = () => {
    setShowForm(!showForm);
  };

  const [bookID, setBookID] = useState('');
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [bookType, setBookType] = useState('');
  const [genre, setGenre] = useState('');
  // api add
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
  const deleteBook = (id) => {
    if (!auth) {
      alert("Bạn cần đăng nhập để xóa sách");
      window.location.href = "/login";
      return;
    }
    fetch(`http://localhost:8000/api/home/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        setBooks(books.filter((book) => book._id !== id));
        console.log('Success:', books);
      })
      .catch((err) => {
        console.log('Error:', err);
      })

  };

  // api update
  const [showUpdate, setShowUpdate] = useState(false);

  const handleUpdate = ({book}) => {
    setShowUpdate(!showUpdate);
    setBookID(book._id);
    setBookName(book.title);
    setAuthor(book.author);
    setImage(book.image);
    setDescription(book.description);
    setBookType(book.type);
    setGenre(book.genre);
  }

  const update = () => {
    if (!auth) {
      alert("Bạn cần đăng nhập để sửa sách");
      window.location.href = "/login";
      return;
    }
    fetch(`http://localhost:8000/api/home/${bookID}`, {
      method: 'PUT',
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
        if(!res.ok){
          console.log("loi");
        }
        return res.json()
      })
      .then((updatedBook => {
        setBooks(prevBooks => {
          const newBooks = [...prevBooks];
          const bookIndex = newBooks.findIndex(book => book._id === bookID);
          newBooks[bookIndex] = updatedBook;
          return newBooks;
        });
      }))

    setShowUpdate(!showUpdate);
    setBookID('')
    setBookName('');
    setAuthor('');
    setImage('');
    setDescription('');
    setBookType('');
    setGenre('');
  }


  return (
    <>
      <h1 className={style.title}>Trang chủ</h1>
      <div className={style.header} >
        <button className={` ${style.add} ui button`} onClick={handleForm} >
          <i className="plus icon"  ></i>Thêm sách
        </button>
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
      </div>
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
            <icon className={style.icon} onClick={() => deleteBook(book._id)} >x</icon>
            <img src={book.image} alt={book.title} />
            <div>
              <h2>{book.title}</h2>
              <h3>{book.author}</h3>
              <p><b>Mô tả: </b>{book.description}</p>
              <p><b>Thể loại: </b>{book.genre}</p>
            </div>
            <div className={style.edit} onClick={() => { handleUpdate({book}) } } >sửa</div>
          </div>
        ))}
      </div>
      {showUpdate && (<div className={style.formUpdate}>
        <h1 className={style.title}>Sửa sách</h1>
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
          <Button onClick={update}>Sửa</Button>
        </Form>
      </div>)}

      <Button className={style.export} >Xuất dữ liệu</Button>
    </>
  );
};

export default Home;