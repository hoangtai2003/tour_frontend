import { Route, Routes, Navigate } from 'react-router-dom';
import "./App.css"
import "./index.css"
import Home from './pages/Home/Home';
import Header from './components/Common/Header/Header'
import Footer from './components/Common/Footer/Footer'
import Login from './components/Login/Login';
const App = () =>  {
  return (
    <>
        <Header />
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
    </>

  );
}

export default App;
