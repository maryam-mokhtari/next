import React, { Component } from 'react'

export default class MainScripts extends Component {
  render() {
    const {isRecaptchaNeeded} = this.props
    return (
      <div>
        <script src={`/static/js/jquery.min.js`}></script>
        <script src={`/static/js/bootstrap.min.js`}></script>
      </div>
    )
  }
}
