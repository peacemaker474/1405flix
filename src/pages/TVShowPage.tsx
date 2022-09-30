import { lazy, Suspense } from "react";
import { useQueries } from "react-query";
import { getAiringTVShow, getOnAirTVShow, getPopularTVShow, getTopRatedTVShow } from "../network/api";
import LoadingPage from "./LoadingPage";

const TVsComponent = lazy(() => import("../components/TVs/TVs"));

function TVShowPage() {
    const tvShowsData = useQueries([
        {
            queryKey: ['TVShows', 'onAir'],
            queryFn: () => getOnAirTVShow(),
            staleTime: 1800 * 1000,
        },
        {
            queryKey: ['TVShows', 'airing'],
            queryFn: () => getAiringTVShow(),
            staleTime: 1800 * 1000,
        },
        {
            queryKey: ["TVShows", "topRated"],
            queryFn: () => getTopRatedTVShow(),
            staleTime: 1800 * 1000,
        },
        {
            queryKey: ['TVShows', 'popular'],
            queryFn: () => getPopularTVShow(),
            staleTime: 1800 * 1000,
        }
    ]);

    return (
        <Suspense fallback={<LoadingPage />}>
            <TVsComponent tvShowsData={tvShowsData} />
        </Suspense>
    );
}

export default TVShowPage;
