//That file manage all theme related task and it change on depend on dimension of device.

import React from 'react';
import {PixelRatio, Platform, Dimensions, StyleSheet} from 'react-native';
import {Color} from "src/utils/color";
import {relativeWidth} from "./dimensions";

const {width, height} = Dimensions.get('window');
const realWidth = height > width ? width : height;

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
export const NAV_HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;
const TAB_HEIGHT = 49;

const fontBaseXSmall = 12;
const fontBaseSmall = 15;
const fontBaseNormal = 17;
const fontBaseLarge = 20;
const fontBaseXLarge = 24;

const isTablet = () => {
    let pixelDensity = PixelRatio.get();
    let adjustedWidth = width * pixelDensity;
    let adjustedHeight = height * pixelDensity;
    if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
        return true;
    } else if (pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)) {
        return true;
    } else {
        return false;
    }
};

const responsiveHeight = (height) => {
    if (!isTablet())
        return height;
    else
        return (height + (height * 0.25));

};

const drawerWidth = () => {
    if (!isTablet())
        return relativeWidth(75);
    else
        return relativeWidth(60);
};

export const cardStyle = {
    borderRadius: 1,
    borderBottomWidth: 0,
    shadowColor: Color.BLACK,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 5,
    shadowRadius: 2,
    elevation: 2,
};

export const circleStyle = {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: Color.BORDER_COLOR
};

const responsiveFontSize = (fontSize) => {
    let divider = isTablet() ? 600 : 375;
    return Math.round(fontSize * realWidth / divider);
};

const fontXSmall = responsiveFontSize(fontBaseXSmall);
const fontSmall = responsiveFontSize(fontBaseSmall);
const fontNormal = responsiveFontSize(fontBaseNormal);
const fontLarge = responsiveFontSize(fontBaseLarge);
const fontXLarge = responsiveFontSize(fontBaseXLarge);


export {
    fontXSmall, fontSmall, fontNormal, fontLarge, fontXLarge, drawerWidth,responsiveHeight
};
