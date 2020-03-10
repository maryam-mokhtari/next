import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import * as Sentry from '@sentry/browser'
import withRedux from 'next-redux-wrapper'
import { hotjar } from 'react-hotjar'
import animateScrollTo from 'animated-scroll-to'
import NProgress from 'nprogress'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import { initStore } from '../store'
import {consoleLog} from '../utils/config'
import '../static/sass/base.scss'
import '../static/sass/login.scss'
import '../static/sass/responsive-600.scss'
import '../static/sass/responsive-400.scss'

export default withRedux(initStore)(
  class MyApp extends App {
    static async getInitialProps ({ Component, ctx }) {
      return {
        pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
      }
    }

    componentDidUpdate(prevProps) {
      const options = {
        speed: 500,
        minDuration: 250,
        maxDuration: 1500,
        element: window,
        cancelOnUserAction: true
      }
      const desiredOffset = 0
      animateScrollTo(desiredOffset, options)
    }

    render () {
      const { Component, pageProps, store } = this.props
      return (
        <Container>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      )
    }
  }
)
