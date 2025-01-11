// App.js
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

  const fetchMovies = async (
    pageToFetch = 0,
    currentSortBy,
    currentSortOrder
  ) => {
    setIsLoading(true);

    try {
      const limit = 10; // Number of movies per page
      const response = await fetch(
        `http://127.0.0.1:8000/movies?skip=${
          pageToFetch * limit
        }&limit=${limit}&sort_by=${currentSortBy}&sort_order=${currentSortOrder}`
      );
      const data = await response.json();

      // Validate if data is an array
      if (Array.isArray(data)) {
        // Avoid duplicate movies by using a Map for unique entries
        setMovies((prevMovies) => {
          const movieMap = new Map(
            prevMovies.map((movie) => [movie.id, movie])
          );
          data.forEach((movie) => movieMap.set(movie.id, movie));
          return Array.from(movieMap.values());
        });

        // Check if more movies are available
        if (data.length < limit) {
          setHasMore(false);
        }
      } else {
        console.error("Expected an array but got:", data);
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 50 >=
      document.documentElement.offsetHeight
    ) {
      if (hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1); // Increment page number
      }
    }
  }, [hasMore, isLoading]); // Memoize handleScroll to avoid unnecessary re-renders

  useEffect(() => {
    fetchMovies(page, sortBy, sortOrder);
  }, [page, sortBy, sortOrder]); // Refetch movies when sortBy or sortOrder changes

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // Add handleScroll to the dependency array

  const handleSortChange = (sortType, order) => {
    // Map sort types to API parameters
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
      setMovies([]);
      setPage(0);
      setHasMore(true);
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
      />
      <MovieList movies={movies} viewType={viewType} />
      {isLoading && <p>Loading...</p>}
      {!hasMore && <p>No more movies to load.</p>}
      <Footer />
    </div>
  );
};

export default App;
