import { CircularProgress } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material';

const LoaderWrapper = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	marginTop: theme.spacing(3),
}));
const Loader = () => {
	return (
		<LoaderWrapper>
			<CircularProgress />
		</LoaderWrapper>
	);
};

export default Loader;
