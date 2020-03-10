import React, { Component } from 'react'
import Link from 'next/link'
import { consoleLog, } from '../../utils/config'

export default class FameBox extends Component {
  render() {
    consoleLog('FameBox Props:', this.props)
    const { fame } = this.props
    return (
      <Link key={fame.id} href={`/fame/${fame.id}`} passHref>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="fame-box fame-holder">
            <div className="fame-box-image"
              style={{
                backgroundImage:
                  `url('${fame.image || `/static/img/bamanro-default.jpeg`}')`
                }}
            />
            <div className="fame-box-content">
              <Link href={`/fame/${fame.id}`}>
                <a>
                  <h3 className="fame-box-header">
                    {fame.name.replace(/\u200E/g, '\u200C')}
                  </h3>
                </a>
              </Link>
              <div className="fame-box-text">
                {fame.dob}
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}
