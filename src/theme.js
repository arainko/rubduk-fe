import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme( {
    palette: {
        type: 'light',
        primary: {
            main: '#212121',
            light: '#484848',
            dark: '#000000',
    },
    secondary: {
        main: '#ffee58',
        light: '#ffff8b',
        dark: '#c9bc1f',
    },
    error: {
        main: red.A400,
    },
    background: {
        default: '#282c34',
    },
},
  overrides: {
    MuiPaper: {
      root: {
        padding: '20px 10px',
        margin: '10px',
        backgroundColor: '#fff', // 5d737e
      },
    },
    MuiButton: {
      root: {
        margin: '5px',
      },
    },
  },
});
export default theme;