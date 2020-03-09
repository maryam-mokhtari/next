import React, { Component } from "react"
import { consoleLog, } from '../../utils/config'
import GeneralForm from '../general/GeneralForm'
import {isArrayOK} from '../../utils/array'

export default class VisaGift extends Component {
  render() {
    consoleLog("VisaGift Props:", this.props)
    const { gift, setVisa, isFormSuccess, isFormLoading, errorMessage } = this.props
    const GeneralFormProps = { setVisa, isFormSuccess, isFormLoading, errorMessage, formType: 'visa' }
    return (
      <div className="visa-container">
        <div className="background-form">
          {gift &&
            <div className="text-gift">
              <h2>
                {gift.page_sub_title.replace(/\u200E/g, '\u200C')}
              </h2>
              <div>
                {gift.page_description.replace(/\u200E/g, '\u200C')}
              </div>
              <hr className="text-gift-border d-none" />
            </div>
          }
          <div className="gift-section">
            <div className="img-container">
              <div className="left-gift-section">
                <GeneralForm {...GeneralFormProps} />
              </div>
            </div>
            <div className="right-gift-section">
              
            </div>
          </div>
        </div>
        <div className="background-visa"></div>
      </div>
    )
  }
}
