import { RootStateType } from '../modules';
export const loadState = (): RootStateType | undefined => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: RootStateType) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

export const removeState = () => {
  try {
    localStorage.removeItem('state');
  } catch (err) {
    // Ignore write errors
  }
};
