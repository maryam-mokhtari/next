import React, { Component } from "react"
import Link from 'next/link'
import Cookies from 'js-cookie'
import { consoleLog, } from '../../utils/config'
import FormButton from "../general/FormButton"
import { initialState, checkValue, checkFormat, checkFormats, submit,
  submitForm, checkConfirmPassword, changePasswordType, } from '../../utils/form'

export default class LoginByEmail extends Component {
  _isMounted = false
  constructor(props) {
    super(props)
    this.state = initialState
  }
  componentDidMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
  }

  getFormChecked() {
    const regexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const regexMobile = /^(09)(\d{9})$/i;
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/i
    const result =
      checkValue(this.refs.email.value, "ایمیل یا تلفن همراه را وارد نمایید.", this,)
      &&
      checkValue(this.refs.password.value, "رمز عبور را وارد نمایید.", this,)
      &&
      checkFormats(
        this.refs.email.value,
        "قالب ایمیل یا تلفن همراه درست نیست.",
        regexMobile,
        regexEmail,
        this,
      )
    return result
  }

  async submit(e) {
    let args = [
      this.refs.email.value,
      this.refs.password.value,
    ]
    await submitForm(e, this, args, this.props.login, 'success', this.props.isErrorAlert)

  }
  render() {
    consoleLog('LoginByEmail props:', this.props)
    const { isFormSuccess, isFormLoading, errorMessage, isErrorAlert, loginType, boxType,} = this.props
    const buttonProps = { that: this, errorMessage, title: "ورود",
      isErrorAlert, tabIndex: 3,
      classes: `w-100 btn login-button no-hide login-${loginType}-button`}
    return (
      <div className={` no-hide email-tab login-${loginType}-form n d-${boxType == 'mobile'? 'none' : 'block'}`}>
        <fieldset className="form-group">
          <img alt="ورود" src="/static/img/bamanro-avatar.svg" className={`placeholder-icon login-${loginType}-img`} />
          <input ref="email" className="form-control eng-field login-input no-hide"
            tabIndex="1"
            required
           />
          <label className={`login-label login-${loginType}-label`} id="login-email-label"
            onClick={() => this.refs.email.focus()}
          >
            ایمیل یا شماره تلفن
          </label>
        </fieldset>
        <fieldset className="form-group mb-0 no-hide ">
          <img alt="" src="/static/img/bamanro-padlock.svg" className={` no-hide placeholder-icon login-${loginType}-img`} />
          <img alt="" ref="eye" src="/static/img/bamanro-open-eye.svg"
            onClick={(e) => changePasswordType(e, this.refs.password)}
            className={` no-hide eye login-${loginType}-img`} />
          <input ref="password" type="password"
            className="form-control eng-field login-input password-login no-hide"
            tabIndex="2"
            required
             />
          <label className={` no-hide login-label login-${loginType}-label`} id="login-password-label"
            onClick={() => this.refs.password.focus()}>
            رمز عبور
          </label>
          <div className=" no-hide form-error">{this.state.errorMessage}</div>
        </fieldset>
        <FormButton {...buttonProps} />
        <div className="row login-bottom-item">
          <div className="col text-center">
            <Link href="/forgetpassword">
              <a>
              فراموشی رمز عبور
              </a>
            </Link>
          </div>
        </div>
        {!isErrorAlert &&
          <Link href="/signup">
            <button className="w-100 btn register-button" type="button"
            onClick={() => {
            }}>
              ثبت‌نام
            </button>
          </Link>
        }
      </div>
    )
  }
}
