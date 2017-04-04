import Vue from 'vue'
import Component from 'vue-class-component'

import { GET_CART, GET_IS_EMPTY}
  from 'src/infrastructure/store/modules/carts/getters'
import { REMOVE_LINE_ITEM, SET_LINE_ITEM_QUANTITY }
  from 'src/infrastructure/store/modules/carts/actions'

import LineItem from '../LineItem'

@Component({
  components: {
    LineItem
  }
})
export default class CardDetails extends Vue {
  // sotre operations
  get isEmpty() {
   return this.$store.getters[GET_IS_EMPTY]
  }

  get cart() {
    return this.$store.getters[GET_CART]
  }

  changeQuantity(data) {
    this.$store.dispatch(SET_LINE_ITEM_QUANTITY, data)
  }

  removeLineItem(data) {
    this.$store.dispatch(REMOVE_LINE_ITEM, data)
  }
}
