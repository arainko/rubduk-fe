import { CssBaseline, ThemeProvider, Typography } from '@material-ui/core';
import React from 'react';
import theme from '../../../theme';
import Grid from '@material-ui/core/Grid';
import Navbar from '../../Navbar/Nabvar';
import Link from '@material-ui/core/Link/Link';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Grid 
        container 
        direction="column"
        justify="center"
        alignItems="center">
            <Typography color="error" variant="h3">
                Quack! Page not found!
            </Typography>
            <Typography color="secondary" variant="h4">
            <Link href="/" underline="none" color="secondary">
                {'Go back'}
            </Link>
            </Typography>
        </Grid>
    </ThemeProvider>
  );
}