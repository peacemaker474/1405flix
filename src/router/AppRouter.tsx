import { Routes, Route } from "react-router";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import TVShowPage from "../pages/TVShowPage";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}>
                <Route path="/movies/:movieId" />
            </Route>
            <Route path="/tvShows" element={<TVShowPage />}>
                <Route path="/tvShows/:tvId" />
            </Route>
            <Route path="/search" element={<SearchPage />} />
        </Routes>
    );
}

export default AppRouter;