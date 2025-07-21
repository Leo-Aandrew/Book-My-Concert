import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [concerts, setConcerts] = useState([]);
  const isLoggedIn = localStorage.getItem("user");
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

    const handleLinkClick = () => {
    setMenuOpen(false); 
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await fetch("http://localhost:8000/concerts");
        const data = await response.json();
        setConcerts(data);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };
    fetchConcerts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const term = searchTerm.toLowerCase();
    const filtered = concerts.filter(
      (concert) =>
        concert.artist.toLowerCase().includes(term) ||
        concert.genre.toLowerCase().includes(term) ||
        concert.location.toLowerCase().includes(term)
    );

    localStorage.setItem("searchResults", JSON.stringify(filtered));
    navigate("/search");
    setSearchTerm("");
  };

 return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={handleLinkClick}>
          <img src="/logo.png" alt="logo" />
        </Link>
      </div>

    
      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by artist, genre, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

    
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✖" : "☰"}
      </button>

      
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {!isLoggedIn ? (
          <>
            <li><Link to="/login" onClick={handleLinkClick}>Login</Link></li>
            <li><Link to="/signup" onClick={handleLinkClick}>Signup</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/concerts" onClick={handleLinkClick}>Concerts</Link></li>
            <li><Link to="/dashboard" onClick={handleLinkClick}>Dashboard</Link></li>
            {userRole === "admin" && <li><Link to="/admin" onClick={handleLinkClick}>Admin</Link></li>}
            <li><button className="logout-btn" onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
