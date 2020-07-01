import React from 'react';
import clsx from 'clsx';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';

import useProductsApi from '../hooks/useProductsApi';
import ProductCard from './productCard';

const useStyles = makeStyles((theme) => ({
    root: {
        columnGap: theme.spacing(4),
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(4, 1fr)'
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'repeat(2, 1fr)'
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: 'repeat(1, 1fr)'
        }
    }
}));

export default React.memo<{ ids: number[] }>((props) => {

    const classes = useStyles();

    const {data, isFetching} = useProductsApi(props.ids);

    return (
        <>
            {isFetching
                ? <LinearProgress
                    data-testid='loader'
                    color='secondary'
                    variant='indeterminate'/>
                : <Box
                    className={clsx({[classes.root]: data.length})}
                    m={3}>
                    {data.map((product) => (
                        <ProductCard
                            key={product.id}
                            {...product}/>
                    ))}
                    {!data.length &&
                    <Alert
                        data-testid='noProductsAlert'
                        severity='info'>
                        <AlertTitle>No Products Found</AlertTitle>
                        Try and search for another <strong>ingredient</strong>
                    </Alert>}
                </Box>
            }
        </>
    );
});
