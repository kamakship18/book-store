import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useLocation } from "react-router-dom"; // useLocation to access current URL location
import star from "../assets/star.png"; 
import "./SearchResult.css"; 

const SearchResults = () => {

  // to store search results fetched from the API
  const [searchResults, setSearchResults] = useState([]);

  // to indicate whether there are no search results
  const [noResults, setNoResults] = useState(false);
  const location = useLocation();

  // to extract the search query from the URL parameters
  const searchQuery = new URLSearchParams(location.search).get("q");

  // useeffect hook to fetch data from the API when the component mounts or when the search query changes
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        // make an HTTP GET request to the provided API endpoint
        const response = await axios.get(
          'https://reactnd-books-api.udacity.com/books',
          {
            headers: { 'Authorization': 'whatever-you-want' }
          }
        );

        // to extract all books from the API response or an empty array if none
        const allBooks = response.data.books || [];

        // filter books based on the title included in the search
        const filteredBooks = allBooks.filter(book =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // update state with the filtered search results
        setSearchResults(filteredBooks);

        // to update state to show whether there are no search results
        setNoResults(filteredBooks.length === 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // to only fetch data if there is a valid search query
    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]); // dependency array ensures this effect runs when the component mounts or when the search query changes

  return (
    <div className="container">
      <div className="books">
        {/* to render a message if there are no search results */}
        {noResults ? (
          <p className="no-results-message">
            No results found for the following search: "{searchQuery}"
          </p>
        ) : (
          
          // map over the searchResults array and render individual book components
          searchResults.map((book) => (
            <div className="book" key={book.id}>
              <div className="book-img-container">
                <img
                  className="book-img"
                  src={book.imageLinks.thumbnail}
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
