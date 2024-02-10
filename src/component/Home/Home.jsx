import React, { useEffect, useState } from "react";
import axios from "axios";
import star from "../assets/star.png";
import "./Home.css";

function Home() {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whateveryouwant" },
      })
      .then((res) => {
        setBookData(res.data.books);
        console.log(res);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          console.log("Website not found");
        }
      });
  }, []);

  return (
    <div className="container">
      <div className="books">
        {bookData.length > 0 && (
          <>
            {bookData.map((book) => (
              <div className="book" key={book.id}>
                <div className="book-img-container">
                  <img
                    className="book-img"
                    src={book.imageLinks?.thumbnail || ""}
                    alt={
                      book.imageLinks?.thumbnail
                        ? undefined
                        : "Image not available"
                    }
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
