import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ConcertCard from "../components/ConcertCart";
import BannerCarousel from "../components/BannerCarousel";
import "../styles/HomePage.css";

const HomePage = () => {
  const [concerts, setConcerts] = useState([]);
  const [searchArtist, setSearchArtist] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [allConcerts, setAllConcerts] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/concerts");
        setConcerts(res.data.slice(0, 3));
        setAllConcerts(res.data);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };

    fetchConcerts();
  }, []);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axios.get("http://localhost:8000/topArtists");
        setArtists(res.data);
      } catch (error) {
        console.error("Failed to load top artists", error);
      }
    };

    fetchArtists();
  }, []);

  const handleSearch = () => {
    let filtered = allConcerts;

    if (searchArtist) {
      filtered = filtered.filter((c) =>
        c.artist.toLowerCase().includes(searchArtist.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter((c) => c.genre === selectedGenre);
    }

    if (selectedCity) {
      filtered = filtered.filter((c) => c.location === selectedCity);
    }

    setConcerts(filtered.slice(0, 3));
  };

  return (
    <div className="homepage">

      <header className="banner">
        <BannerCarousel />
      </header>


      <section className="featured">
        <h2>Upcoming Concerts</h2>
        <div className="concert-grid">
          {concerts.map((concert) => (
            <ConcertCard key={concert._id || concert.id} concert={concert} />
          ))}
        </div>
        <Link to="/concerts" className="view-all-btn">View All Concerts →</Link>
      </section>


      <section className="search-section">
        <h2>Find Concerts</h2>
        <div className="search-filters">
          <input
            type="text"
            placeholder="Search by Artist..."
            value={searchArtist}
            onChange={(e) => setSearchArtist(e.target.value)}
          />
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">All Genres</option>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="Classical">Classical</option>
            <option value="Bollywood">Bollywood</option>
            <option value="EDM">EDM</option>
          </select>
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">All Cities</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
      </section>


      <section className="top-artists">
        <h2>Top Artists</h2>
        <div className="artist-slider-container">
          <div className="artist-slider-track">
            {(() => {
              const staticArtists = [
                {
                  name: "Anirudh",
                  image: "/assets/artists/anirudh.jpeg",
                  id: "686e0d005ae30011fee96b40"
                },
                {
                  name: "Vijay Antony",
                  image: "/assets/artists/antony.jpeg",
                  id: "6870b07a521d27e1ce87ec47"

                },
                {
                  name: "AR Rahman",
                  image: "/assets/artists/ar.jpeg",
                  id: "6870b148521d27e1ce87ec4f"
                },
                {
                  name: "Sid Sriram",
                  image: "/assets/artists/sid.jpeg",
                  id: "686e3fdc6887e55a9c791793"
                },
                {
                  name: "Yuvan",
                  image: "/assets/artists/yuvan.jpeg",
                  id: "6870b15f521d27e1ce87ec51"
                },
                {
                  name: "Hiphop Tamila",
                  image: "/assets/artists/aadhi.jpeg",
                  id: "6870b176521d27e1ce87ec53"
                },
              ];

             
              const duplicated = [...staticArtists, ...staticArtists];

              return duplicated.map((artist, index) => (
                <Link to={`/concerts/${artist.id}`} key={index} className="artist-card">
                  <img src={artist.image} alt={artist.name} />
                  <p>{artist.name}</p>
                </Link>
              ));
            })()}
          </div>
        </div>
      </section>



      <section className="timeline-section">
        <h2 className="timeline-title">How It Works – Your Booking Journey</h2>
        <div className="timeline-container">
          <div className="timeline-step">
            <div className="timeline-icon">🔍</div>
            <div className="timeline-content">
              <h3>Discover Events</h3>
              <p>Find concerts by genre, artist, or city with ease.</p>
            </div>
            <div className="timeline-line" />
          </div>

          <div className="timeline-step">
            <div className="timeline-icon">🪑</div>
            <div className="timeline-content">
              <h3>Select Your Seats</h3>
              <p>Choose standard or VIP seats that suit your vibe.</p>
            </div>
            <div className="timeline-line" />
          </div>

          <div className="timeline-step">
            <div className="timeline-icon">💳</div>
            <div className="timeline-content">
              <h3>Make Payment</h3>
              <p>Secure checkout via UPI, cards, or net banking.</p>
            </div>
            <div className="timeline-line" />
          </div>

          <div className="timeline-step">
            <div className="timeline-icon">📱</div>
            <div className="timeline-content">
              <h3>Get e-Ticket</h3>
              <p>Your QR-code ticket is emailed and dashboard-ready.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
