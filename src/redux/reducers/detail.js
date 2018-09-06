import { DETAIL } from 'Src/constant';

const detail = (state = {}, action) => {
    switch (action.type) {
        case DETAIL:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

export default detail;