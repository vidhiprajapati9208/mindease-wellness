import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Therapists from './pages/Therapists';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import BookAppointment from './pages/BookAppointment';
import Dashboard from './pages/Dashboard';
import PatientProfile from './pages/PatientProfile';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-mindDark-950 text-slate-100">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/therapists" element={<Therapists />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/book" element={<BookAppointment />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<PatientProfile />} />
              </Routes>
            </main>
            <Footer />
            <ChatbotWidget />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
