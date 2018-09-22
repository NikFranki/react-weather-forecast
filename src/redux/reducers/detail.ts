import { DETAIL } from 'Src/constant/index';
import { StoreState, checkDetail } from 'Src/types/type';

const detail = (
    state: StoreState['detail'] = {},
    action: checkDetail): StoreState['detail'] => {
    switch (action.type) {
        case DETAIL:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

export default detail;