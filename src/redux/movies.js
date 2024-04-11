import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	results: [],
	hasMore: false,
	totalResults: 0,
	page: 0,
	totalPages: 0,
	isFetching: false,
};

export const moviesSlice = createSlice({
	name: 'moviesSlice',
	initialState,
	reducers: {
		getPopularMovies: (state) => {
			return {
				...state,
				isFetching: true,
			};
		},
		fetchedPopularMovies: (state, action) => {
			return {
				...state,
				results: [...state.results, ...action.payload.results],
				page: action.payload.page,
				isFetching: false,
				hasMore: action.payload.page < action.payload.total_pages,
				totalResults: action.payload.total_results,
				totalPages: action.payload.totalPages,
			};
		},
		resetState: (state) => {
			return initialState;
		},
	},
});

export const { getPopularMovies, fetchedPopularMovies, resetState } = moviesSlice.actions;

export default moviesSlice.reducer;
