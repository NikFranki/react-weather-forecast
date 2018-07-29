import { combineReducers } from 'redux';
import { HELLO } from '../../constant';

const initState = {
    aa: 'ss'
};

const pwa = (state = initState, action) => {
    switch(action.type) {
        case HELLO:
            return Object.assign({}, ...state, action.payload);
        default:
            return state;
    }
}

const pwaReducer = combineReducers({
    pwa
});

export default pwaReducer;