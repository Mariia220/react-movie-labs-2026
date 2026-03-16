import React, {useContext} from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";

const WatchLaterPage = () => {
    const { watchLater } = useContext(MoviesContext);

    return (
        <PageTemplate
            title="Watch Later"
            movies={watchLater}
        />
    );
};

export default WatchLaterPage;
