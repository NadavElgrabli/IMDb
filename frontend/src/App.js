// App.js
import React from "react";
import Header from "./components/Header";
import MainTitle from "./components/MainTitle";
import FilterSort from "./components/FilterSort";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";
import { useState } from "react";

const App = () => {
  const [viewType, setViewType] = useState("compact"); // Default to grid view

  const movies = [
    {
      id: 1,
      title: "The Shawshank Redemption 123",
      year: 1994,
      duration: "2h 22m",
      rating: "9.3",
      poster: "1.jpg",
      description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      director: "Frank Darabont",
      stars: "Tim Robbins, Morgan Freeman, Bob Gunton",
    },
    {
      id: 2,
      title: "The Godfather",
      year: 1972,
      duration: "2h 55m",
      rating: "9.2",
      poster: "1.jpg",
      description:
        "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      director: "Francis Ford Coppola",
      stars: "Marlon Brando, Al Pacino, James Caan",
    },
    {
      id: 3,
      title: "The Dark Knight",
      year: 2008,
      duration: "2h 32m",
      rating: "9.0",
      poster: "1.jpg",
      description:
        "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
      director: "Christopher Nolan",
      stars: "Christian Bale, Heath Ledger, Aaron Eckhart",
    },
    {
      id: 4,
      title: "The Dark Knight 2",
      year: 2008,
      duration: "2h 32m",
      rating: "9.0",
      poster: "1.jpg",
      description:
        "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
      director: "Christopher Nolan",
      stars: "Christian Bale, Heath Ledger, Aaron Eckhart",
    },
    {
      id: 5,
      title: "The Dark Knight 3",
      year: 2008,
      duration: "2h 32m",
      rating: "9.0",
      poster: "1.jpg",
      description:
        "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
      director: "Christopher Nolan",
      stars: "Christian Bale, Heath Ledger, Aaron Eckhart",
    },
    {
      id: 6,
      title: "The Dark Knight 4",
      year: 2008,
      duration: "2h 32m",
      rating: "9.0",
      poster: "1.jpg",
      description:
        "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
      director: "Christopher Nolan",
      stars: "Christian Bale, Heath Ledger, Aaron Eckhart",
    },
    {
      id: 7,
      title: "The Dark Knight 5",
      year: 2008,
      duration: "2h 32m",
      rating: "9.0",
      poster: "1.jpg",
      description:
        "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
      director: "Christopher Nolan",
      stars: "Christian Bale, Heath Ledger, Aaron Eckhart",
    },
  ];

  return (
    <div>
      <Header />
      <MainTitle />
      <FilterSort onViewChange={setViewType} currentViewType={viewType}/>
      <MovieList movies={movies} viewType={viewType} />
      <Footer />
    </div>
  );
};

export default App;
