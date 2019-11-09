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
        applyMiddleware(...middleware),
        //* Remove the commented code below to enable Redux dev tools
        // process.env.NODE_ENV === 'production' ?
        //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() :
        //     null
    )
);
        
export default store;
`
}

export default storeTemplate;

