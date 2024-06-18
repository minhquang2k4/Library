import 'semantic-ui-css/semantic.min.css'
import { Routes, Route } from 'react-router-dom';
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import Home from "./components/homePage/home.jsx";
import User from './components/userPage/user.jsx';
import Login from './components/auth/login.jsx';
import Register from './components/auth/register.jsx';
import Statistics from './components/statisticsPage/statistics.jsx';
import Manager from './components/managerPage/manager.jsx';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/yourbooks' element={<User />} />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='/manager' element={<Manager />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
