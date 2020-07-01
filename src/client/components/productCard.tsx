import React, { useMemo, useState } from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

import IngredientList from './ingredientList';
import ProductCardNav from './productCardNav';

import { Product } from '../../types/product';

export default React.memo<Product>((props) => {

    const [index, setIndex] = useState(0);

    const images = useMemo(
        () => ([
            ...props.images,
            null
        ]),
        [
            props.images
        ]
    );

    return (
        <Card
            data-id={props.id}
            data-name={encodeURIComponent(props.name)}
            data-nav-index={index}
            data-testid='productCard'>
            <CardHeader
                subheader={props.collection}
                title={props.name}/>
            <Box
                display='flex'
                flexDirection='column'
                height={250}
                mt={2}
                mb={2}>
                {images[index] === null
                    ? <IngredientList {...props}/>
                    : <CardMedia
                        data-id={index}
                        data-testid='productImg'
                        image={images[index] as string}
                        title={index.toString()}/>}
            </Box>
            <ProductCardNav
                items={images}
                onChange={setIndex}/>
        </Card>
    );
});
