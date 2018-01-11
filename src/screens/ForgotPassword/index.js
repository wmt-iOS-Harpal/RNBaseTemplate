import React from 'react';
import {
    View,
    Keyboard,
    Alert
} from 'react-native';
import {
    NavigationActions,
} from 'react-navigation';
import styles from './styles';
import RoundButton from 'src/component/ui/RoundButton';
import FloatingInputText from 'src/component/ui/FloatingInputText';
import {Color} from "src/utils/color"
import Label from "src/component/ui/Label/index";
import {Row, Column as Col} from 'react-native-responsive-grid';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import {validate} from 'src/validation';
import {AlertMessage} from "src/utils/message";

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            errorEmail: '',
            isLoaderVisible: false
        }
    }

    resetPwdTapped = () => {
        Keyboard.dismiss();
        const emailError = validate('email', this.state.email == '' ? null : this.state.email);

        this.setState({
            errorEmail: emailError,
        });

        if (emailError) {
            return;
        };
        Alert.alert('', AlertMessage.forgotPassword, [{
            text: 'OKAY', onPress: () => {
                this.props.navigation.dispatch(NavigationActions.back({key: null}))
            }
        },
        ], {cancelable: false});
    }

    render() {
        return (
            <View style={styles.fogotpwd_Container}
                  onResponderGrant={dismissKeyboard}
                  onStartShouldSetResponder={() => true}>

                <View style={styles.fogotpwd_Content}>
                    <Label xlarge color={Color.TEXT_PRIMARY} mt={10}>
                        Reset Password
                    </Label>

                    <Row>
                        <Col size={60} smSize={80}>
                            <Label align='center' small color={Color.TEXT_SECONDARY} mt={5} mb={5}>
                                Enter your email and we'll send you a link to reset your
                                password.
                            </Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col size={60} smSize={80}>
                            <FloatingInputText style={styles.etEmail}
                                               placeholder="Email"
                                               required
                                               keyboardType='email-address'
                                               autoCapitalize='none'
                                               autoCorrect={false}
                                               error={this.state.errorEmail}
                                               onChangeText={(email) => this.setState({email})}/>

                            <RoundButton btn_block click={this.resetPwdTapped}>RESET PASSWORD</RoundButton>
                        </Col>
                    </Row>
                </View>
            </View>
        );
    }
}