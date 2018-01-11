import {
    View,
    Keyboard
} from 'react-native';
import React from 'react';
import RoundButton from "src/component/ui/RoundButton/index";
import PasswordInputText from "src/component/ui/PasswordInputText/index";
import FloatingInputText from "src/component/ui/FloatingInputText/index";
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import {Row, Column as Col} from 'react-native-responsive-grid';
import styles from './styles'
import KeyboardAwareScrollView from "react-native-keyboard-aware-scroll-view/lib/KeyboardAwareScrollView";
import Label from "src/component/ui/Label/index";
import {Color} from "src/utils/color";
import {maxCharLength} from "src/utils/constant";
import {validate, PasswordValidate} from 'src/validation';
import {connect} from 'react-redux';
import {
    setUser,
} from "src/redux/auth/action";
import userPlaceholder from 'src/assets/user_placeholder.png';
import {
    NavigationActions,
} from 'react-navigation';
import {showSnackBar} from "../../utils/index";


class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phoneNo: null,
            email: null,
            password: null,
            confirmPassword: null,

            errorPhoneNo: '',
            errorEmail: '',
            errorPassword: '',
            errorConfirmPassword: ''
        }
    }

    onSignUpTapped = () => {
        Keyboard.dismiss();
        const phoneError = validate('phoneNo', this.state.phoneNo)
        const emailError = validate('email', this.state.email)
        const passwordError = validate('password', this.state.password)
        const confirmPasswordError = PasswordValidate(this.state.password, this.state.confirmPassword);

        this.setState({
            errorPhoneNo: phoneError,
            errorEmail: emailError,
            errorPassword: passwordError,
            errorConfirmPassword: confirmPasswordError
        });

        if (phoneError || emailError || passwordError || confirmPasswordError) {
            return;
        }
        let self = this;
        let user = {
            id: 2,
            name: "Test User",
            email: self.state.email,
            profile_pic: userPlaceholder,
            password: self.state.password,
            mobile_no: self.state.phoneNo
        }
        self.props.setUser(user);
        showSnackBar("SignUp success");

        self.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Authenticated'}),
            ],
            key: null
        }));
    }

    render() {
        return (
            <KeyboardAwareScrollView
                style={styles.signUp_Scroll}
                alwaysBounceVertical={false}
                resetScrollToCoords={{x: 0, y: 0}}
                scrollEnabled={true}
                keyboardShouldPersistTaps="always"
                enableOnAndroid={true}>
                <View style={styles.signUp_Container}
                      onResponderGrant={dismissKeyboard}
                      onStartShouldSetResponder={() => true}>
                    <View style={styles.signUp_Content}>

                        <Label xlarge color={Color.TEXT_PRIMARY} mt={10} mb={10}>
                            Signup to RNBase Project
                        </Label>
                        <Row>
                            <Col size={60} smSize={80}>
                                <FloatingInputText style={styles.signUp_ET}
                                                   placeholder="Phone"
                                                   required
                                                   keyboardType='phone-pad'
                                                   error={this.state.errorPhoneNo}
                                                   onChangeText={(phoneNo) => this.setState({phoneNo})}
                                                   maxLength={maxCharLength.phoneNo}
                                                   prefix="+91"/>

                                <FloatingInputText style={styles.signUp_ET}
                                                   placeholder="Email"
                                                   required
                                                   keyboardType='email-address'
                                                   error={this.state.errorEmail}
                                                   autoCapitalize='none'
                                                   autoCorrect={false}
                                                   onChangeText={(email) => this.setState({email})}/>

                                <PasswordInputText style={styles.signUp_ET}
                                                   ref="password"
                                                   placeholder="Password"
                                                   required
                                                   password={true}
                                                   error={this.state.errorPassword}
                                                   onChangeText={(password) => this.setState({password})}/>

                                <PasswordInputText style={styles.signUp_ET}
                                                   ref="confirmPassword"
                                                   placeholder="Confirm Password"
                                                   required
                                                   password={true}
                                                   error={this.state.errorConfirmPassword}
                                                   onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>
                                <RoundButton btn_block mt={15} mb={10} click={this.onSignUpTapped}>
                                    SIGN UP
                                </RoundButton>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);