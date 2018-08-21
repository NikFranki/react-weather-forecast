import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import maindata from './home';
import detail from './detail';

const pwaReducers = combineReducers({
    maindata,
    detail
});

const store = createStore(pwaReducers, applyMiddleware(thunk));
window.mstore = store;

export default store;