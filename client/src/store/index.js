import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import pokeReducer from '../reducer';

export const store = createStore(pokeReducer,composeWithDevTools(applyMiddleware(thunk)));