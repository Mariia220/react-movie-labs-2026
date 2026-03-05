import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import { getUpcomingMovies } from "../api/tmdb-api";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const UpcomingMoviesPage = (props) => {
  
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

  
  const movies = data.results; 

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
        }}
      />
  );
};

export default UpcomingMoviesPage;