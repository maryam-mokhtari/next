import React, { Component } from "react"
import Link from 'next/link'
import Router from 'next/router'
import Cookies from 'js-cookie'
import { consoleLog, server, } from '../../utils/config'
import { checkValue, } from '../../utils/form'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      errorMessage: null,
      isLoginSuccess: null,
    }
  }

  getFormChecked() {
    const result =
      checkValue(this.refs.username.value, "Please enter your username.", this,)
      &&
      checkValue(this.refs.password.value, "Please enter your password.", this,)
    return result
  }

  async submit(e) {
    this.getFormChecked() &&
    fetch(`${server}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: this.refs.username.value,
        password: this.refs.password.value,
      })
    }).then(res => {
      Cookies.set('token', res.headers.get('Authorization'))
      return res.json()
    })
    .then(res => {
      if (res.data.success) {
        Router.push('/fames/1')
        this.setState({isLoginSuccess: true})
      } else {
        this.setState({isLoginSuccess: false, errorMessage: 'Login Failed.'})
      }
    })

  }
  render() {
    consoleLog('Login props:', this.props)
    const { isFormSuccess, isFormLoading, errorMessage, isErrorAlert, loginType, boxType,} = this.props
    return (
      <div className="login-box">
        <fieldset className="form-group">
         <label className="login-label" id="login-username-label" htmlFor="username"
           onClick={() => this.refs.username.focus()}
         >
           Username
         </label>
          <input ref="username" id="username" className="form-control login-input"
            tabIndex="1"
            defaultValue='test'
            required
           />
        </fieldset>
        <fieldset className="form-group">
         <label className="login-label" id="login-password-label" htmlFor="password"
           onClick={() => this.refs.password.focus()}>
           Password
         </label>
          <input ref="password" id="password" type="password"
            className="form-control login-input"
            tabIndex="2"
            defaultValue='test'
            required
             />
          <div className="form-error">{this.state.errorMessage}</div>
        </fieldset>
        <button
          tabIndex="3"
          disabled={this.state.isLoading}
          className={`btn btn-primary
            ${this.state.isLoading && "disabled" || ""}`}
          type="button"
          onClick={(e) => this.submit(e)}
        >
          Login
          {
            this.state.isLoading &&
            <img
              alt=""
              className="loading-image"
              src={`/static/img/loading.gif`}
            />
          }
        </button>
        <a className="forget-password">Forget Password?</a>
      </div>
    )
  }
}
