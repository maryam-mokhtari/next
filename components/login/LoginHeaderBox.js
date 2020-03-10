import React, { Component } from "react"
import HeaderProfile from '../login/HeaderProfile'
import { consoleLog, } from "../../utils/config"

export default class LoginHeaderBox extends Component {
  render() {
    consoleLog("LoginHeaderBox Props:", this.props)
    const { isErrorAlert, headerProps, profile, } = this.props
    const loginType = isErrorAlert? 'main': 'header'
    const loginProps = {...headerProps, loginType}
    return (
        <div>
          { !isErrorAlert && headerProps.isBox &&
            (profile && profile.data &&
              <HeaderProfile {...loginProps} />
            )
          }
        </div>
    )
  }
}
