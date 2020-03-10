import React, { Component } from "react"
import { consoleLog, } from '../../utils/config'

export default class LoginHeader extends Component {
  render() {
    consoleLog("LoginHeader Props:", this.props)
    const { title } = this.props
    return (
      <div className="login-header">
        <div className="login-header-txt">{title}</div>
        <div className="login-header-border">
          <hr className="login-border-head"/>
        </div>
      </div>
    )
  }
}
