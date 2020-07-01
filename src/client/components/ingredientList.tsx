import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { Product } from '../../types/product';

export default React.memo<Product>((props) => (
    <>
        <Typography
            color='textPrimary'
            variant='body1'>
            Ingredients:
        </Typography>
        <List
            data-id={props.id}
            data-testid='ingredients'
            dense>
            {props.ingredients.map(({name}) => (
                <ListItem key={name}>
                    <ListItemText
                        data-testid='ingredient'
                        primary={name}/>
                </ListItem>
            ))}
        </List>
    </>
));
