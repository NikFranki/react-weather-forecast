const store = window.mstore;

class StoreAssistance {

    dispatchAction = (action) => {
        store.dispatch(action);
    }
    
    getStateStore = () => {
        return store.getState();
    }
}

export default new StoreAssistance();