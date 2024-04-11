import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PopularMovies from './containers/PopularMovies';
import MovieDetails from './containers/MovieDetails';
import Layout from './components/Layout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getGenres } from './redux/genres';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getGenres());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path='/' element={<PopularMovies />}></Route>
					<Route path='/movie/:id' element={<MovieDetails />}></Route>
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
