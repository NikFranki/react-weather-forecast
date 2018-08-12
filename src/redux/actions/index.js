import { CREATEMAINDATA } from '../../constant';

export const create_main_data = (data) => {
    return {
        type: CREATEMAINDATA,
        payload: data
    }
}