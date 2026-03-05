import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMoviesPage = (props) => {
  // 1. Fetch data using the API function
  const { data, error, isLoading, isError } = useQuery({
  queryKey: ['upcoming'],
  queryFn: getUpcomingMovies,
});

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // 2. Extract the movies from the "results" array in your JSON
  const movies = data.results; 

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        // You can leave this empty or add a "Watchlist" button later
        return null; 
      }}
    />
  );
};

export default UpcomingMoviesPage;