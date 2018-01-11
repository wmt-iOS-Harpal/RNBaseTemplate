import React from 'react';

import {StyleSheet} from 'react-native';
import {Color} from "src/utils/color";
import {responsiveHeight} from "src/utils/theme";


export default styles = StyleSheet.create({
    drawerHeader_container: {
        height: 175,
        justifyContent: 'center',
        borderBottomColor: Color.BORDER_COLOR,
        borderBottomWidth: 1,
        paddingLeft: 25,
        paddingTop: 20,
        marginBottom: 8

    },
    drawerHeader_item_container: {
        flexDirection: 'row',
        paddingLeft: 25,
        alignItems: 'center',
        height: 40,

    },
    drawerHeader_item_title: {
        marginLeft: 10
    },
    drawerHeader_imageContainer: {
        height: responsiveHeight(70),
        width: responsiveHeight(70),
        borderRadius: responsiveHeight(35),
        backgroundColor: Color.BORDER_COLOR
    },
    drawerHeader_image: {
        height: responsiveHeight(70),
        width: responsiveHeight(70),
        borderRadius: responsiveHeight(35),
        borderWidth: 0.5, borderColor: Color.BLACK
    },
    drawerHeader_text_content: {
        flexDirection: 'column',
        paddingTop: 5
    },
    drawerHeader_borderLine: {
        backgroundColor: Color.BORDER_COLOR,
        height: 1,
        flex: 1,
        marginBottom: 8,
        marginTop: 8
    }
});