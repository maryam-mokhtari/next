import Cookies from 'js-cookie'
import { mFetch, } from '../dynamicAction'
import { consoleLog, } from '../../utils/config'

export const getFames = (pageNumber) => {
  return (dispatch) => {
    return dispatch(mFetch(`/fames?page=${pageNumber}`, 'FAMES'))
  }
}

export const getFame = (fameId) => {
  return (dispatch) => {
    return dispatch(mFetch(`/fames/:${fameId}`, 'FAME'))
  }
}
