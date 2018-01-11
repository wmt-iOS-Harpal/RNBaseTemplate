import React from 'react';
import {Color} from "src/utils/color";
import TextField from "../Material-textfield/field/index";

export default class FloatingInputText extends React.Component {
    render() {
        return (
            <TextField tintColor={Color.PRIMARY}
                       containerStyle={this.props.style}
                       label={this.props.placeholder}
                       textColor={Color.TEXT_PRIMARY}
                       error={this.props.error}
                       keyboardType={this.props.keyboardType}
                       onChangeText={this.props.onChangeText}
                       autoCapitalize={this.props.autoCapitalize}
                       prefix={this.props.prefix}
                       secureTextEntry={this.props.password}
                       characterRestriction={this.props.characterRestriction}
                       clearButtonMode={this.props.clearButtonMode}
                       editable={this.props.editable}
                       autoCorrect={this.props.autoCorrect}
                       returnKeyType={this.props.returnKeyType}
                       value={this.props.value}
                       required={this.props.required}
                       maxLength={this.props.maxLength}
            >
                {this.props.children}
            </TextField>
        );
    }
}
