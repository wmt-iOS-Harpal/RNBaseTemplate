import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
const win = Dimensions.get('window');
import {Color} from "src/utils/color"

export default styles = StyleSheet.create({
    fogotpwd_Container: {
        flex: 1,
        backgroundColor: Color.BG_COLOR
    },
    fogotpwd_Content: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginTop: 50
    },
    etEmail: {
        marginBottom: 30,
        alignSelf: 'stretch'
    }
});
