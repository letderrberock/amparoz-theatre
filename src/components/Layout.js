import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';
import logoImg from '../logo.png';
import { styled } from '@mui/material';
import MovieSearchSuggestion from '../containers/MovieSearchSuggestion';
const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const Img = styled('img')({
	marginLeft: 'auto',
	marginRight: 'auto',
	display: 'block',
	width: 500,
	maxWidth: '100%',
});

const LayoutWrapper = styled('div')(({ theme }) => ({
	margin: 24,
	width: 'auto',
	[theme.breakpoints.up('lg')]: {
		marginLeft: 'auto',
		marginRight: 'auto',
		width: theme.breakpoints.values.lg,
	},
}));

const Layout = ({ children }) => {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<LayoutWrapper>
				<Link to={'/'}>
					<Img src={logoImg} alt='logo img' />
				</Link>
				<MovieSearchSuggestion />
				{children}
			</LayoutWrapper>
		</ThemeProvider>
	);
};

export default Layout;
