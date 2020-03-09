import ActionTypes from '../ActionTypes'


export const countdown = (seconds) => ({
  type: ActionTypes.COUNTDOWN,
  seconds,
})
