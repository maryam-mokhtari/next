import React, { Component } from 'react'
import Link from 'next/link'
import { consoleLog, } from '../../utils/config'

export default class Index extends Component {
  render() {
    return (
      <Link href={`/fames/1`} passHref>
        <a className="start">
          Enter
        </a>
      </Link>
    )
  }
}
