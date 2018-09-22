import PwaApp from '../containers/pwa.app.tsx';
import Deatil from '../views/detail';

export default [
    {
        url: '/',
        component: PwaApp,
        exact: true
    },
    {
        url: '/detail',
        component: Deatil,
        exact: true
    }
];