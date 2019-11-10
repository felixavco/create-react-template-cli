const storeTemplate = () => {
    return `import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const middleware = [thunk];

const initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware)    
    )
);
        
export default store;
`
}

export default storeTemplate;

