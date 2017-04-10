import Vue from 'vue'
import Component from 'vue-class-component'

import TheHeader from 'src/components/TheHeader'
import TheFooter from 'src/components/TheFooter'
import SignIn from 'src/components/TheHeader/SignIn'
import SignUp from 'src/components/TheHeader/SignUp'

import { FETCH_CATEGORIES } from 'src/infrastructure/store/categories_types'

import { FETCH_CART } from 'src/infrastructure/store/modules/carts/actions'
import { GET_CUSTOMER } from 'src/infrastructure/store/modules/auth/getters'

@Component({
  components: {
    TheHeader,
    TheFooter,
    SignIn,
    SignUp
  }
})
export default class App extends Vue  {

  created() {
    this.setupFacebookLogin()

    this.fetchCategories()
    this.fetchCart()
  }

  // store operations
  get customer() {
    return this.$store.getters[GET_CUSTOMER]
  }

  fetchCategories() {
    this.$store.dispatch(FETCH_CATEGORIES)
  }

  fetchCart() {
    this.$store.dispatch(FETCH_CART)
  }

  setupFacebookLogin() {
    /* tslint:disable */
    (<any>window).fbAsyncInit = function() {
      FB.init({
        appId      : process.env.FACEBOOK_APP_ID,
        xfbml      : true,
        version    : 'v2.8'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      (<any>fjs.parentNode).insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    /* tslint:enable */
  }
}
