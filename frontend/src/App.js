// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import MainTitle from "./components/MainTitle";
import FilterSort from "./components/FilterSort";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";
import MoviePage from "./components/MoviePage";

const App = () => {
  const [viewType, setViewType] = useState("compact");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [sortOrder, setSortOrder] = useState("desc");
  const [genres, setGenres] = useState([]);

  // Track filters state
  const [filters, setFilters] = useState({
    release_year_from: null,
    release_year_to: null,
    rating_from: null,
    rating_to: null,
  });

  const fetchMovies = useCallback(
    async (
      pageToFetch,
      currentSortBy,
      currentSortOrder,
      selectedGenres,
      filters,
      add
    ) => {
      setIsLoading(true);
      try {
        const pageSize = 10;
        const genresQuery =
          selectedGenres.length > 0
            ? `&genres=${selectedGenres.join(",")}`
            : "";

        // Build filters query
        const filtersQuery = Object.entries(filters)
          .filter(([key, value]) => value !== null)
          .map(([key, value]) => `&${key}=${value}`)
          .join("");

        const response = await fetch(
          `http://127.0.0.1:8000/movies?page=${pageToFetch}&page_size=${pageSize}&sort_by=${currentSortBy}&sort_order=${currentSortOrder}${genresQuery}${filtersQuery}`
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
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [hasMore, isLoading]);

  useEffect(() => {
    fetchMovies(page, sortBy, sortOrder, genres, filters, true);
  }, [page, sortBy, sortOrder, genres, filters, fetchMovies]);

  useEffect(() => {
    setMovies([]);
    setPage(0);
    setHasMore(true);
    fetchMovies(0, sortBy, sortOrder, genres, filters, false);
  }, [genres, filters, sortBy, sortOrder, fetchMovies]);

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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Router>
      <Routes>
        {/*Movie Page Route*/}
        <Route
          path="/movies/:movieId"
          element={
            <>
              <Header movies={movies}/>
              <MoviePage />
            </>
          }
        />

        {/*Home Page Route*/}
        <Route
          path="/"
          element={
            <>
              <Header movies={movies}/>
              <MainTitle />
              <FilterSort
                onViewChange={setViewType}
                currentViewType={viewType}
                onSortChange={handleSortChange}
                setGenres={setGenres}
                genres={genres}
                movieCount={movies.length}
                onFilterChange={handleFilterChange}
              />
              <MovieList movies={movies} viewType={viewType} />
              {isLoading && <p>Loading...</p>}
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
