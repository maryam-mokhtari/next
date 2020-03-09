import React, { Component } from "react"
import Alert from "./Alert"
import { getFaDigit, getEnDigit, } from "../../utils/digit"
// import { persianDigit, } from "../../utils/onlineform"
import { consoleLog, } from "../../utils/config"

export default class GeneralForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: null,
      isLoading: false,
      isAlert: false,
      isDesktop: false,
      isFormSuccess: null
    }
  }
  componentDidMount() {
    // typeof(window) != 'undefined' && window.innerWidth > 778 &&
    // this.setState({isDesktop: true})
    // this.persianDigit()
  }
  // persianDigit() {
  //   document.getElementById("mobile").addEventListener('keydown', persianDigit)
  // }

  showAlert() {
    this.setState({ isAlert: true })
  }
  clearForm() {
    this.refs.firstname.value = ""
    this.refs.lastname.value = ""
    this.refs.email.value = ""
    this.refs.mobile.value = ""
    if (this.refs.subject && this.refs.description) {
      this.refs.subject.value = ""
      this.refs.description.value = ""
    }
    this.setState({ errorMessage: null, isLoading: false })
  }
  checkValue(val, msg) {
    if (!val || val == "") {
      this.setState({ errorMessage: msg })
      return false
    }
    return true
  }
  checkFormat(val, msg, format) {
    if (!format.test(val.toLowerCase())) {
      this.setState({ errorMessage: msg })
      return false
    }
    return true
  }
  async submitGeneralForm(e) {
    e.preventDefault()
    await this.setState({ isLoading: true, errorMessage: null })
    consoleLog('state:', this.state)
    await this.submitForm()
  }
  async submitForm() {
    const regexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const regexMobile = /^(09)(\d{9})$/i;
    if (
      this.checkValue(this.refs.firstname.value, "نام را وارد نمایید.") &&
      this.checkValue(
        this.refs.lastname.value,
        "نام خانوادگی را وارد نمایید."
      ) &&
      this.checkValue(this.refs.mobile.value, "تلفن همراه را وارد نمایید.") &&
      this.checkValue(this.refs.email.value, "ایمیل را وارد نمایید.") &&
      this.checkFormat(
        getEnDigit(this.refs.mobile.value),
        "قالب تلفن همراه درست نیست.",
        regexMobile
      ) &&
      this.checkFormat(
        this.refs.email.value,
        "قالب ایمیل درست نیست.",
        regexEmail
      ) &&
      (this.props.formType != 'contact' ||
        (
          this.checkValue(this.refs.subject.value, "موضوع را وارد نمایید.") &&
          this.checkValue(this.refs.description.value, "توضیحات را وارد نمایید.")
        )
      )
    ) {
      const that = this

      // * For local test *
      //  setTimeout(function() { that.submit('token')
      //    that.setState({ isLoading: false })
      //    consoleLog('state2:', that.state)
      // }, 3000)

      await grecaptcha.ready(function() {
        grecaptcha
          .execute("6LdnNqgUAAAAANNngHoH6g1eH24MllxYog_yKZwt", {
            action: "form"
          })
          .then(function(token) {
            that.submit(token)
          })
      })
    } else {
      this.setState({ isLoading: false })
    }
  }
  async submit(token) {
    const functionName = this.props.formType == 'contact'? 'setContact' : 'setVisa'
    let args = [
      this.refs.firstname.value,
      this.refs.lastname.value,
      this.refs.mobile.value,
      this.refs.email.value,
    ]
    if (this.refs.subject && this.refs.description) {
      args = [...args,
        this.refs.subject.value,
        this.refs.description.value,
      ]
    }
    await this.props[functionName](
      token,
      ...args
    )
    if (this.props.isFormSuccess && !this.props.errorMessage) {
      this.clearForm()
    }
    this.showAlert()
    this.setState({ isLoading: false })
  }
  render() {
    consoleLog("GeneralForm Props:", this.props)
    const { formType, isFormLoading, isFormSuccess, setVisa, setContact, errorMessage } = this.props
    return (
      <div className={`${formType}-section-form ${formType}-form-container`}>
      <div className={`${formType}-top-from`}>
        <fieldset className={`form-input-box ${formType}-input-box`}>
          <input
            tabIndex="1"
            ref="firstname"
            id="general-firstname"
            placeholder="نام"
            className="form-control"
          />
          <img src={`/static/img/bamanro-visa-avatar.svg`} className={`form-section-img ${formType}-section-img`} alt="" />
        </fieldset>

        <fieldset className={`form-input-box ${formType}-input-box`}>
          <input
            tabIndex="2"
            ref="lastname"
            id="general-lastname"
            placeholder="نام خانوادگی"
            className="form-control"
          />
          <img src={`/static/img/bamanro-visa-avatar.svg`} className={`form-section-img ${formType}-section-img`} alt="" />
        </fieldset>
        </div>

        <div className={`${formType}-down-from`}>
        <fieldset className={`form-input-box ${formType}-input-box`}>
          <input
            className="mobile-input form-control"
            tabIndex="3"
            ref="mobile"
            id="mobile"
            type={this.state.isDesktop? 'text' : 'number'}
            placeholder="تلفن همراه"
          />
          <img
          alt="با من رو"
          src={`/static/img/bamanro-visa-phone.svg`} className={`form-section-img
            ${formType}-section-img`} />
        </fieldset>

        <fieldset className={`form-input-box ${formType}-input-box`}>
          <input
            className="email-input form-control"
            tabIndex="4"
            ref="email"
            type="email"
            placeholder="ایمیل"
          />

          <img src={`/static/img/bamanro-visa-mail.svg`} className={`form-section-img
            ${formType}-section-img`} alt="" />
        </fieldset>
        </div>

        {formType == "contact" && (
          <fieldset className="form-input-box">
            <input
              tabIndex="5"
              ref="subject"
              placeholder="موضوع"
              className="form-control"
            />
            <img src={`/static/img/bamanro-visa-document.svg`} className="form-section-img" alt="" />
          </fieldset>
        )}
        {formType == "contact" && (
          <fieldset className="form-input-box">
            <textarea
              tabIndex="6"
              ref="description"
              placeholder="توضیحات"
              className="form-control"
              rows="5"
            />
          </fieldset>
        )}

        <div className="form-error">{this.state.errorMessage}</div>
        <button
          tabIndex="7"
          className={`btn form-button ${this.state.isLoading &&
            "disabled" || ""} ${formType}-button ${formType}-form-button`}
          disabled={this.state.isLoading}
          onClick={e => this.submitGeneralForm(e)}
        >
          {formType == "contact" ? "ارسال" : "ثبت اطلاعات"}
          {
            this.state.isLoading &&
            (
            <img
              alt=""
              className="loading-image"
              src={`/static/img/bamanro-loading.gif`}
            />
          )}
        </button>
        {
        this.state.isAlert && isFormSuccess != null && (
          <Alert
            errorMessage={errorMessage}
            isFormSuccess={(isFormSuccess != null && !errorMessage) || null}
          />
        )
        }
      </div>
    )
  }
}
