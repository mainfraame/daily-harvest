import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ProductCardList from './components/productCardList';
import IngredientSearch from './components/ingredientSearch';

import theme from './theme';

export default function App() {

    const [ingredients, setIngredients] = useState();

    const onChange = (e, ingredients) => {
        setIngredients(() => ingredients.map(({id}) => id));
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar
                    color='primary'
                    position='static'>
                    <Toolbar>
                        <Box mr={3.5}>
                            <Typography
                                variant='h6'
                                noWrap>
                                Daily Harvest
                            </Typography>
                        </Box>
                        <IngredientSearch
                            onChange={onChange}/>
                    </Toolbar>
                </AppBar>
                <ProductCardList
                    ids={ingredients}/>
            </ThemeProvider>
        </>
    );
}
