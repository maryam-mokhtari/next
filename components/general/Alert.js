import React, { Component } from "react"
import { consoleLog, } from '../../utils/config'

export default class Alert extends Component {
  state = { isShown: true }

  componentDidMount() {
    const that = this
    setTimeout(function() {
      if (that.refs.alert && that.refs.alert.classList) {
        that.setState({ isShown: false })
        that.refs.alert.classList.remove('show')
        that.refs.alert.classList.add('fade')
      }
    }, 10000)
  }
  close() {
    this.setState({ isShown: false })
    this.refs.alert.classList.remove('show')
    this.refs.alert.classList.add('fade')
  }
  componentDidUpdate() {
    if (this.state.isShown) {
      this.refs.alert.classList.add('show')
      this.refs.alert.classList.remove('fade')
    }
  }
  render() {
    const { isFormSuccess, errorMessage,} = this.props
    consoleLog("Alert props", this.props)
    return (
      <div
        ref="alert"
        id="notification-alert"
        className={`alert alert-warning alert-dismissible
        ${isFormSuccess? 'success-alert' : 'error-alert'}
        `}
        role="alert"
      >
        <img
          src={
            isFormSuccess ? `/static/img/bamanro-success.svg` : `/static/img/bamanro-error.svg`
          }
          className="alert-img"
          alt=""
        />
        <div>
          {isFormSuccess
            ? "درخواست شما با موفقیت ثبت شد."
            : `خطا: ${errorMessage || 'با عرض پوزش خطایی رخ داده است'}.`
          }
        </div>
        <button
          type="button"
          className="close"
          onClick={()=>this.close()}
        >
            &times;
        </button>
      </div>
    )
  }
}
