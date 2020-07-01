import React, { useEffect } from 'react';
import { useStateList } from 'react-use';
import clsx from 'clsx';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#afafaf',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: theme.transitions.create(['color'], {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeInOut
        }),
        userSelect: 'none',
        '&:hover': {
            color: '#1f1f1f'
        }
    },
    active: {
        color: '#494949'
    }
}));

type ListNavigatorProps = {
    items: any[];
    onChange(index: number): void;
};

export default React.memo<ListNavigatorProps>((props) => {

    const classes = useStyles();

    const {currentIndex, next, prev, setStateAt} = useStateList(props.items);

    const onSelectIndex = (e) => {
        setStateAt(+e.currentTarget.dataset.id);
    };

    useEffect(
        () => {
            props.onChange(currentIndex);
        },
        [currentIndex]
    );

    return (
        <Box display='flex'
             alignItems='center'>
            <IconButton
                data-testid='navPrevBtn'
                onClick={prev}
                size='small'>
                <ArrowBackIcon/>
            </IconButton>
            <Box display='flex'
                 flex={1}
                 justifyContent='center'>
                {props.items.map((item, i) => (
                    <SvgIcon
                        key={i}
                        data-id={i}
                        data-testid='navIndexBtn'
                        className={clsx({[classes.active]: i === currentIndex}, classes.root)}
                        onClick={onSelectIndex}>
                        <circle cx='12' cy='12' r='8'/>
                    </SvgIcon>
                ))}
            </Box>
            <IconButton
                data-testid='navNextBtn'
                onClick={next}
                size='small'>
                <ArrowForwardIcon/>
            </IconButton>
        </Box>
    );
});
