import React from 'react';
import {
    View,
    FlatList, Image
} from 'react-native';
import styles from './styles';
import {circleStyle} from "src/utils/theme";
import {DateFormat} from "src/utils/dateFormat";
import userPlaceholder from 'src/assets/user_placeholder.png';
import {Color} from "src/utils/color";
import {strDateToLocal} from "src/utils/index";
import Label from "src/component/ui/Label/index";
import moment from "moment";


export default class Notification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: [
                {
                    id: 0,
                    profile_pic: userPlaceholder,
                    name: "Lorem ipsum",
                    schedule_date: 1515505928,
                },
                {
                    id: 1,
                    profile_pic: userPlaceholder,
                    name: "Lorem ipsum",
                    schedule_date: 1515505928,
                },
                {
                    id: 2,
                    profile_pic: userPlaceholder,
                    schedule_date: 1515505928,
                },
                {
                    id: 3,
                    profile_pic: userPlaceholder,
                    name: "Lorem ipsum",
                    schedule_date: 1515505928,
                },
                {
                    id: 4,
                    profile_pic: userPlaceholder,
                    name: "dolor sit",
                    schedule_date: 1515505928,
                },
                {
                    id: 5,
                    profile_pic: userPlaceholder,
                    name: "Lorem ipsum dolor",
                    schedule_date: 1515505928,
                }
            ]
        }
    }

    _renderSeparator = () => {
        return (
            <View style={styles.notification_Separator}/>
        );
    };

    renderListItem = (index, item) => {
        return (
            <View style={styles.notification_listContainer}>
                <View style={circleStyle}>
                    <Image style={[circleStyle, {backgroundColor: null, borderWidth: 0.5, borderColor: Color.BLACK}]}
                           source={item.profile_pic}/>
                </View>

                <View style={{justifyContent: 'space-around', flex: 1, alignSelf: 'stretch', paddingLeft: 10}}>
                    {
                        item.name ?
                            <Label roboto_medium
                                   mb={5}
                                   color={Color.TEXT_PRIMARY}
                                   sigleLine>
                                {item.name}
                            </Label>
                            : null
                    }
                    <Label small color={Color.TEXT_SECONDARY}>
                        New friend request
                    </Label>
                    <Label small color={Color.TEXT_SECONDARY} mt={2.5}>
                        {moment.unix(item.schedule_date).format(DateFormat.dd_MM_yyyy_hh_mm_a)}
                    </Label>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.notification_Container}>
                <FlatList
                    data={this.state.notifications}
                    renderItem={
                        ({index, item}) => this.renderListItem(index, item)
                    }
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListFooterComponent={this._renderSeparator}
                />
            </View>
        );
    }
}