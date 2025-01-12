import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import MainTitle from "./components/MainTitle";
import FilterSort from "./components/FilterSort";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";

const App = () => {
  const [viewType, setViewType] = useState("compact");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [sortOrder, setSortOrder] = useState("desc");
  const [genres, setGenres] = useState([]);

  const fetchMovies = useCallback(
    async (
      pageToFetch,
      currentSortBy,
      currentSortOrder,
      selectedGenres,
      add
    ) => {
      setIsLoading(true);
      try {
        const pageSize = 10; // Number of movies per page
        const genresQuery =
          selectedGenres.length > 0
            ? `&genres=${selectedGenres.join(",")}`
            : "";

        const response = await fetch(
          `http://127.0.0.1:8000/movies?page=${pageToFetch}&page_size=${pageSize}&sort_by=${currentSortBy}&sort_order=${currentSortOrder}${genresQuery}`
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          console.log(data);
          // Reset the movies state when the data is fetched (clear previous data)
          if (pageToFetch === 0) {
            setMovies(data);
          } else {
            // Append new data to the existing movies
            setMovies((prevMovies) => [...prevMovies, ...data]);
          }

          // Ensure pagination logic works correctly
          setHasMore(data.length >= pageSize);
        } else {
          console.error("Expected an array but got:", data);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 50 >=
      document.documentElement.offsetHeight
    ) {
      if (hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1); // Increment page number
      }
    }
  }, [hasMore, isLoading]);

  useEffect(() => {
    fetchMovies(page, sortBy, sortOrder, genres, true);
  }, [page, sortBy, sortOrder, genres, fetchMovies]);

  useEffect(() => {
    setMovies([]); // Clear existing movies when genres change
    setPage(0); // Reset page
    setHasMore(true); // Reset pagination state
    fetchMovies(0, sortBy, sortOrder, genres, false); // Fetch movies with updated genres
  }, [genres, sortBy, sortOrder, fetchMovies]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleSortChange = (sortType, order) => {
    const sortMapping = {
      Ranking: "rating",
      "Release Date": "year",
      Alphabetical: "title",
      Runtime: "runtime",
    };

    const mappedSortBy = sortMapping[sortType];
    if (mappedSortBy) {
      setSortBy(mappedSortBy);
      setSortOrder(order);
      setMovies([]); // Clear existing movies
      setPage(0); // Reset page
      setHasMore(true); // Reset pagination state
    } else {
      console.error(`Invalid sort type: ${sortType}`);
    }
  };

  return (
    <div>
      <Header />
      <MainTitle />
      <FilterSort
        onViewChange={setViewType}
        currentViewType={viewType}
        onSortChange={handleSortChange}
        setGenres={setGenres}
        genres={genres}
        movieCount={movies.length}
      />
      <MovieList movies={movies} viewType={viewType} />
      {isLoading && <p>Loading...</p>}
      {!hasMore && <p className="end-of-movies">No more movies to load.</p>}
      <Footer />
    </div>
  );
};

export default App;
