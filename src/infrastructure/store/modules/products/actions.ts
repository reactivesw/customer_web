import { getProductProjections } from 'src/infrastructure/api_client'
import { FETCH_CURRENT_CATEGORY_PRODUCTS, SET_CURRENT_CATEGORY_PRODUCTS } from '../../products_types'

export default {
  async[FETCH_CURRENT_CATEGORY_PRODUCTS]({ rootState, commit }) {
    const products = await getProductProjections(rootState.route.params.catid)
    commit(SET_CURRENT_CATEGORY_PRODUCTS, products)
  }
}
