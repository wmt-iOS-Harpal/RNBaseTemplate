import React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';
import {Color} from 'src/utils/color'
import {NAV_HEIGHT} from "src/utils/theme";

const win = Dimensions.get('window');

export default styles = StyleSheet.create({
    login_Scroll: {
        backgroundColor: Color.BG_COLOR,
        flex: 1
    },
    login_Container: {
        flex: 1,
        width: win.width,
        height: win.height,
        backgroundColor: Color.BG_COLOR,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    login_Content: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingBottom: 20,
        paddingTop: 20,
    },
    login_etEmail: {
        alignSelf: 'stretch',
    },
    login_appIcon: {
        height:80,
        aspectRatio:1
    },
    login_tvForgotPwd: {
        alignSelf: 'center',
    },
})