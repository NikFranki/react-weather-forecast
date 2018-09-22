import { CREATEMAINDATA } from 'Src/constant/index';
import { StoreState, createMainData } from 'Src/types/type';

const maindata = (
    state: StoreState['maindat'] = [], 
    action: createMainData): StoreState['maindat'] => {
    switch (action.type) {
        case CREATEMAINDATA:
            return action.payload;
        default:
            return state;
    }
};

export default maindata;
