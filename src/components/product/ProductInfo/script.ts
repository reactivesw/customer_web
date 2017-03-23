import { Component } from 'vue'
import { MoneyToString } from 'src/infrastructure/utils'

export default {
  name: 'Product',

  computed: {
    name (this: Component) {
      return this['product'].name
    },
    price (this: Component) {
      return this['variant'].prices[0].value
    },
    description (this: Component) {
      return this['product'].description
    }
  },

  props: {
    product: Object,
    variant: Object
  },

  methods: {
    MoneyToString
  }
}
