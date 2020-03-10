import React, { Component } from 'react'
import Alert from "../general/Alert"
// import '../../static/css/login.css'

export default class FormButton extends Component {
  render() {
    const { tabIndex, that, errorMessage, title, classes,
      isErrorAlert, isNotInput, isGeneralForm, } = this.props
    return (
        <div className="w-100 button-container">
          <button
            tabIndex={tabIndex}
            disabled={that.state.isLoading || isNotInput}
            className={`btn ${classes} ${(that.state.isLoading || isNotInput) &&
              "disabled" || ""}`}
            type="button"
            onClick={(e) => that.submit(e)}
          >
            {title}&nbsp;
            {
              that.state.isLoading &&
              (
              <img
                alt=""
                className="loading-image"
                src={`/static/img/bamanro-loading.gif`}
              />
            )}
            </button>
            {
              isErrorAlert && that.state.isAlert && that.props.isFormSuccess != null
              && (errorMessage || isGeneralForm)
              &&(
                <Alert
                  errorMessage={errorMessage}
                  isFormSuccess={(that.props.isFormSuccess != null && !errorMessage) || null}
                />
             )
           }
           </div>
    )
  }
}
