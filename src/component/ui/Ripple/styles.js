import {StyleSheet} from 'react-native';

const radius = 30;
const styles = StyleSheet.create({
    ripple_Container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },

    ripple: {
        width: radius * 2,
        height: radius * 2,
        borderRadius: radius,
        overflow: 'hidden',
        position: 'absolute',
    },
});

export {styles, radius};
