import React, { Component } from 'react'
import Link from 'next/link'
import { consoleLog, } from '../../utils/config'

export default class FameBox extends Component {
  render() {
    consoleLog('FameBox Props:', this.props)
    const { fame, isDetail, pageNumber, } = this.props
    return (
      <div className="fame-box-wrapper">
      <Link key={fame.id} href={`/fame/${fame.id}`} passHref>
        <div className="fame-box">
          <div className="fame-box-image"
            style={{
              backgroundImage:
                `url('${fame.image || `/static/img/bamanro-default.jpeg`}')`
              }}
          />
          <div className="fame-box-content">
            <Link href={`/fame/${fame.id}`}>
              <a>
                <h1 className="fame-box-header">
                  {fame.name}
                </h1>
              </a>
            </Link>
            <div className="fame-box-footer">
              {fame.dob}
            </div>
          </div>
        </div>
      </Link>
      {isDetail &&
        <Link href={`/fames/${pageNumber || 1}`}>
          <a className="back">
            {pageNumber? "<Back" : "Fame List"}
          </a>
        </Link>
      }
      </div>
    )
  }
}
