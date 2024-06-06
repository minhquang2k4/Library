import style from "./home.module.css";

const Home = () => {
  const books = [
    {
      title: "Đắc Nhân Tâm",
      author: "Dale Carnegie",
      description: "Cuốn sách này chia sẻ về cách xây dựng mối quan hệ tốt với người khác, cải thiện kỹ năng giao tiếp và tạo ra sự ảnh hưởng tích cực trong cuộc sống.",
      image: "https://cungdocsach.vn/wp-content/uploads/2020/10/%C4%90%E1%BA%AFc-nh%C3%A2n-t%C3%A2m-3.jpg",
      type: "Phát triển cá nhân, Kỹ năng sống",
    },
    {
      title: "Đắc Nhân Tâm",
      author: "Dale Carnegie",
      description: "Cuốn sách này chia sẻ về cách xây dựng mối quan hệ tốt với người khác, cải thiện kỹ năng giao tiếp và tạo ra sự ảnh hưởng tích cực trong cuộc sống.",
      image: "https://salt.tikicdn.com/cache/750x750/ts/product/6a/da/bb/185d27fe442a1668cf0196c1b82c87eb.jpg.webp",
      type: "Phát triển cá nhân, Kỹ năng sống",
    },
    {
      title: "Đắc Nhân Tâm",
      author: "Dale Carnegie",
      description: "Cuốn sách này chia sẻ về cách xây dựng mối quan hệ tốt với người khác, cải thiện kỹ năng giao tiếp và tạo ra sự ảnh hưởng tích cực trong cuộc sống.",
      image: "https://th.bing.com/th/id/OIP.StLSQH6KLcCz0FTmvzGs9AHaEm?rs=1&pid=ImgDetMain",
      type: "Phát triển cá nhân, Kỹ năng sống",
    },
    {
      title: "Đắc Nhân Tâm",
      author: "Dale Carnegie",
      description: "Cuốn sách này chia sẻ về cách xây dựng mối quan hệ tốt với người khác, cải thiện kỹ năng giao tiếp và tạo ra sự ảnh hưởng tích cực trong cuộc sống. ",
      image: "https://th.bing.com/th/id/OIP.StLSQH6KLcCz0FTmvzGs9AHaEm?rs=1&pid=ImgDetMain",
      type: "Phát triển cá nhân, Kỹ năng sống",
    },
  ];

  return (
    <>
      <h1>Home</h1>
      <div className={style.books}>
        {books.map((book, index) => (
          <div className={style.book} key={index}>
            <img src={book.image} alt={book.title} />
            <div>
              <h2>{book.title}</h2>
              <h3>{book.author}</h3>
              <p><b>Mô tả: </b>{book.description}</p>
              <p><b>Thể loại: </b>{book.type}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
