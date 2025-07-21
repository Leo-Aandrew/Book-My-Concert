import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchResultsPage from "./pages/SearchResultsPage";
import ConcertListPage from './pages/ConcertListPage';
import ConcertDetailsPage from './pages/ConcertDetailsPage';
import BookingPage from './pages/BookingPage';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import AdminRoute from './components/AdminRoute'; 
import ConfirmationPage from './pages/ConfirmationPage';
import MobileTicket from "./pages/MobileTicket";
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/concerts" element={<ConcertListPage />} />
        <Route path="/concerts/:id" element={<ConcertDetailsPage />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/mobile-ticket" element={<MobileTicket />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
