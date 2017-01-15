import darkTheme from 'material-ui/styles/baseThemes/darkBaseTheme.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
export default getMuiTheme({
  ...darkTheme,
  // spacing: spacing,
  // fontFamily: 'Roboto, sans-serif',
  palette: {
    ...darkTheme.palette,
    canvasColor: '#303030',
  },
  appBar: {
    color: '#303030',
    textColor: '#FFFFFF'
  },
});
