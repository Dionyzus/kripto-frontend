import React from 'react';
import {Container, Grid, Typography} from '@material-ui/core';

export default function About()
{
    return(
        <Container maxWidth='md'>
            <Grid item xs>
                <Typography variant='h5'>
                    About page
                </Typography>
            </Grid>
        </Container>
    );
}