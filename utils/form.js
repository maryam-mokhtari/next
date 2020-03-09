import { consoleLog, } from "./config"
import Cookies from 'js-cookie'

export const getTitle = (type) => {
  switch (type) {
    case 'login':
      return 'ورود/ثبت‌نام'
    case 'signup':
      return 'ثبت‌نام'
    case 'forgetpassword':
      return 'دریافت رمز عبور'
    default:
      return ''
  }
}

export const clearForm = (that, items) => {
  items.map(item => {
    if (that.refs[item]) {
      that.refs[item].value = ''
    }
  })
  that.setState({ errorMessage: null, isLoading: false })
}

export const initialState = {
  isLoading: false,
  isAlert: false,
  isDesktop: false,
  errorMessage: null,
}

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

export const checkFormat = (val, msg, format, that) => {
  if (!format.test(val.toLowerCase())) {
    that.setState({ errorMessage: msg })
    return false
  }
  return true
}

export const checkFormats = (val, msg, format1, format2, that,) => {
  if (!format1.test(val.toLowerCase()) && !format2.test(val.toLowerCase())) {
    that.setState({ errorMessage: msg })
    return false
  }
  return true
}

export const checkConfirmPassword = (password, confirmPassword, msg, that, ) => {
  if (password != confirmPassword) {
    that.setState({ errorMessage: msg })
    return false
  }
  return true
}

export const changePasswordType = (e, password) => {
  if (e.target.src.indexOf('open') != -1) {
    e.target.src = '/static/img/hide.svg'
    password.type = 'text'
  } else {
    e.target.src = '/static/img/eye.svg'
    password.type = 'password'
  }
}

export async function submit(args, func, that, step, isErrorAlert) {
  await func(...args)

  if (that.props.isFormSuccess && that.props.errorMessage == null) {
    if (step == 'alert') {
      showAlert(that)
    } else {
      that.props.setStep(step)
    }
  } else {
    if (isErrorAlert) {
      showAlert(that)
    } else {
      if (that._isMounted) {
        that.setState({ errorMessage: that.props.errorMessage })
      }
    }
  }

  if (that._isMounted) {
    that.setState({ isLoading: false })
  }
}

export async function submitForm(e, that, args, func, step, isErrorAlert,) {
  e.preventDefault()
  e.stopPropagation()
  that.setState({ isLoading: true, errorMessage: null, })
  if (that.getFormChecked()) {
      // await grecaptcha.ready(function() {
      //   grecaptcha
      //     .execute("6LdnNqgUAAAAANNngHoH6g1eH24MllxYog_yKZwt", {
      //       action: "form"
      //     })
      //     .then(function(token) {
              args = ['token', ...args]
             await submit(args, func, that, step, isErrorAlert,)
      //     })
      // })

      if (that.props.isLoginSuccess) {
        that.props.getProfileDetail()
      }
    } else {
      if (that._isMounted) {
        that.setState({ isLoading: false })
      }
    }
}
