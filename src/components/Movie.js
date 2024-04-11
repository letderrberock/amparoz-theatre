import React from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material';
import { BASE_URL, COVER_PLACEHOLDER } from '../config';
import { Typography } from '@mui/material';
import Movies from './Movies';

const ImgStyled = styled('img')({
	height: '100%',
	width: '100%',
});

const GridStyled = styled(Grid)(({ theme }) => ({
	marginTop: theme.spacing(3),
	marginBottom: theme.spacing(3),
}));
const Movie = ({ movie, genres }) => {
	function toHoursAndMinutes(totalMinutes) {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hours}h, ${minutes}m`;
	}

	return (
		<>
			<GridStyled container={true} spacing={2}>
				<Grid item={true} md={3}>
					{movie.poster_path ? (
						<ImgStyled
							src={`${BASE_URL}/w300${movie.poster_path}`}
							alt={`${movie.title}`}
						/>
					) : (
						<ImgStyled src={`${COVER_PLACEHOLDER}`} alt={`${movie.title}`} />
					)}
				</Grid>
				<Grid item={true} md={9}>
					<Typography component='h1' variant='h3'>
						{movie.title}
					</Typography>
					{movie.tagline && (
						<>
							<Typography component='h3' variant='h6'>
								Tagline:
							</Typography>
							<Typography variant='body1' gutterBottom={true}>
								{movie.tagline}
							</Typography>
						</>
					)}
					{movie.genres && (
						<>
							<Typography component='h3' variant='h6'>
								Genres:
							</Typography>
							<Typography variant='body1' gutterBottom={true}>
								{movie.genres.map((genre) => genre.name).join(', ')}
							</Typography>
						</>
					)}
					{movie.production_countries && (
						<>
							<Typography component='h3' variant='h6'>
								Country:
							</Typography>
							<Typography variant='body1' gutterBottom={true}>
								{movie.production_countries
									.map((country) => country.name)
									.join(', ')}
							</Typography>
						</>
					)}
					{movie.runtime && (
						<>
							<Typography component='h3' variant='h6'>
								Duration:
							</Typography>
							<Typography variant='body1' gutterBottom={true}>
								{toHoursAndMinutes(movie.runtime)}
							</Typography>
						</>
					)}
					{movie.release_date && (
						<>
							<Typography component='h3' variant='h6'>
								Release date:
							</Typography>
							<Typography variant='body1' gutterBottom={true}>
								{new Date(movie.release_date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</Typography>
						</>
					)}
					{movie.overview && (
						<>
							<Typography component='h3' variant='h6'>
								Overview:
							</Typography>
							<Typography variant='body1' gutterBottom={true}>
								{movie.overview}
							</Typography>
						</>
					)}
				</Grid>
			</GridStyled>
			{movie.recommendations && (
				<>
					<Typography component='h2' variant='h4'>
						Recommended:
					</Typography>
					<Movies movies={movie.recommendations} genres={genres} />
				</>
			)}
		</>
	);
};

export default Movie;
