import React, { Component } from "react"
import Link from 'next/link'
import Router from 'next/router'
import Cookies from 'js-cookie'
import { consoleLog, server, } from '../../utils/config'
import FormButton from "./FormButton"
import { checkValue, submitForm, } from '../../utils/form'

export default class LoginByEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isAlert: false,
      isDesktop: false,
      errorMessage: null,
      isLoginSuccess: null,
    }
  }

  getFormChecked() {
    const result =
      checkValue(this.refs.email.value, "Please enter your username.", this,)
      &&
      checkValue(this.refs.password.value, "Please enter your password.", this,)
    return result
  }

  async submit(e) {
    // let args = [
    //   this.refs.email.value,
    //   this.refs.password.value,
    // ]
    // let idToken
    this.getFormChecked() &&
    fetch(`${server}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // "X-ID-TOKEN": idToken,
      },
      body: JSON.stringify({
        username: this.refs.email.value,
        password: this.refs.password.value,
      })
    }).then(res => {
      Cookies.set('token', res.headers.get('Authorization'))
      return res.json()
    })
    .then(res => {
      console.log('res::', res)
      if (res.data.success) {
        Router.push('/fames/1')
        this.setState({isLoginSuccess: true})
      } else {
        this.setState({isLoginSuccess: false, errorMessage: 'Login Failed.'})
      }
    })

  }
  render() {
    consoleLog('LoginByEmail props:', this.props)
    const { isFormSuccess, isFormLoading, errorMessage, isErrorAlert, loginType, boxType,} = this.props
    const buttonProps = { that: this, errorMessage, title: "Login",
      isErrorAlert, tabIndex: 3,
      classes: `w-100 btn login-button no-hide login-${loginType}-button`}
    return (
      <div className={` no-hide email-tab login-${loginType}-form n d-${boxType == 'mobile'? 'none' : 'block'}`}>
        <fieldset className="form-group">
          <img alt="" src="/static/img/bamanro-avatar.svg" className={`placeholder-icon login-${loginType}-img`} />
          <input ref="email" className="form-control eng-field login-input no-hide"
            tabIndex="1"
            defaultValue='test'
            required
           />
          <label className={`login-label login-${loginType}-label`} id="login-email-label"
            onClick={() => this.refs.email.focus()}
          >
            Username
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
            defaultValue='test'
             />
          <label className={` no-hide login-label login-${loginType}-label`} id="login-password-label"
            onClick={() => this.refs.password.focus()}>
            Password
          </label>
          <div className=" no-hide form-error">{this.state.errorMessage}</div>
        </fieldset>
        <FormButton {...buttonProps} />

      </div>
    )
  }
}
