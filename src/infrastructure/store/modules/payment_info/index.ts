import getters from './getters'
import mutations, { INITIAL_VALUE } from './mutations'
import actions from './actions'

const initialState = {
  payments: INITIAL_VALUE
}

export default {
  state: { ...initialState },
  getters,
  mutations,
  actions
}
