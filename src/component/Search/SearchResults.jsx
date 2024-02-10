import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import star from "../assets/star.png";
import "./SearchResult.css"

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://reactnd-books-api.udacity.com/books',
          {
            headers: { 'Authorization': 'whatever-you-want' }
          }
        );
        const allBooks = response.data.books || [];
        const filteredBooks = allBooks.filter(book =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredBooks);
        setNoResults(filteredBooks.length === 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div className="container">
      <div className="books">
        {noResults ? (
          <p className="no-results-message">
            No results found for the following search: "{searchQuery}"
          </p>
        ) : (
          searchResults.map((book) => (
            <div className="book" key={book.id}>
              <div className="book-img-container">
                <img
                  className="book-img"
                  src={book.imageLinks.thumbnail }
                />
              </div>
              <div className="book-details">
                <p className="book-title">{book.title}</p>
                <h4 className="authors">
                  {book.authors.map((author, index) => (
                    <i key={index}>{author}</i>
                  ))}
                </h4>
                <div className="book-details-row">
                  <div className="book-rating">
                    <img src={star} alt="" />
                    {book.averageRating ? (
                      <p>{book.averageRating} / 5</p>
                    ) : (
                      <p>N A</p>
                    )}
                  </div>
                  <p className="book-cost">Free</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
