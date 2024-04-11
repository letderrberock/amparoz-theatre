import React from 'react';
import { ImageList, ImageListItem, ImageListItemBar, useMediaQuery, useTheme } from '@mui/material';
import { BASE_URL } from '../config';
import { Link } from 'react-router-dom';
import { mapGenres } from '../lib/helper';
import { styled } from '@mui/material';

const ImgStyled = styled('img')({
	height: '100%',
	width: '100%',
	objectFit: 'cover',
});

const ImageListItemStyled = styled(ImageListItem)({
	overflow: 'hidden',
});
const Movies = ({ movies, genres }) => {
	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<div>
			<ImageList cols={matchDownMd ? 1 : 5} rowHeight={365} gap={12}>
				{movies.results.map((movie) => {
					return (
						<ImageListItemStyled key={movie.id}>
							<Link to={`/movie/${movie.id}`}>
								{movie.poster_path && (
									<ImgStyled
										src={`${BASE_URL}/w300${movie.poster_path}?`}
										alt={movie.title}
									/>
								)}
								<ImageListItemBar
									title={movie.title}
									subtitle={mapGenres(movie.genre_ids, genres)}
								/>
							</Link>
						</ImageListItemStyled>
					);
				})}
			</ImageList>
		</div>
	);
};

export default Movies;
