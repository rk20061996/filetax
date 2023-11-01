// userActions.js

// Action type constants
export const SET_USER = 'SET_USER';

// Action creator functions
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
