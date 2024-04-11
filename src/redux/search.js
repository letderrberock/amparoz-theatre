import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	results: [],
	totalResults: 0,
	page: 0,
	totalPages: 0,
	isFetching: false,
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		searchMovies(state) {
			return {
				...state,
				isFetching: true,
			};
		},
		fetchedMovies(state, action) {
			return {
				...state,
				results: action.payload.results,
				totalResults: action.payload.total_results,
				page: action.payload.page,
				totalPages: action.payload.total_pages,
				isFetching: false,
			};
		},
		resetMovies() {
			return initialState;
		},
	},
});
export const { searchMovies, fetchedMovies, resetMovies } = searchSlice.actions;
export default searchSlice.reducer;
