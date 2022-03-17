import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#2C80ED',
      main: '#283593',
      // dark:'#333',
      contrastText: '#fff',
    },
    secondary: {
      light: '#A4EAE3',
      main: '#26A69A',
      // dark:'#333',
      contrastText: '#fff',
    },
    error: {
      light: '#FEEFEF',
      main: '#FF7875',
      dark: '#DA1414',
      contrastText: '#FFF',
    },

    info: {
      light: '#E6F7FF',
      main: '#69C0FF',
      dark: '#1890FF',
      contrastText: '#FFF',
    },
    // warning:{
    //     light: '#FFFBE6',
    //     main: '#FFE58F',
    //     dark:'#FAAD14',
    //     contrastText:'#FFF'
    // },

    // success:{
    //     light: '#F6FFED',
    //     main: '#B7EB8F',
    //     dark:'#7CB342',
    //     contrastText:'#FFF'
    // },

    text: {
      primary: '#364156',
    },

    typography: {
      htmlFontSize: 16,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,

      h1: {
        fontSize: '4rem',
        lineHeight: '4rem',
      },
      h2: {
        fontSize: '2.5rem',
        lineHeight: '3.25rem',
      },
      h3: {
        fontSize: '1.75rem',
        lineHeight: '2.25rem',
      },
      h4: {
        fontSize: '1.25rem',
        lineHeight: '1.62rem',
      },
      body1: {
        lineHeight: '1.5rem',
      },
    },
  },
});

export default theme;
