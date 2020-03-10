import { consoleLog, } from "./config"
import Cookies from 'js-cookie'
import Router from 'next/router'

export const showAlert = (that) => {
  that.setState({ isAlert: true })
}

export const checkValue = (val, msg, that) => {
  if (!val || val == "") {
    that.setState({ errorMessage: msg })
    return false
  }
  return true
}

// export const checkFormat = (val, msg, format, that) => {
//   if (!format.test(val.toLowerCase())) {
//     that.setState({ errorMessage: msg })
//     return false
//   }
//   return true
// }
//
// export const checkFormats = (val, msg, format1, format2, that,) => {
//   if (!format1.test(val.toLowerCase()) && !format2.test(val.toLowerCase())) {
//     that.setState({ errorMessage: msg })
//     return false
//   }
//   return true
// }

// export const checkConfirmPassword = (password, confirmPassword, msg, that, ) => {
//   if (password != confirmPassword) {
//     that.setState({ errorMessage: msg })
//     return false
//   }
//   return true
// }
//
// export const changePasswordType = (e, password) => {
//   if (e.target.src.indexOf('open') != -1) {
//     e.target.src = '/static/img/hide.svg'
//     password.type = 'text'
//   } else {
//     e.target.src = '/static/img/eye.svg'
//     password.type = 'password'
//   }
// }

export async function submit(args, func, that,) {
  console.log('submit::', args, func, that);
  await func(...args)

  // if (that.props.isFormSuccess && that.props.errorMessage == null) {
      showAlert(that)
      if (that._isMounted) {
        that.setState({ errorMessage: that.props.errorMessage })
      }
    // }
  // }

  if (that._isMounted) {
    that.setState({ isLoading: false })
  }
}

export async function submitForm(e, that, args, func, ) {
  e.preventDefault()
  e.stopPropagation()
  that.setState({ isLoading: true, errorMessage: null, })
  if (that.getFormChecked()) {
      await submit(args, func, that,)
      if (that.props.isLoginSuccess) {
        Cookies.set('token', 'test')
        Router.push('/fames/1')
      }
    } else {
      if (that._isMounted) {
        that.setState({ isLoading: false })
      }
    }
}
