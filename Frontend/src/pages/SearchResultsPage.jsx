import React, { useEffect, useState } from "react";
import ConcertCard from "../components/ConcertCart";
import '../styles/SearchResultsPage.css';

const SearchResultsPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("searchResults")) || [];
    const valid = data.filter(c => c && c._id); // optional sanity check
    setResults(valid);
  }, []);

  return (
    <div className="search-results">
      <h2>🔍 Search Results</h2>
      {results.length === 0 ? (
        <p>No concerts matched your search.</p>
      ) : (
        <div className="concert-grid">
          {results.map((concert) => (
            <ConcertCard key={concert._id} concert={concert} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
