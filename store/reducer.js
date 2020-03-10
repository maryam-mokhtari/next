import ActionTypes from '../actions/ActionTypes'
import Cookies from 'js-cookie'
import { getErrorMessage } from '../utils/error'
import { consoleLog, } from '../utils/config'
import { setCookie, } from '../utils/cookie'
import { ln, } from '../utils/language'

const reducer = (state = { }, action) => {
  consoleLog('ActionType>', action.type)
  let newState = {...state, isFormSuccess: null, errorMessage: null, }
  let errorMessage = "خطایی رخ داده است"
  errorMessage = getErrorMessage(action.payload, errorMessage)
  switch (action.type) {
    case ActionTypes.VISA_REQUEST:
    case ActionTypes.LOGIN_REQUEST:
    case ActionTypes.LOGOUT_REQUEST:
      return { ...newState,
        isFormLoading: true, isFormSuccess: null,
        messageType: null, messageText: null,
        errorMessage: null, isAlertHidden: false,
        counter: null,
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
      newState = {...newState, isAlertHidden: true,}
    case ActionTypes.VISA_SUCCESS:
      return { ...newState,
        errorMessage,
        isFormSuccess: true,
        isFormLoading: false,
        messageType: (action.payload.status_code === 200? 'success' : 'error'),
        messageText: (action.payload.status_code === 200? ln('submittedSuccess'): errorMessage),
      }

    case ActionTypes.LOGOUT_FAILURE:
    case ActionTypes.LOGIN_FAILURE:
    case ActionTypes.VISA_FAILURE:
      return { ...newState,
        isFormSuccess: false, errorMessage, isFormLoading: false,
        messageType: 'error', messageText: errorMessage,
      }
    case ActionTypes.COUNTDOWN:
      return { ...newState, seconds: action.seconds - 1, }

    case 'MESSAGE_CLEAR':
      return { ...state, messageText: '', }

    default:
      return state
  }
}

export default reducer
