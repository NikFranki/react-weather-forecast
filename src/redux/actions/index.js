import { CREATEMAINDATA } from '../../constant';
import { DETAIL } from '../../constant';

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