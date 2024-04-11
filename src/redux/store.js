import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../redux/search';
import genresReducer from '../redux/genres';
import moviesReducer from '../redux/movies';
import createSagaMiddleware from 'redux-saga';
import watcherSaga from '../sagas';
import movieReducer from '../redux/movie';

const sagaMiddleWare = createSagaMiddleware();

const store = configureStore({
	reducer: {
		search: searchReducer,
		genres: genresReducer,
		movies: moviesReducer,
		movie: movieReducer,
	},
	middleware: (getDefaultMiddleWare) => {
		return getDefaultMiddleWare({ thunk: false }).prepend(sagaMiddleWare);
	},
});
sagaMiddleWare.run(watcherSaga);

export default store;
