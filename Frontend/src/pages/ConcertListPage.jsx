import React, { useEffect, useState } from "react";
import axios from "axios";
import ConcertCard from "../components/ConcertCart";
import "../styles/ConcertListPage.css";

const ConcertListPage = () => {
  const [concerts, setConcerts] = useState([]);
  const [filteredConcerts, setFilteredConcerts] = useState([]);
  const [genreFilter, setGenreFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const concertsPerPage = 5;

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/concerts");
        setConcerts(data);
        setFilteredConcerts(data);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };

    fetchConcerts();
  }, []);

  useEffect(() => {
    let filtered = [...concerts];

    if (genreFilter !== "All") {
      filtered = filtered.filter((c) => c.genre === genreFilter);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (c) =>
          c.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.venue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setCurrentPage(1);
    setFilteredConcerts(filtered);
  }, [genreFilter, searchTerm, concerts]);

  const indexOfLast = currentPage * concertsPerPage;
  const indexOfFirst = indexOfLast - concertsPerPage;
  const currentConcerts = filteredConcerts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredConcerts.length / concertsPerPage);

  const changePage = (page) => setCurrentPage(page);
  const uniqueGenres = ["All", ...new Set(concerts.map((c) => c.genre))];

  return (
    <div className="concert-list-page">
      <h2>All Concerts</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by artist, venue, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
          {uniqueGenres.map((genre) => (
            <option key={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {currentConcerts.length === 0 ? (
        <p>No concerts found.</p>
      ) : (
        <div className="concert-grid">
          {currentConcerts.map((concert) => (
            <ConcertCard key={concert._id} concert={concert} />
          ))}
        </div>
      )}

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={page === currentPage ? "active" : ""}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConcertListPage;
