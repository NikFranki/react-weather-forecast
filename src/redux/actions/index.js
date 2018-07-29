import { HELLO } from '../../constant';

export const Say_Hello = () => {
    return {
        type: HELLO,
        payload: {aa: 'hello world!', bb: 'aa'}
    }
}