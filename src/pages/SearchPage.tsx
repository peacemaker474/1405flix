import { useQueries } from "react-query";
import { getSearchMovie, getSearchTV } from "../network/api";
import LoadingPage from "./LoadingPage";
import { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";

const SearchComponents = lazy(() => import("../components/Search/Search"));

type Keyword = string | null;

function SearchPage() {
    const location = useLocation();
    const keyword: Keyword = new URLSearchParams(location.search).get("keyword");

    const searchData = useQueries([
        {
            queryKey: ['search', 'movies'],
            queryFn: () => getSearchMovie(keyword || ""),
            cacheTime: 0,
        },
        {
            queryKey: ['search', 'TVShow'],
            queryFn: () => getSearchTV(keyword || ""),
            cacheTime: 0,
        }
    ]);

    return (
        <Suspense fallback={<LoadingPage />}>
            <SearchComponents searchData={searchData} keyword={keyword} />
        </Suspense>
    );
}

export default SearchPage;