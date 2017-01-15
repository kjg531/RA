/**
 * Created by KG on 8/8/16.
 */
import getMuiTheme from 'material-ui/styles/getMuiTheme';

var colors = require('material-ui/styles/colors');
var ehiColors = require('./eHIcolors');


var theme = getMuiTheme({
    fontFamily: 'SuperCell',
    palette: {
        primary1Color: ehiColors.black,
        primary2Color: ehiColors.blue,
        accent1Color: 'rgb(228, 64, 71)',
        alternateTextColor: ehiColors.black,
    },
    appBar: {
        color: colors.black,
    },
    stepper: {
        textColor: colors.black,
        backgroundColor: colors.white,
        iconColor: ehiColors.pink,
        inactiveIconColor: ehiColors.blue
    },
    textField: {
        textColor: colors.black,
        hintColor: colors.black,
    },
    flatButton: {
    },
    svgIcon: {
      color: colors.black,
    },
    toggle: {
        thumbOnColor: 'rgb(228, 64, 71)',
        trackOnColor: 'rgb(228, 64, 71)',
        thumbOffColor: 'rgb(252, 252, 163)',
        trackOffColor: 'rgb(252, 252, 163)',
    },
     datePicker: {
         selectTextColor: ehiColors.black,
         textColor: ehiColors.black,
         calendarTextColor: ehiColors.black,
         color: ehiColors.black,
     },
    raisedButton: {
         primaryColor: ehiColors.pink,
    },
    timePicker: {
        color: ehiColors.white,
        headerColor: ehiColors.pink,
        accentColor: ehiColors.pink,
        selectTextColor: ehiColors.white,
    },
    dialog: {
        bodyColor: ehiColors.black,
    },
    tabs: {
        textColor: ehiColors.white,
        selectedTextColor: 'rgb(228, 64, 71)',
    },
    ripple: {
        color: ehiColors.white,
    },
    checkbox: {
        boxColor: ehiColors.white,
        checkedColor: 'rgb(228, 64, 71)',
    }
});

export default theme;
