import React from 'react';
import {Container, Grid, Typography} from '@material-ui/core';

//Had something else in mind, can do later.
//Atm this page acts like placeholder for dashboard with more options.
export default function Search()
{
    return(
        <Container maxWidth='md'>
            <Grid item xs>
                <Typography variant='h5'>
                    Welcome page.. You can access protected routes.
                    Menu on the right enables log out.
                </Typography>
            </Grid>
        </Container>
    );
}