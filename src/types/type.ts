import { PayloadedAction } from './action';

export interface StoreState {
    maindat: any;
    detail: any;
}

export interface createMainData extends PayloadedAction<'createmaindata', any> {
    type: 'createmaindata';
    payload: any;
}

export interface checkDetail extends PayloadedAction<'detail', any> {
    type: 'detail';
    payload: any;
}

export type EnthusiasmAction = createMainData | checkDetail;