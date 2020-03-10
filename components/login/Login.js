import React, { Component } from "react"
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginByEmail from './LoginByEmail'
import LoginByPhoneTab from './LoginByPhoneTab'
import { consoleLog, } from '../../utils/config'

export default class Login extends Component {
  render() {
    consoleLog('Login props:', this.props)
    const { isErrorAlert, type, boxType, loginType, } = this.props
    return (
      <div className={`${isErrorAlert? '': 'no-hide  login-box'}`}>
        <div className={`login-${loginType}-container no-hide `}>
          {!isErrorAlert && <div className="login-top-arrow no-hide"></div>}
          <LoginByPhoneTab {...this.props} />
        </div>
      </div>
    )
  }
}
