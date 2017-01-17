import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { LOG_OUT } from 'src/infrastructure/store/auth_types'

export default {
  name: 'Product',

  methods: {
    ...mapActions({
      logout: LOG_OUT
    })
  }
}
