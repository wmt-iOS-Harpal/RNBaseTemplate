import React from 'react';
import {
    Image,
    View,
    Keyboard
} from 'react-native';
import styles from './styles'
import Label from "src/component/ui/Label/index";
import {Color} from "src/utils/color";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import appLogo from 'src/assets/react-logo.png'
import RoundButton from "src/component/ui/RoundButton/index";
import {Row, Column as Col} from 'react-native-responsive-grid';
import PasswordInputText from "src/component/ui/PasswordInputText/index";
import FloatingInputText from "src/component/ui/FloatingInputText/index";
import {ErrorMessage} from "src/utils/message";
import {validate} from 'src/validation';
import {showSnackBar} from "src/utils/index";
import {connect} from 'react-redux';
import {
    setUser,
} from "src/redux/auth/action";
import userPlaceholder from 'src/assets/user_placeholder.png';
import {
    NavigationActions,
} from 'react-navigation';
import {createRootNavigator} from "../../router/index";



class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errorEmail: '',
            errorPwd: '',
            email: '',
            password: '',
            isLoaderVisible: false
        };
    };

    onLoginTapped = () => {
        Keyboard.dismiss();
        const emailError = validate('email', this.state.email == '' ? null : this.state.email);
        let passwordError = '';

        if (this.state.password === '')
            passwordError = ErrorMessage.passwordRequired;

        this.setState({
            errorEmail: emailError,
            errorPwd: passwordError
        });

        if (emailError || passwordError) {
            return;
        };
        let self = this;
        let user = {
            id: 2,
            name: "Test User",
            email: self.state.email,
            profile_pic: userPlaceholder,
            password: self.state.password,
            mobile_no: "7698472475"
        }
        self.props.setUser(user);
        showSnackBar("Login success");
        self.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Authenticated'}),
            ],
            key: null
        }));
    }

    onSignUpTapped = () => {
        this.props.navigation.navigate("signUp");
    }

    onForgotPasswordTapped = () => {
        this.props.navigation.navigate("forgotPassword");
    }

    render() {
        return (
            <KeyboardAwareScrollView
                bounces={false}
                style={styles.login_Scroll}
                resetScrollToCoords={{x: 0, y: 0}}
                scrollEnabled={true}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                <View style={styles.login_Container}
                      onResponderGrant={dismissKeyboard}
                      onStartShouldSetResponder={() => true}>

                    <View style={styles.login_Content}>

                        <Image source={appLogo} style={styles.login_appIcon}/>

                        <Label xlarge color={Color.TEXT_PRIMARY} mt={40} mb={20}>Login to RNBase Project</Label>
                        <Row>
                            <Col size={60} smSize={80}>
                                <FloatingInputText style={styles.login_etEmail}
                                                   placeholder="Email"
                                                   error={this.state.errorEmail}
                                                   keyboardType='email-address'
                                                   autoCorrect={false}
                                                   autoCapitalize='none'
                                                   onChangeText={(email) => this.setState({email})}>
                                </FloatingInputText>

                                <PasswordInputText
                                    style={styles.login_etEmail}
                                    ref="password"
                                    placeholder="Password"
                                    autoCapitalize='none'
                                    error={this.state.errorPwd}
                                    onChangeText={(password) => this.setState({password})}>
                                </PasswordInputText>

                                <RoundButton btn_block mt={15} click={this.onLoginTapped}>
                                    SIGN IN
                                </RoundButton>

                                <Label small color={Color.TEXT_SECONDARY} mt={30} style={styles.login_tvForgotPwd}>
                                    Don't have an account?
                                    <Label small bold color={Color.TEXT_SECONDARY} mt={30} style={styles.login_tvForgotPwd}
                                       onPress={this.onSignUpTapped}> Sign Up!</Label>
                                </Label>
                                <Label small color={Color.TEXT_SECONDARY} mt={10} style={styles.login_tvForgotPwd}
                                       onPress={this.onForgotPasswordTapped}>Forgot your password?</Label>
                            </Col>
                        </Row>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user)),
    };
};
const mapStateToProps = (state) => {
    if (state === undefined)
        return {};
    return {
        user: state.user,
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);