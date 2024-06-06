import 'semantic-ui-css/semantic.min.css'
import { Routes, Route } from 'react-router-dom';
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import Home from "./components/homePage/home.jsx";
import Login from './components/auth/login.jsx';
import Register from './components/auth/register.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
