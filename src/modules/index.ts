import { combineReducers } from 'redux';
import authentication from './authentication';
import material from './material';

const rootReducer = combineReducers({
  authentication,
  material,
});

export default rootReducer;

// 루트 리듀서 타입선언
export type RootStateType = ReturnType<typeof rootReducer>;
