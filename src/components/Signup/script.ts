import * as Vue from 'vue'
import { mapActions } from 'vuex'
import ModalDialog from 'src/components/frame/ModalDialog'
import * as modalDialogsTypes from 'src/infrastructure/store/modal_dialogs_types'
import * as authTypes from 'src/infrastructure/store/auth_types'

export default {
  name: 'SignUp',

  data() {
    return {
      email: '',
      pwd: '',
      repeatPwd: ''
    }
  },

  computed: {
    showSignUp(this: Vue.Component) { return this['$store'].state.modal_dialogs.showSignUp }
  },

  methods: {
    ...mapActions({
      hideSignUp: modalDialogsTypes.HIDE_SIGN_UP,
      showSignIn: modalDialogsTypes.SHOW_SIGN_IN,
      signUp: authTypes.SIGN_UP
    }),

    checkFormValidity(this: Vue.Component) {
      // validate custom rules
      if (this['pwd'].length < 6) {
        this['$refs'].pwd.setCustomValidity(Vue['t']('alert.password_not_secure'))
      } else {
        this['$refs'].pwd.setCustomValidity('')
      }
      if (this['pwd'] !== this['repeatPwd']) {
        this['$refs'].rpwd.setCustomValidity(Vue['t']('alert.confirm_password_not_match'))
      } else {
        this['$refs'].rpwd.setCustomValidity('')
      }

      // Validate required fields, email format and other predefined rules
      this['$refs'].signUpForm.checkValidity()
    },

    async submitSignUp(this: Vue.Component) {
      // it has already passed all validation when enter this function
      await this['signUp']({ email: this['email'], password: this['pwd'] })
    },

    goSignIn(this: Vue.Component) {
      this['hideSignUp']()
      this['showSignIn']()
    }
  },

  components: {
    ModalDialog
  }
}
