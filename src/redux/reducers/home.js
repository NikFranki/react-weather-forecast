import { CREATEMAINDATA } from 'Src/constant';

const maindata = (state = [], action) => {
    switch (action.type) {
        case CREATEMAINDATA:
            return action.payload;
        default:
            return state;
    }
};

export default maindata;
