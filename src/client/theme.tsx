import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import responsiveFontSizes from '@material-ui/core/styles/responsiveFontSizes';

const spacing = 8;
const fontSize = 12;

export default responsiveFontSizes(
    createMuiTheme({
        overrides: {
            // @ts-ignore - @material-ui/lab does not yet extend typings for Theme.overrides
            MuiAutocomplete: {
                endAdornment: {
                    right: 2,
                    top: `calc(50% - ${fontSize}px)`
                },
                input: {
                    textIndent: spacing
                },
                option: {
                    fontSize
                },
                popupIndicator: {
                    marginRight: 2
                }
            },
            MuiCard: {
                root: {
                    marginBottom: spacing * 3,
                    padding: spacing * 2
                }
            },
            MuiCardHeader: {
                root: {
                    padding: 0
                },
                title: {
                    fontSize: '1.1rem'
                }
            },
            MuiCardMedia: {
                root: {
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column'
                }
            },
            MuiChip: {
                root: {
                    height: 26
                },
                deleteIcon: {
                    margin: '0 2px 0 -6px'
                }
            },
            MuiCssBaseline: {
                '@global': {
                    html: {
                        WebkitFontSmoothing: 'auto'
                    }
                }
            },
            MuiInputBase: {
                input: {
                    fontSize,
                    height: 20
                }
            },
            MuiList: {
                root: {
                    overflow: 'auto'
                }
            }
        },
        palette: {
            primary: {
                main: '#191a1a'
            },
            secondary: {
                main: '#656666'
            }
        },
        spacing: spacing,
        typography: {
            fontSize
        }
    })
);
