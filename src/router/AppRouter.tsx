import { Routes, Route } from "react-router";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import TVShowPage from "../pages/TVShowPage";

function AppRouter() {
    return (
        <Routes>
            {["/", "/movies/:movieId"]?.map((path) => (
                <Route key={path} path={path} element={<HomePage />} />
            ))}

            {["/tvShows", "/tvShows/:tvId"]?.map((path) => (
                <Route key={path} path={path} element={<TVShowPage />} />
            ))}
            {["/search", "/search/movie/:movieId", "/search/tvShows/:tvId"]?.map((path) => (
                <Route key={path} path={path} element={<SearchPage />} />
            ))}
        </Routes>
    );
}

export default AppRouter;