/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {createRootNavigator} from "src/router/index";
import {Provider} from 'react-redux';
import store from 'src/redux/store';
import {persistStore} from 'redux-persist';
import {
    AsyncStorage,
    DeviceEventEmitter,
    Platform,
} from 'react-native';
import {notificationKey} from "./src/utils/constant";


export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            checkedSignIn: false
        };
    }

    componentWillMount() {
        persistStore(store, {storage: AsyncStorage}, () => {
            this.setState({
                checkedSignIn: true,
                isSignedIn: store.getState().user
            })
        });

        DeviceEventEmitter.addListener(notificationKey.LOGOUT, (e) => {
            this.setState({
                isSignedIn: false
            });
        });
    }

    render() {
        const {checkedSignIn, isSignedIn} = this.state;
        if (!checkedSignIn) {
            return null;
        }

        const Layout = createRootNavigator(isSignedIn);
        return (
            <Provider store={store}>
                <Layout/>
            </Provider>
        );
    }
}