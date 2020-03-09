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
import '../static/css/base.css'
import '../static/sass/base.scss'
import '../static/css/override.css'
import '../static/css/collapse.css'
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
      dsn: 'https://5c36d4ab4b984726aeb31f943ad98f22@sentry.io/1863966'
  })
}

Router.events.on('routeChangeStart', url => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})
Router.events.on('routeChangeError', () => NProgress.done())

export default withRedux(initStore)(
  class MyApp extends App {
    static async getInitialProps ({ Component, ctx }) {
      return {
        pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
      }
    }

    componentDidCatch(error, errorInfo) {
      Sentry.withScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key])
        })
        Sentry.captureException(error)
      })
      super.componentDidCatch(error, errorInfo)
    }

    componentDidMount() {
      hotjar.initialize(1377405, 6)
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
