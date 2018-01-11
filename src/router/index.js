import React from 'react';
import {
    StackNavigator,
    DrawerNavigator,
    NavigationActions
} from 'react-navigation';
import {Color} from "src/utils/color";
import Login from "src/screens/Login"
import SignUp from "src/screens/SignUp";
import ForgotPassword from "src/screens/ForgotPassword";
import Home from "src/screens/Home";
import Notification from "src/screens/Notification";
import Friends from "src/screens/Friends";
import Setting from "src/screens/Setting";
import {drawerWidth} from "../utils/theme";
import {View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SideBar from 'src/component/view/DrawerHeader';

//Navigation header and title style
const navigationTitle = {
    color: Color.WHITE
};
const navigationStyle = {
    backgroundColor: Color.PRIMARY
};
const drawerContentItems = {
    activeTintColor: Color.PRIMARY,
    inactiveTintColor: Color.BLACK,
};

const renderDrawerIcon = (navigation) => {
    return (
        <Icon name="dehaze"
              color="white"
              size={30}
              style={{padding: 10}}
              onPress={() => navigation.navigate('DrawerOpen')}/>
    );
};

//Stack navigator that contain all preLogin component.
export const NotAuthenticated = StackNavigator({
    start: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    signUp: {
        screen: SignUp,
        navigationOptions: {
            title: "Sign Up",
            headerTitleStyle: navigationTitle,
            headerStyle: navigationStyle,
            headerTintColor: Color.WHITE
        }
    },
    forgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            title: "Reset Password",
            headerTitleStyle: navigationTitle,
            headerStyle: navigationStyle,
            headerBackTitle: null,
            headerTintColor: Color.WHITE
        }
    }
});

export const homeStack = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
            title: "Home",
            headerTitleStyle: navigationTitle,
            headerStyle: navigationStyle,
            headerBackTitle: null,
            headerTintColor: Color.WHITE,
            headerLeft: renderDrawerIcon(navigation)
        }),
    }
});

export const notificationStack = StackNavigator({
    Notification: {
        screen: Notification,
        navigationOptions: ({navigation}) => ({
            title: "Notification",
            headerTitleStyle: navigationTitle,
            headerStyle: navigationStyle,
            headerBackTitle: null,
            headerTintColor: Color.WHITE,
            headerLeft: renderDrawerIcon(navigation)
        }),
    }
});

export const friendsStack = StackNavigator({
    Friends: {
        screen: Friends,
        navigationOptions: ({navigation}) => ({
            title: "Friends",
            headerTitleStyle: navigationTitle,
            headerStyle: navigationStyle,
            headerBackTitle: null,
            headerTintColor: Color.WHITE,
            headerLeft: renderDrawerIcon(navigation)
        }),
    }
});

export const settingStack = StackNavigator({
    Setting: {
        screen: Setting,
        navigationOptions: ({navigation}) => ({
            title: "Setting",
            headerTitleStyle: navigationTitle,
            headerStyle: navigationStyle,
            headerBackTitle: null,
            headerTintColor: Color.WHITE,
            headerLeft: renderDrawerIcon(navigation)
        }),
    }
});

export const Authenticated = DrawerNavigator({
        Home: {
            screen: homeStack,
            navigationOptions: {
                drawerIcon: <View>
                    <Icon name="home" size={20}/>
                </View>
            }
        },
        Notification: {
            screen: notificationStack,
            navigationOptions: {
                drawerIcon: <View>
                    <Icon name="notifications" size={20}/>
                </View>
            }
        },
        Friends: {
            screen: friendsStack,
            navigationOptions: {
                drawerIcon: <View>
                    <Icon name="group" size={20}/>
                </View>
            }
        },
        Settings: {
            screen: settingStack,
            navigationOptions: {
                drawerIcon: <View>
                    <Icon name="settings" size={20}/>
                </View>
            }
        },
    },
    //Remove following object if you want to give system default sidebar menu.
    {
        drawerWidth: drawerWidth(),
        initialRouteName: "Home",
        contentOptions: drawerContentItems,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        contentComponent: props => <SideBar {...props}/>,
    }
);


// It check is user already authenticate or not.
export const createRootNavigator = (signedIn = false) => {
    return StackNavigator({
            NotAuthenticated: {
                screen: NotAuthenticated,
                navigationOptions: {
                    header: null
                }
            },
            Authenticated: {
                screen: Authenticated,
                navigationOptions: {
                    header: null
                }
            },
        },
        {
            initialRouteName: signedIn ? "Authenticated" : "NotAuthenticated"
        }
    );
};

// It prevent constant click on component to navigate on another screen.
const navigateOnce = (getStateForAction) => (action, state) => {
    const {type, routeName} = action;
    return (
        state &&
        type === NavigationActions.NAVIGATE &&
        routeName === state.routes[state.routes.length - 1].routeName
    ) ? null : getStateForAction(action, state);
};

NotAuthenticated.router.getStateForAction = navigateOnce(NotAuthenticated.router.getStateForAction);
homeStack.router.getStateForAction = navigateOnce(homeStack.router.getStateForAction);
notificationStack.router.getStateForAction = navigateOnce(notificationStack.router.getStateForAction);
friendsStack.router.getStateForAction = navigateOnce(friendsStack.router.getStateForAction);
settingStack.router.getStateForAction = navigateOnce(settingStack.router.getStateForAction);

