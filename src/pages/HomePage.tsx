import { lazy, Suspense } from 'react';
import { useQueries } from 'react-query';
import { getNowPlaying, getPopularMovie, getTopRatedMovie, getUpcomingMovie } from '../network/api';
import LoadingPage from './LoadingPage';

const MovieComponent = lazy(() => import('../components/Movies/Movies'));


function HomePage() {
    const movieData = useQueries([
        {
            queryKey: ['movies', 'nowPlaying'],
            queryFn: () => getNowPlaying(),
            staleTime: 1800 * 1000,
        },
        {
            queryKey: ["movies", "popular"],
            queryFn: () => getPopularMovie(),
            staleTime: 1800 * 1000,
        },
        {
            queryKey: ["movies", "topRated"],
            queryFn: () => getTopRatedMovie(),
            staleTime: 1800 * 1000,
        },
        {
            queryKey: ["movies", "upComing"],
            queryFn: () => getUpcomingMovie(),
            staleTime: 1800 * 1000,
        },
    ]);

    return (
        <Suspense fallback={<LoadingPage />}>
            <MovieComponent movieData={movieData || []} />
        </Suspense>
    );
}

export default HomePage;