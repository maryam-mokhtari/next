import fetch from 'isomorphic-fetch'
import Cookies from 'js-cookie'
// import fetch from 'node-fetch'
import { RSAA } from 'redux-api-middleware'
import ActionTypes from './ActionTypes'
import { apiBaseUrl, consoleLog, } from '../utils/config'

export const mFetch = (endpoint, actionType, method, isAuth = true, body, metaRequest, metaSuccess,
    headers = {}) => {
  consoleLog('mFetch:', apiBaseUrl, endpoint, actionType, method, body, metaRequest, metaSuccess,
   headers)
  endpoint = apiBaseUrl + endpoint

  if (!method) {
    method = 'GET'
  }
  headers['Content-Type'] = 'application/json'
  headers['Accept'] = 'application/json'
  isAuth && (headers['Authorization'] = 'Bearer ' + Cookies.get('token'))
  consoleLog('headers is : ', headers)
  let request = {
    type: ActionTypes[actionType + '_REQUEST']
  }
  let success = {
    type: ActionTypes[actionType + '_SUCCESS'],
    payload: (action, state, response) => {
      consoleLog('success', actionType)
      const result = response.json()
      return result.data? result.data : result
    },
  }
  let failure = {
    type: ActionTypes[actionType + '_FAILURE'],
    payload: (action, state, response) => {
      return response.json()
    },
  }
  if (metaRequest) {
    request.meta = metaRequest
  }
  if (metaSuccess) {
    success.meta = metaSuccess
  }
  let callAPI = {
    endpoint,
    method,
    // credentials: 'include',
    types: [
      request,
      success,
      failure
    ],
  }
  callAPI.headers = headers
  if (body) {
    callAPI.body = JSON.stringify(body)
  }
  consoleLog('RSAA', callAPI)
  return {
    [RSAA]: callAPI
  }
}

export const loadInfo = (endpoint, actionType, pageNumber, pageSize, sortColumn, isDescending, searchParams, ) => {
  return async (dispatch) => {
    return dispatch(mFetch(endpoint, actionType))
  }
}
