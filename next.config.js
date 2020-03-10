const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withImages = require('next-images')
const withSourceMaps = require('@zeit/next-source-maps')()
const withOffline = require('next-offline')
const fetch = require('isomorphic-unfetch')
const server = 'http://nginx/api'


const webpackConfig = (config, { isServer }) => {
  if (!isServer) {
    config.node = {
      fs: 'empty'
    }
  }
  return config
}

module.exports = withOffline(withCSS(withSass(withImages(withSourceMaps({
  webpack: webpackConfig,
})))))
