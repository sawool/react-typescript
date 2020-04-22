import { combineReducers } from 'redux';
import authentication from './authentication';

const rootReducer = combineReducers({
  authentication,
});

export default rootReducer;

// 루트 리듀서 타입선언
export type RootStateType = ReturnType<typeof rootReducer>;
