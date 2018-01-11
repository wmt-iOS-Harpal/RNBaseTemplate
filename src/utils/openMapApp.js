//that file is used to open native map app from our app using DeepLink

import React from 'react';
import { Linking, Platform } from 'react-native';

export function open(latitude, longitude, zoomLevel = 15, provider = (Platform.OS === 'ios') ? 'apple' : 'google') {
    createOpenLink({latitude, longitude, zoomLevel, provider})();
}

export function createOpenLink({latitude, longitude, zoomLevel = 15, provider}) {
    const mapLink = createMapLink({latitude, longitude, zoomLevel, provider:  provider});

    // Returns a delayed function that opens when executed
    return () => Linking.openURL(mapLink).catch(err => console.error('An error occurred', err));
}

export function createMapLink({latitude, longitude, zoomLevel = 50, provider}) {
    const link = {
        'google': `http://maps.google.com/maps?q=${latitude},${longitude}&z=${zoomLevel}`,
        'apple': `http://maps.apple.com/?daddr=${latitude},${longitude}&z=${zoomLevel}`
    };
    return link[provider];
}

