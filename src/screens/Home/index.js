import React from 'react';
import {
    View
} from 'react-native';
import styles from './styles';
import {Color} from "../../utils/color";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
    setDrawerSelected,
} from "src/redux/auth/action";
import {connect} from 'react-redux';


class Home extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            headerRight:
                <View>
                    <Icon style={{padding: 10}}
                          name='notifications'
                          size={30}
                          color={Color.WHITE}
                          onPress={params.onNotificationTapped}
                    />
                </View>
        };
    };

    _onNotificationTapped = () => {
        this.props.setDrawerSelected(1);
        this.props.navigation.navigate('Notification');
    };

    componentWillMount() {
        this.props.navigation.setParams({
            onNotificationTapped: this._onNotificationTapped,
        });
    }

    render() {
        return(
            <View style={styles.home_Container}></View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDrawerSelected: (drawerIndex) => dispatch(setDrawerSelected(drawerIndex)),
    }
};

const mapStateToProps = (state) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);