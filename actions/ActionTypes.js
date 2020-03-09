import { createConstants, createGeneralConstants } from '../utils/actions'

export default {...createConstants(
    'VISA',
  ),
  ...createGeneralConstants(
    'COUNTDOWN',
  ),
}
