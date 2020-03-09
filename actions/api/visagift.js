import { mFetch, } from '../dynamicAction'
import { consoleLog, } from '../../utils/config'

export const setVisa = (token, firstname, lastname, phone, email) => {
  return (dispatch) => {
    return dispatch(mFetch('/gift/submit/', 'VISA', 'POST', {
      token,
      email,
      phone_number: phone,
      first_name: firstname,
      last_name: lastname,
      country_code: '98',
      gift_type: 1,
    }))
  }
}
