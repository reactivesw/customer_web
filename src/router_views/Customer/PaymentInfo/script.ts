import Vue from 'vue'
import Component from 'vue-class-component'

import {
  ADD_CREDIT_CARD,
  DELETE_CREDIT_CARD,
  FETCH_PAYMENTS,
  SET_SELECTED
} from 'src/infrastructure/store/modules/payment_info/actions'

import {
  CreditCardDraft,
  DefaultCardRequest,
  DeleteCardRequest
} from 'src/infrastructure/api_client/customer/payment_models'

import { GET_PAYMENTS } from 'src/infrastructure/store/modules/payment_info/getters'

import CreditCard from 'src/components/payment/CreditCard'
import PaymentList from 'src/components/payment/PaymentList'
import ConfirmDialog from 'src/components/utility/ConfirmDialog'
import { GET_CUSTOMER_ID } from 'src/infrastructure/store/modules/auth/getters'
import { CREDIT_CARD_CONFLICT } from 'src/infrastructure/api_client/customer/payment_info'

@Component({
  components: {
    CreditCard,
    PaymentList,
    ConfirmDialog
  }
})
export default class PaymentInfo extends Vue {
  // first show payment list
  showPaymentList = true

  showConfirmChangeDefault = false
  confirmChangeDefaultPayment: any = undefined

  showConfirmDeletePayment = false
  confirmDeletePayment: any = undefined

  savingNewCard = false

  errorMessage = null

  // fetch payments when created
  created() {
    this.fetchPayments()
  }

  fetchPayments() {
    if (this.customerId) {
      this.$store.dispatch(FETCH_PAYMENTS)
    }
  }

  get customerId() {
    return this.$store.getters[GET_CUSTOMER_ID]
  }

  get payments() {
    return this.$store.getters[GET_PAYMENTS]
  }

  // BEGIN: add a credit card
  clickAddCreditCardHanlder() {
    this.errorMessage = null
    this.showPaymentList = false
  }

  async addCreditCardHanlder(data) {
    this.savingNewCard = true
    let request: CreditCardDraft = {
      customerId: this.customerId,
      ...data
    }
    try {
      await this.$store.dispatch(ADD_CREDIT_CARD, request)
      this.showPaymentList = true
    } catch (e) {
      switch (e.message) {
        case CREDIT_CARD_CONFLICT:
          this.errorMessage = this['$t']('alert.credit_card_conflict')
        default:
          throw e
      }
    } finally {
      this.savingNewCard = false
    }
  }

  cancelAddCreditCardHandler() {
    this.errorMessage = null
    this.showPaymentList = true
  }

  // END: add credit card

  // BEGIN: handle change default
  defaultChangedHandler(payment) {
    this.errorMessage = null
    this.showConfirmChangeDefault = true
    this.confirmChangeDefaultPayment = payment
  }

  confirmYesChangeDefaultHandler() {
    const request: DefaultCardRequest = {
      customerId: this.customerId,
      creditCardId: this.confirmChangeDefaultPayment.id,
      version: this.confirmChangeDefaultPayment.version
    }
    this.$store.dispatch(SET_SELECTED, request)

    // then clean up
    this.confirmNoChangeDefaultHandler()
  }

  confirmNoChangeDefaultHandler() {
    this.showConfirmChangeDefault = false
    this.confirmChangeDefaultPayment = undefined
  }

  // END: handle change default

  // BEGIN: handle delete event
  deletePaymentHandler(payment) {
    this.errorMessage = null
    this.showConfirmDeletePayment = true
    this.confirmDeletePayment = payment
  }

  confirmYesDeletePaymentHandler() {
    const request: DeleteCardRequest = {
      creditCardId: this.confirmDeletePayment.id,
      version: this.confirmDeletePayment.version
    }
    this.$store.dispatch(DELETE_CREDIT_CARD, request)
    this.confirmNoDeletePaymentHandler()
  }

  confirmNoDeletePaymentHandler() {
    this.showConfirmDeletePayment = false
    this.confirmDeletePayment = undefined
  }

  // END: handle delete event
}
