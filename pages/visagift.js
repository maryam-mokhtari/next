import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import fetch from 'isomorphic-unfetch'
import { clientBaseUrl, consoleLog, } from '../utils/config'
import {isArrayOK} from '../utils/array'
import {getInitials} from '../utils/initial'
import MainHead from '../components/MainHead'
import MainScripts from '../components/MainScripts'
import { setVisa, } from '../actions'
import VisaGift from '../components/visagift/VisaGift'

class VisaGiftPage extends Component {
  static async getInitialProps (ctx) {
    // return getInitials(ctx, 'gift', '/page/content/?slug=canada-gift-visa')
  }

  render() {
    consoleLog('visagift props:', this.props)
    const {menu, gift, setVisa, isFormSuccess, isFormLoading, errorMessage, profile, } = this.props
    const isGiftOK = gift && gift.status_code === 200 && isArrayOK(gift.data)
    const visaGiftProps = {gift: isGiftOK? gift.data[0]: null,
      setVisa, isFormSuccess, isFormLoading, errorMessage, }
    const topBarProps = {
      category: null,
      title: isGiftOK && gift.data[0].page_title,
      type: 'page',
    }
    const headerProps = {
      menu,
      profile,
      title: isGiftOK && gift.data[0].page_title,
      description: isGiftOK && gift.data[0].page_description
    }
    const imageProps = {
      image: isGiftOK && gift.data[0].page_image,
      image_wide: isGiftOK && gift.data[0].page_image_wide,
    }

    return (
      <div>
        <MainHead />
        <main id="main" className="sec">
          <div id="inner-main">
            <VisaGift {...visaGiftProps} />
          </div>
        </main>
        <MainScripts />
    </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setVisa: bindActionCreators(setVisa, dispatch),
  }
}

const mapStateToProps = state =>  {
  return {
    isFormSuccess: state.isFormSuccess,
    isFormLoading: state.isFormLoading,
    errorMessage: state.errorMessage,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisaGiftPage)
