import React, { useEffect, useState } from "react";
import axios from "axios"; // axios for making HTTP requests
import star from "../assets/star.png"; 
import "./Home.css"; 

function Home() {
  // state to store book data retrieved from the API
  const [bookData, setBookData] = useState([]);

  // useEffect hook is used to fetch data from the API 
  useEffect(() => {
    
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whateveryouwant" },
      })
      .then((res) => {
        // to update the state with the fetched book data
        setBookData(res.data.books);
        console.log(res);
      })
      .catch((err) => {
        // to handle errors
        if (err.response && err.response.status === 404) {
          console.log("Website not found");
        }
      });
  }, []); // empty dependency array is used to ensures that the effect runs only once when the component mounts

  return (
    <div className="container1">
      <div className="books">
        {bookData.length > 0 && (
          <>
            {/* map over the bookData array to render individual book components */}
            {bookData.map((book) => (
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
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
