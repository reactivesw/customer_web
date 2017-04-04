import { carts as cartsApi } from 'src/infrastructure/api_client'

import { SET_CART } from 'src/infrastructure/store/modules/carts/mutations'

import RemoveLineItem = Carts.ActionPayloads.RemoveLineItem
import SetLineItemQuantity = Carts.ActionPayloads.SetLineItemQuantity
import AddLineItem = Carts.ActionPayloads.AddLineItem

export const FETCH_CART = 'carts/FETCH_CART'
export const ADD_TO_CART = 'carts/ADD_TO_CART'
export const REMOVE_LINE_ITEM = 'carts/REMOVE_LINE_ITEM'
export const SET_LINE_ITEM_QUANTITY = 'carts/SET_LINE_ITEM_QUANTITY'

const actions = {
  /**
   * fetch current cart from server
   * @returns {Promise<void>}
   */
  async [FETCH_CART] ( { commit } ) {
    // we only want our cart, api client will handle it for us
    // const anonymousId = 'anonymousId2'
    const cart = await cartsApi.getCart()
    commit( SET_CART, cart )
  },

  /**
   * add lineItem to cart
   * @param lineItem
   * @returns {Promise<void>}
   */
  async [ADD_TO_CART] ( { state, commit }, lineItem: AddLineItem ) {
    const cart = await cartsApi.addToCart( state.cart.id, state.cart.version, lineItem )
    commit( SET_CART, cart )
  },

  /**
   * remove lineItem
   * @param lineItem
   * @returns {Promise<void>}
   */
  async [REMOVE_LINE_ITEM] ( { state, commit }, lineItem: RemoveLineItem ) {
    const cart = await cartsApi.removeLineItem( state.cart.id, state.cart.version, lineItem )
    commit( SET_CART, cart )
  },

  /**
   * change lineItem quantity
   * @param lineItem
   * @returns {Promise<void>}
   */
  async [SET_LINE_ITEM_QUANTITY] ( { state, commit }, lineItem: SetLineItemQuantity ) {
    const cart = await cartsApi.changeLineItemQuantity( state.cart.id, state.cart.version, lineItem )
    commit( SET_CART, cart )
  }
}

export default actions

