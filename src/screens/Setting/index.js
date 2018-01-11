import React from 'react';
import {
    Image,
    View,
    Alert
} from 'react-native';
import styles from './styles';
import Label from "src/component/ui/Label/index";
import {circleStyle} from "src/utils/theme";
import Ripple from "src/component/ui/Ripple/index";
import {Color} from "src/utils/color";
import {connect} from 'react-redux';
import {
    logout,
} from "src/redux/auth/action";
import Icon from "react-native-vector-icons/MaterialIcons";
import {AlertMessage} from "src/utils/message";
import {
    NavigationActions,
} from 'react-navigation';

class Setting extends React.Component {

    onUpdateProfile = () => {
        //this.props.navigation.navigate('EditProfile');
    };

    onSignOutTapped = () => {
        Alert.alert(
            AlertMessage.logoutTitle,
            AlertMessage.logoutMsg,
            [
                {
                    text: AlertMessage.cancel, onPress: () => {
                }
                },
                {text: AlertMessage.ok, onPress: () => {
                    this.props.logout();
                    this.props.navigation.dispatch(NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName: 'NotAuthenticated'}),
                        ],
                        key: null
                    }));
                }},
            ]
        )
    };

    render() {
        return(
            <View style={styles.setting_Container}>
                <Label roboto_medium ml={10} mt={20} mb={5}>
                    Profile
                </Label>
                <View style={styles.setting_SeprationLine}/>

                <Ripple style={styles.setting_UserDetail} onPress={this.onUpdateProfile}>
                    {
                        this.props.user &&
                        <View style={circleStyle}>
                            <Image source={this.props.user.profile_pic}
                                   style={[circleStyle, styles.setting_roundProfile]}/>
                        </View>
                    }
                    <View style={styles.setting_profile}>
                        {
                            this.props.user &&
                            <Label style={styles.setting_label} small>
                                {this.props.user.email}
                            </Label>
                        }
                        {
                            this.props.user &&
                            <Label style={styles.setting_label} small>
                                {this.props.user.mobile_no.toString()}
                            </Label>
                        }
                    </View>
                    <Icon name='keyboard-arrow-right'
                          size={30}
                          color={Color.PRIMARY}
                    />
                </Ripple>
                <View style={styles.setting_SeprationLine}/>

                <Ripple style={{flexDirection: 'row', alignItems: 'center', paddingRight: 5}}
                        onPress={this.onPassowordUpdate}>
                    <Label style={{flex: 1}} small mt={12} ml={10} mb={12} roboto_medium align="left">
                        Change Password
                    </Label>
                    <Icon name='keyboard-arrow-right'
                          size={30}
                          color={Color.PRIMARY}
                    />
                </Ripple>
                <View style={styles.setting_SeprationLine}/>

                <Ripple onPress={this.onSignOutTapped}>
                    <Label small mt={12} ml={10} mb={12} roboto_medium align="left">
                        Sign Out
                    </Label>
                </Ripple>
                <View style={styles.setting_SeprationLine}/>
            </View>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    }
};
const mapStateToProps = (state) => {
    if (state === undefined) return {};
    return {
        user: state.user,
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Setting);