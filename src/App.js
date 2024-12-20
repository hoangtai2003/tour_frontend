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
import TourDetails from './pages/Tours/TourDetails';
import Register from './pages/Auth/Register';
import Account from './pages/Account/Account';
import AccountInfo from './pages/Account/AccountInfo';
import AccountPassword from './pages/Account/AccountPassword';
import AccountList from './pages/Account/AccountList';
import AccountReview from './pages/Account/AccountReview';
import BookingDetails from './pages/Booking/BookingDetails';
import SearchResult from './pages/Tours/SearchResult';
import NewsDetailTravel from './pages/News/NewsDetailTravel'
import NewsTravel from './pages/News/NewsTravel';
import ExperienceTravel from './pages/News/ExperienceTravel';
import TourLocation from './pages/Tours/TourLocation';
import TourSale from './pages/Tours/TourSale';
import DetailHotel from './pages/Hotel/DetailHotel';
import RegisterGuide from './pages/Auth/RegisterGuide';
const App = () =>  {
  return (
    <>
        <Header />
        <Routes>
            <Route path='/' element={<Navigate to='home' />} />
            <Route path='home' element={<Home />} />
            <Route path='tours' element={<Tours />} />
            <Route path='/chuong-trinh/:slug' element={<TourDetails />} />
            <Route path='khach-san' element={<Hotel />} />
            <Route path='lien-he' element={<Contact />} />
            <Route path='/booking/:tour_code' element={<Booking />} />
            <Route path='/payment-booking/:bookingCode' element={<BookingDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="register-guide" element={<RegisterGuide />} />
            <Route path="account" element={<Account />}>
                <Route path="account-info" element={<AccountInfo />} />
                <Route path="account-password" element={<AccountPassword />} />
                <Route path='account-list' element={<AccountList />} />
                <Route path='account-review' element={<AccountReview />} />
            </Route>
            <Route path="tin-tuc" element={<News />}>
                <Route path='tin-tuc-du-lich' element={<NewsTravel />} />
                <Route path='kinh-nghiem-du-lich' element={<ExperienceTravel />} />
            </Route>
            <Route path="/search-result" element={<SearchResult />}></Route>
            <Route path='/tin-tuc/tin-tuc-du-lich/:slug' element={<NewsDetailTravel />} />
            <Route path='/tin-tuc/kinh-nghiem-du-lich/:slug' element={<NewsDetailTravel />} />
            <Route path='/du-lich-trong-nuoc/:slug' element={<TourLocation/>} />
            <Route path='/du-lich-gio-chot' element={<TourSale/>} />
            <Route path='/khach-san/:slug' element={<DetailHotel/>} />
        </Routes>
        <Footer />
    </>

  );
}

export default App;
