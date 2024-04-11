import React from 'react';
import { useDispatch } from 'react-redux';
import { searchMovies } from '../redux/search';
import Downshift from 'downshift';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Grid, Typography, TextField, MenuItem } from '@mui/material';
import { BASE_URL } from '../config';
import { COVER_PLACEHOLDER } from '../config';
import { styled } from '@mui/system';
import { mapGenres } from '../lib/helper';

const PaperStyled = styled(Paper)({
	backgroundColor: 'darkgoldenrod',
});

const MenuItemStyled = styled(MenuItem)({
	paddingTop: 5,
	paddingBottom: 5,
});

const ImgStyled = styled('img')({
	heigth: '100%',
});

const LinkStyled = styled(Link)({
	display: 'block',
	textDecoration: 'none',
});

const TitleStyled = styled(Typography)({
	color: 'black',
	paddingTop: 10,
});
const GenresStyled = styled(Typography)({
	color: 'black',
});
const Suggestion = ({ movies, genres }) => {
	const dispatch = useDispatch();

	const inputOnChange = (event) => {
		if (!event.target.value) {
			return;
		}
		dispatch(searchMovies(event.target.value));
	};
	const itemToString = () => '';
	return (
		<Downshift itemToString={itemToString}>
			{({
				getInputProps,
				getItemProps,
				getMenuProps,
				inputValue,
				highlightedIndex,
				selectedItem,
				isOpen,
			}) => (
				<div>
					<TextField
						id='suggestion'
						placeholder='Search'
						variant='standard'
						fullWidth={true}
						sx={{ mb: 1 }}
						inputProps={{
							...getInputProps({
								onChange: inputOnChange,
							}),
						}}
					/>
					{isOpen ? (
						<PaperStyled square={true} {...getMenuProps()}>
							{movies.results
								.slice(0, 10)
								.filter(
									(item) =>
										!inputValue ||
										item.title.toLowerCase().includes(inputValue.toLowerCase())
								)
								.map((item, index) => (
									<MenuItemStyled
										{...getItemProps({
											item,
											key: item.id,
											selected: highlightedIndex === index,
											style: {
												fontWeight: selectedItem === item ? 500 : 400,
											},
										})}
									>
										<LinkStyled to={`/movie/${item.id}`} key={index}>
											<Grid container={true} spacing={8}>
												<Grid item={true}>
													{item.poster_path ? (
														<ImgStyled
															src={`${BASE_URL}/w92${item.poster_path}`}
															alt='image of movie'
														/>
													) : (
														<ImgStyled
															src={`${COVER_PLACEHOLDER}`}
															alt='cover placeholder'
														/>
													)}
												</Grid>
												<Grid item={true}>
													<TitleStyled variant='h4'>
														{item.title}
													</TitleStyled>
													<GenresStyled variant='caption'>
														{mapGenres(item.genre_ids, genres)}
													</GenresStyled>
												</Grid>
											</Grid>
										</LinkStyled>
									</MenuItemStyled>
								))}
						</PaperStyled>
					) : null}
				</div>
			)}
		</Downshift>
	);
};

export default Suggestion;
