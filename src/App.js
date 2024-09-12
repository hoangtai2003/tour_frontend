import { Route, Routes, Navigate } from 'react-router-dom';
import "./App.css"
import "./index.css"
import Home from './pages/Home/Home';
import Header from './components/Common/Header/Header'
import Footer from './components/Common/Footer/Footer'
import Login from './pages/Login/Login';
import Tours from './pages/Tours/Tours';
import News from './pages/News/News';
import Hotel from './pages/Hotel/Hotel';
import Contact from './pages/Contact/Contact';
import Booking from './pages/Booking/Booking';
import About from './pages/About/About';
import TourDetails from './pages/Tours/TourDetails';
const App = () =>  {
  return (
    <>
        <Header />
        <Routes>
            <Route path='/' element={<Navigate to='home' />} />
            <Route path='home' element={<Home />} />
            <Route path='tours' element={<Tours />} />
            <Route path='/tours/:id' element={<TourDetails />} />
            <Route path='news' element={<News />} />
            <Route path='hotel' element={<Hotel />} />
            <Route path='contact-us' element={<Contact />} />
            <Route path='/booking/:id' element={<Booking />} />
            <Route path='about-us' element={<About />} />
            <Route path="login" element={<Login />} />
        </Routes>
        <Footer />
    </>

  );
}

export default App;
