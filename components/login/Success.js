import React, { Component } from "react"
import { consoleLog, } from '../../utils/config'

export default class Success extends Component {
  render() {
    const title = 'ثبت‌نام'
    consoleLog("Success Props:", this.props)
    return (
        <div className="success-right">
          <div className="success-img">
            <img
              className="success-img-left"
              src={`/static/img/bamanro-checkmark.svg`}
              alt=""
            />
          </div>
          <div className="success-txt">
          {title} با موفقیت انجام شد.</div>
          <div className="success-button">
            <a href={`/dashboard/profile`} role="button"
              className="success-login-button">ورود به سامانه
            </a>
          </div>
        </div>
    )
  }
}
