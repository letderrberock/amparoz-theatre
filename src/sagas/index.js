import { delay, call, all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchedMovies, searchMovies } from '../redux/search';
import TheMovieDBApi from '../lib/api';
import { fetchedGenres, getGenres } from '../redux/genres';
import { getPopularMovies, fetchedPopularMovies } from '../redux/movies';
import { getMovie, fetchedMovie } from '../redux/movie';

const api = new TheMovieDBApi(process.env.REACT_APP_API_KEY);

function* fetchPopularMovies(action) {
	yield put(fetchedPopularMovies(yield call(api.getPopularMovies, action.payload)));
}

function* fetchGenres() {
	yield put(fetchedGenres(yield call(api.getGenres)));
}

function* fetchSearchMovies(action) {
	yield delay(500);

	yield put(fetchedMovies(yield call(api.searchMovies, action.payload)));
}

function* fetchMovie(action) {
	yield put(fetchedMovie(yield call(api.getMovie, action.payload)));
}

export default function* watcherSaga() {
	yield all([
		yield takeEvery(getMovie.type, fetchMovie),
		yield takeEvery(getPopularMovies.type, fetchPopularMovies),
		yield takeEvery(getGenres.type, fetchGenres),
		yield takeLatest(searchMovies.type, fetchSearchMovies),
	]);
}
