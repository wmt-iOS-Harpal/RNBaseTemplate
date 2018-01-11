import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {View} from 'react-native';
import FloatingInputText from "../FloatingInputText";
import {styles} from "./styles"
import {Color} from "../../../utils/color";

export default class PasswordInputText extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            icEye: 'visibility-off',
            password: true
        }
    }

    changePwdType = () => {
        if (this.state.password) {
            this.setState({
                icEye: 'visibility',
                password: false
            });
        } else {
            this.setState({
                icEye: 'visibility-off',
                password: true
            });
        }

    };


    render() {
        return (
            <View style={this.props.style}>
                <FloatingInputText {...this.props}
                                   password={this.state.password}
                                   clearButtonMode='never'/>
                <Icon style={styles.icon}
                      name={this.state.icEye}
                      size={25}
                      color={Color.TEXT_SECONDARY}
                      onPress={this.changePwdType}
                />
            </View>
        );
    }
}
