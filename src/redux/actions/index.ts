import { CREATEMAINDATA, DETAIL } from 'Src/constant/index';
import { createPayloadedAction } from 'Src/types/creator';
import { createMainData, checkDetail } from 'Src/types/type';

export const create_main_data = createPayloadedAction<createMainData>(CREATEMAINDATA);

export const check_detail = createPayloadedAction<checkDetail>(DETAIL);