/**
 * Created by KG on 8/8/16.
 */
import getMuiTheme from 'material-ui/styles/getMuiTheme';
var colors = require('material-ui/styles/colors');

var theme = getMuiTheme({
    fontFamily: 'SuperCell',
    appBar: {
        color: colors.black,
    }
});

exports.theme = theme;
