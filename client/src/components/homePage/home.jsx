import style from "./home.module.css";

const Home = () => {
  const books = [
    {
      title: "Book 1",
      author: "Author 1",
      isbn: "ISBN1",
      publicationDate: "2022-01-01",
      genre: "Fiction",
    },
    {
      title: "Book 2",
      author: "Author 2",
      isbn: "ISBN2",
      publicationDate: "2022-02-01",
      genre: "Non-Fiction",
    },
    {
      title: "Book 3",
      author: "Author 3",
      isbn: "ISBN3",
      publicationDate: "2022-03-01",
      genre: "Science",
    },
    {
      title: "Book 3",
      author: "Author 3",
      isbn: "ISBN3",
      publicationDate: "2022-03-01",
      genre: "Science",
    },
    {
      title: "Book 3",
      author: "Author 3",
      isbn: "ISBN3",
      publicationDate: "2022-03-01",
      genre: "Science",
    },
    {
      title: "Book 3",
      author: "Author 3",
      isbn: "ISBN3",
      publicationDate: "2022-03-01",
      genre: "Science",
    },
    {
      title: "Book 3",
      author: "Author 3",
      isbn: "ISBN3",
      publicationDate: "2022-03-01",
      genre: "Science",
    },
  ];

  return (
    <>
      <h1>Home</h1>
      <div className={style.books}>
        {books.map((book, index) => (
          <div className={style.book} key={index}>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.isbn}</p>
            <p>{book.publicationDate}</p>
            <p>{book.genre}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
