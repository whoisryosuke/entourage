import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
// eslint-disable-next-line import/no-cycle
import counterReducer from './features/counter/counterSlice';
import currentReducer from './reducers/currentSlice';
import projectReducer from './reducers/projectsSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    current: currentReducer,
    projects: projectReducer,
  });
}
