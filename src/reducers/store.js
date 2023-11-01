// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const preloadedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};
  console.log('Preloaded State:', preloadedState);

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});
console.log('Preloaded State:', JSON.stringify(store.getState()));

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
