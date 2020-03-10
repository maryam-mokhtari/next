import React, { Component } from 'react'
import { consoleLog, } from '../../utils/config'

export default class Button extends Component {
  render() {
    consoleLog('Button Props:', this.props)
    return (
      <section id="button-wrapper" className="visa-main-section">
        <div id="buuton-div" className="visa-main sec">
          <button>
            Call Api
          </button>
        </div>
      </section>
    )
  }
}
