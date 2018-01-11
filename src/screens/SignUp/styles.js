import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Color} from "src/utils/color";
import {NAV_HEIGHT} from "src/utils/theme";

const win = Dimensions.get('window');

export default styles = StyleSheet.create({
    signUp_Scroll: {
        width: win.width,
        height: win.height,
        backgroundColor: Color.BG_COLOR,
    },
    signUp_Container: {
        flex: 1,
        width: win.width,
        height: win.height - (NAV_HEIGHT + 25),
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.BG_COLOR,
    },
    signUp_Content: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingBottom: 8,
        paddingTop: 8,
    },
    signUp_ET: {
        alignSelf: 'stretch',
    },
});