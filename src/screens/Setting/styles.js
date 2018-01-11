import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
const win = Dimensions.get('window');
import {Color} from "src/utils/color"

export default styles = StyleSheet.create({
    setting_Container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: Color.BG_COLOR,
    },
    setting_SeprationLine: {
        backgroundColor: Color.BORDER_COLOR,
        height: 1,
        alignSelf: 'stretch',
    },
    setting_UserDetail: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 5,
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    setting_label: {
        paddingTop: 2,
        paddingBottom: 2
    },
    setting_profile: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 5
    },
    setting_roundProfile: {
        backgroundColor: null,
        borderWidth: 0.5,
        borderColor: Color.BLACK
    }
});
