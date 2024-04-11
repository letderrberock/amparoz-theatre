import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPopularMovies, resetState } from '../redux/movies';
import Loader from '../components/Loader';
import Movies from '../components/Movies';
import { Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

const PopularMovies = () => {
	const dispatch = useDispatch();
	const { movies } = useSelector((store) => store);
	const { genres } = useSelector((store) => store.genres);

	const loadMore = () => {
		if (movies.hasMore) {
			dispatch(getPopularMovies(movies.page + 1));
		}
	};

	useEffect(() => {
		dispatch(getPopularMovies());
		return () => {
			resetState();
		};
	}, [dispatch]);

	return movies.page === 0 && movies.isFetching ? (
		<Loader />
	) : (
		<>
			<Typography component='h2' variant='h3' gutterBottom={true}>
				Popular Movies
			</Typography>
			<InfiniteScroll
				dataLength={movies.totalResults}
				hasMore={movies.hasMore}
				next={loadMore}
				loader={<Loader />}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
				style={{
					overflow: 'hidden',
				}}
			>
				<Movies movies={movies} genres={genres} />
			</InfiniteScroll>
		</>
	);
};

export default PopularMovies;
