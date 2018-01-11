'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    PanResponder,
    Animated
} from 'react-native';
import {Color} from "src/utils/color";
import PropTypes from 'prop-types';

export var SlideDirection = {
    LEFT: "left",
    RIGHT: "right",
    BOTH: "both"
};

export class SlideButton extends Component {
    constructor(props) {
        super(props);
        this.buttonWidth = 0;
        this.state = {
            initialX: 0,
            locationX: 0,
            dx: 0,
            animatedX: new Animated.Value(0),
            animatedY: new Animated.Value(0),
            released: false,
            swiped: true,
        };
    }

    /* Button movement of > 40% is considered a successful slide by default*/
    isSlideSuccessful() {
        var slidePercent = this.props.successfulSlidePercent || 40;
        var successfulSlideWidth = this.buttonWidth * slidePercent / 100;
        if (!this.props.slideDirection) {
            return this.state.dx > successfulSlideWidth;  // Defaults to right slide
        } else if (this.props.slideDirection === SlideDirection.RIGHT) {
            return this.state.dx > successfulSlideWidth;
        } else if (this.props.slideDirection === SlideDirection.LEFT) {
            return this.state.dx < (-1 * successfulSlideWidth);
        } else if (this.props.slideDirection === SlideDirection.BOTH) {
            return Math.abs(this.state.dx) > successfulSlideWidth;
        }
    }

    onSlide(x) {
        if (this.props.onSlide) {
            this.props.onSlide(x);
        }
    }

    componentWillMount() {
        var self = this;

        // TODO: Raise error if slideDirection prop is invalid.

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
            },

            onPanResponderMove: (evt, gestureState) => {
                self.setState({
                    locationX: evt.nativeEvent.locationX,
                    dx: gestureState.dx
                });
                self.onSlide(gestureState.dx);
            },

            onPanResponderRelease: (evt, gestureState) => {
                if (this.isSlideSuccessful()) {
                    self.props.onSlideSuccess();
                    this.moveButtonOut(() => {
                        self.setState({swiped: true});
                    });
                }
                this.snapToPosition(() => {
                    self.setState({
                        released: false,
                        dx: self.state.initialX
                    });
                });
            },

            onPanResponderTerminate: (evt, gestureState) => {
                this.snapToPosition(() => {
                    self.setState({
                        released: false,
                        dx: self.state.initialX
                    });
                });
            },

            onShouldBlockNativeResponder: (evt, gestureState) => {
                return true;
            }
        });
    }

    onSlideSuccess() {
        if (this.props.onSlideSuccess !== undefined) {
            this.props.onSlideSuccess();
        }
    }

    moveButtonOut(onCompleteCallback) {
        var self = this;
        var startPos = this.state.initialX + this.state.dx;
        var endPos = this.state.dx < 0 ? -this.buttonWidth : this.buttonWidth * 2;

        this.setState({
            released: true,
            animatedX: new Animated.Value(startPos),
            animatedY: new Animated.Value(startPos * -1)
        }, () => {
            Animated.timing(
                self.state.animatedX,
                {toValue: endPos}
            ).start(onCompleteCallback);

            Animated.timing(
                this.state.animatedY,
                {toValue: endPos}
            ).start(onCompleteCallback);

        });
    }

    snapToPosition(onCompleteCallback) {
        var self = this;
        var startPos = this.state.initialX + this.state.dx;
        var endPos = this.state.initialX;
        this.setState({
            released: true,
            animatedX: new Animated.Value(startPos),
            animatedY: new Animated.Value(startPos * -1)
        }, () => {
            Animated.timing(
                this.state.animatedX,
                {toValue: endPos}
            ).start(onCompleteCallback);

            Animated.timing(
                this.state.animatedY,
                {toValue: endPos}
            ).start(onCompleteCallback);

        });
    }

    onLayout(event) {
        this.buttonWidth = event.nativeEvent.layout.width;
        this.setState({
            initialX: event.nativeEvent.layout.x
        });
    }

    render() {
        var style = [styles.button, this.props.style, {
            left: this.state.dx,
            right: this.state.dx * -1,
            backgroundColor: Color.TRANSPARENT,
        }];
        if (this.state.released) {

            style = [styles.button, this.props.style, {
                left: this.state.animatedX,
                right: this.state.animatedY,
                backgroundColor: Color.TRANSPARENT,
            }];
            var button = (
                <Animated.View style={style}>
                    {this.props.children}
                </Animated.View>
            );
        } else {
            var button = (
                <View style={style}>
                    <View onLayout={this.onLayout.bind(this)}>
                        {this.props.children}
                    </View>
                </View>
            );
        }

        return (
            <View style={{
                backgroundColor: Color.PRIMARY,
                borderColor: Color.PRIMARY,
                borderRadius: 30,
                borderWidth: 1,
                alignSelf: 'stretch',
                overflow: 'hidden',
                paddingHorizontal: 20,
            }}>
                <View style={styles.container}
                      {...this.panResponder.panHandlers}>
                    {button}
                </View>
            </View>
        );
    }
}

SlideButton.propTypes = {
    successfulSlidePercent: PropTypes.number,
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingHorizontal: 28,
        paddingBottom: 28,
        paddingTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute'
    }
})