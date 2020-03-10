import { createConstants, createGeneralConstants } from '../utils/actions'

export default {...createConstants(
    'VISA',
    'LOGIN',
    'LOGOUT',
    'FAMES',
    'FAME',
  ),
  ...createGeneralConstants(
    'COUNTDOWN',
  ),
}
