import { Route, Routes, Navigate } from 'react-router-dom';
import "./App.css"
import "./index.css"
import Home from './pages/Home/Home';
import Header from './components/Common/Header/Header'
import Footer from './components/Common/Footer/Footer'
import Login from './pages/Auth/Login';
import Tours from './pages/Tours/Tours';
import News from './pages/News/News';
import Hotel from './pages/Hotel/Hotel';
import Contact from './pages/Contact/Contact';
import Booking from './pages/Booking/Booking';
import About from './pages/About/About';
import TourDetails from './pages/Tours/TourDetails';
import Register from './pages/Auth/Register';
import Account from './pages/Account/Account';
import AccountInfo from './pages/Account/AccountInfo';
import AccountPassword from './pages/Account/AccountPassword';
import AccountList from './pages/Account/AccountList';
import AccountReview from './pages/Account/AccountReview';
import BookingDetails from './pages/Booking/BookingDetails';
import Test from './pages/Booking/Test';
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
            <Route path='/booking/:tour_code' element={<Booking />} />
            <Route path='/payment-booking/:bookingCode' element={<BookingDetails />} />
            <Route path='about-us' element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="account" element={<Account />}>
                <Route path="account-info" element={<AccountInfo />} />
                <Route path="account-password" element={<AccountPassword />} />
                <Route path='account-list' element={<AccountList />} />
                <Route path='account-review' element={<AccountReview />} />
            </Route>
            <Route path='/test' element={<Test />} />
        </Routes>
        <Footer />
    </>

  );
}

export default App;
