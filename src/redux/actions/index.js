import { CREATEMAINDATA } from 'Src/constant';
import { DETAIL } from 'Src/constant';

export const create_main_data = (data) => {
    return {
        type: CREATEMAINDATA,
        payload: data
    }
}

export const check_detail = (payload) => {
    return {
        type: DETAIL,
        payload
    }
}