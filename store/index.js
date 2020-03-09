import fetch from 'isomorphic-fetch'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { apiMiddleware } from 'redux-api-middleware'
import reducer from './reducer'

const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore)

export const initStore = (initialState = {}) => {
    return createStore(
      reducer,
      initialState,
      applyMiddleware(apiMiddleware, thunkMiddleware)
    )
  }
