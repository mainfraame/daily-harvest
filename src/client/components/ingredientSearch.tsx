import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import makeStyles from '@material-ui/core/styles/makeStyles';

import useIngredientsApi from '../hooks/useIngredientsApi';

import { Ingredient } from '../../types/ingredient';

const useStyles = makeStyles({
    root: {
        background: 'white',
        width: 350
    }
});

type IngredientSearchProps = {
    onChange(e: React.ChangeEvent<{}>, value: Ingredient[]): void;
}

export default React.memo<IngredientSearchProps>((props) => {

    const classes = useStyles();

    const {data} = useIngredientsApi();

    return (
        <Autocomplete<Ingredient, true>
            autoHighlight
            classes={{
                root: classes.root
            }}
            getOptionLabel={(option) => option.name}
            multiple
            onChange={props.onChange}
            options={data}
            renderInput={(params) => (
                <TextField
                    data-testid='search'
                    {...params}
                    inputProps={params.inputProps}
                    placeholder={params.InputProps.startAdornment ? undefined : 'search by ingredient'}
                    variant='standard'/>
            )}/>
    );
});
