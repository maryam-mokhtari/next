import React, { Component } from 'react'
import { consoleLog, } from '../../utils/config'
import VisaIndex from './VisaIndex'
import Button from './Button'

export default class Visa extends Component {
  render() {
    consoleLog('Visa Props:', this.props)
    return (
      <section id="visa-section" className="visa-main-section">
        <div id="visa" className="visa-main sec">
          <VisaIndex />
        </div>
        <div className="visa-top-mobile" />

      </section>
    )
  }
}
