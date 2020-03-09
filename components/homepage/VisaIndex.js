import React, { Component } from 'react'
import { Link, } from '../../routes'

export default class VisaIndex extends Component {
  render() {
    return (
      <div className="visa-index-container">
        <div className="visa-index-top">
          <h2>
            <br/>
            قرعه‌کشی ویزای رایگان کانادا
            <br/>
              با من به کانادا سفر کن
          </h2>
          <div className="visa-index-content">
            از با‌من‌رو ویزای توریستی کانادا هدیه بگیرید و به کشور رویاها سفر کنید!
          </div>
        </div>

        <div className="visa-index-button">
          <Link
            href="/canada-gift-visa">
            <a
              role="button"
              tabIndex="5"
              className="btn visa-button visa-index-arrow"
            >
              <span>
              ویزای توریستی کانادا با یک کلیک
              </span>
            </a>
          </Link>
        </div>

      </div>
    )
  }
}
