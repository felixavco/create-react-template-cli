const rootReducerTemplate = () => {
    return `import { combineReducers } from 'redux';
import errorReducer from './errorsReducer';

export default combineReducers({
    errors: errorReducer
});`
}

export default rootReducerTemplate;