import {
    SET_USER,
    SET_DRAWER_SELECTED,
} from "src/redux/action-types";
import {REHYDRATE} from 'redux-persist/constants';

let initialState = {
    user: null,
    drawerIndex: 0,
};

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return Object.assign({}, state, {user: action.user});
            break;
        case REHYDRATE:
            return {...state, ...action.payload};
            break;
        case SET_DRAWER_SELECTED:
            return Object.assign({}, state, {drawerIndex: action.drawerIndex});
            break;
        default:
            return initialState;
            break;
    }
};