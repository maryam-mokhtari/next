import ActionTypes from '../actions/ActionTypes'
import Cookies from 'js-cookie'
import { getErrorMessage } from '../utils/error'
import { consoleLog, } from '../utils/config'
import { ln, } from '../utils/language'

const reducer = (state = { }, action) => {
  consoleLog('ActionType>', action.type)
  let newState = {...state, isFormSuccess: null, errorMessage: null, }
  let errorMessage = "An error has occurred."
  errorMessage = getErrorMessage(action.payload, errorMessage)
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
    case ActionTypes.LOGOUT_REQUEST:
      return { ...newState,
        isFormLoading: true, isFormSuccess: null,
        messageType: null, messageText: null,
        errorMessage: null, isAlertHidden: false,
      }


      case ActionTypes.LOGOUT_SUCCESS:
        Cookies.remove('token')
        return { ...newState,
          isLoginSuccess: false,
          errorMessage,
          isLogout: true,
          isFormSuccess: true,
          isFormLoading: false,
        }
    case ActionTypes.LOGIN_SUCCESS:
    console.log('LOGIN_SUCCESS::',action);
      newState = {...newState, isAlertHidden: true,}

    case ActionTypes.LOGOUT_FAILURE:
    case ActionTypes.LOGIN_FAILURE:
      return { ...newState,
        isFormSuccess: false, errorMessage, isFormLoading: false,
        messageType: 'error', messageText: errorMessage,
      }

    case 'MESSAGE_CLEAR':
      return { ...state, messageText: '', }

    default:
      return state
  }
}

export default reducer
