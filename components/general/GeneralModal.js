import React, { Component } from "react"
import { consoleLog, } from '../../utils/config'

export default class GeneralModal extends Component {
  render() {
    consoleLog('generalModal Props:', this.props)
    const { modalId, title, children, submitTitle, cancelTitle, } = this.props
    return (
      <div className="modal fade" id={modalId} tabIndex="-1" role="dialog"
      aria-labelledby="generalModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {title &&
              <div className="modal-header">
                <h5 className="modal-title" id="generalModal">{title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            }
            <div className="modal-body">
              {children}
            </div>
            {submitTitle &&
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  {cancelTitle || 'انصراف'}
                </button>
                <button type="button" className="btn btn-primary">{submitTitle}</button>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}
