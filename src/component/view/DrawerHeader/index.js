import React from "react";
import {
    View,
    FlatList,
    Image,
    TouchableHighlight,
} from "react-native";
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import styles from "./styles";
import {Color} from "src/utils/color";
import Ripple from 'src/component/ui/Ripple';
import Label from "../../ui/Label/index";
import {connect} from 'react-redux';
import {
    setUser,
    setDrawerSelected,
} from "src/redux/auth/action";

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerList: [
                {
                    title: "Home",
                    icon: 'home',
                    route: "Home"
                }, {
                    title: "Notifications",
                    icon: 'notifications',
                    route: "Notification",
                }, {
                    title: "Friends",
                    icon: 'group',
                    route: "Friends"
                }, {
                    title: "Settings",
                    icon: 'settings',
                    route: "Settings"
                },
            ],
        };
    }

    componentWillMount() {
        this.props.setDrawerSelected(0);
    }


    _renderProfile = () => {
        return (
            <TouchableHighlight style={styles.drawerHeader_container} underlayColor='transparent'
                                onPress={this.onProfileTapped}>
                <View>
                    <View style={styles.drawerHeader_imageContainer}>
                        <Image source={this.props.user.profile_pic}
                               style={styles.drawerHeader_image}/>
                    </View>
                    <View style={styles.drawerHeader_text_content}>
                        {this.props.user.name !== null &&
                        <Label sigleLine roboto_medium color={Color.TEXT_PRIMARY}>
                            {this.props.user.name}
                        </Label>
                        }
                        <Label small color={Color.TEXT_SECONDARY}>
                            {this.props.user.email}
                        </Label>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    onProfileTapped = () => {
       this.drawerItemClick(this.state.drawerList[3], 3)
    };

    _renderBorder = () => {
        return (
            <View style={styles.drawerHeader_borderLine}/>
        );
    };

    _renderIcon = (item, index) => {
        return (
            <Icon name={item.icon}
                  style={{marginRight: 17}}
                  size={25}
                  color={this.props.drawerIndex === index ? Color.PRIMARY : Color.TEXT_SECONDARY}
            />
        );
    };

    _renderItem = (item, index) => {
        return (
            <Ripple
                onPress={this.drawerItemClick.bind(this, item, index)}>
                <View style={styles.drawerHeader_item_container}>
                    <Icon name={item.icon}
                          style={{marginRight: 17}}
                          size={25}
                          color={this.props.drawerIndex === index ? Color.PRIMARY : Color.TEXT_SECONDARY}
                    />
                    <Label roboto_medium small
                           color={this.props.drawerIndex === index ? Color.PRIMARY : Color.TEXT_SECONDARY}>
                        {item.title}
                    </Label>
                </View>
            </Ripple>
        );
    };

    render() {
        return (
            <View style={{flex: 1, paddingBottom: 20}}>
                {
                    this.props.user && this._renderProfile()
                }
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.drawerList}
                    renderItem={({item, index}) => this._renderItem(item, index)}
                    keyExtractor={item => item.title}
                    extraData={this.props}/>
            </View>
        );
    }

    drawerItemClick = (item, index) => {
        if (index !== this.props.drawerIndex) {
            console.log("Route : ", item.route);
            this.props.setDrawerSelected(index);
            this.props.navigation.navigate('DrawerClose');
            this.props.navigation.navigate(item.route);
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDrawerSelected: (drawerIndex) => dispatch(setDrawerSelected(drawerIndex)),
    }
};

const mapStateToProps = (state) => {
    if (state === undefined) {
        return {};
    }
    return {
        user: state.user,
        drawerIndex: state.drawerIndex,
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);