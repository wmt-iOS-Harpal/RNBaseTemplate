import {
    SET_USER,
    SET_DRAWER_SELECTED,
} from "src/redux/action-types";
import {REHYDRATE} from 'redux-persist/constants';

let initialState = {
    user: null,
    drawerIndex: 0,
};

export const setUser = (user) => ({type: SET_USER, user});
export const setDrawerSelected = (drawerIndex) => ({type: SET_DRAWER_SELECTED, drawerIndex});
export const logout = () => ({type: REHYDRATE, payload: initialState});
