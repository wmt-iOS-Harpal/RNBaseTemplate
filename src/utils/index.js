import {
    Platform,
    NetInfo,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import moment from "moment";


const {
    Version,
    OS,
} = Platform;

export const IS_ANDROID = OS === 'android';
export const IS_LT_LOLLIPOP = Version < 21;
export const noop = () => {
};

export const showSnackBar = (message) => {
    setTimeout(() => {
        Snackbar.show({
            title: message,
            duration: Snackbar.LENGTH_SHORT,
        });
    }, 100);
};

export const strDateToLocal = (strDate, timeFormat) => {
    return moment.utc(strDate).local().format(timeFormat);
};

export const isNetworkConnected = () => {
    if (Platform.OS === 'ios') {
        return new Promise(resolve => {
            const handleFirstConnectivityChangeIOS = isConnected => {
                NetInfo.isConnected.removeEventListener('change', handleFirstConnectivityChangeIOS);
                resolve(isConnected);
            };
            NetInfo.isConnected.addEventListener('change', handleFirstConnectivityChangeIOS);
        });
    }
    return NetInfo.isConnected.fetch();
};