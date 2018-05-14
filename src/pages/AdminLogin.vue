<template>
  <div class="container animated bounceIn">
    <!-- login form -->
    <!-- top alert -->
    <div class="alert alert-success animated slideInUp"  v-if="loginSuccess">
      <strong>Authenication Successful</strong> 
      <br>
      Dashboard is being prepared...
    </div>
    <div class="card card-login mx-auto mt-5">
      <div class="card-header"><h3>ADS Login</h3></div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="loginEmail">Email address</label>
            <input class="form-control" id="loginEmail" type="text" v-model="loginEmail" aria-describedby="loginEmailError">
            <small id="loginEmailError" class="form-text text-danger animated slideInUp" v-if="loginEmailError">{{loginEmailError}}</small>
          </div>
          <div class="form-group">
            <label for="loginPass">Password</label>
            <input class="form-control" id="loginPass" type="password" v-model="loginPass" aria-describedby="loginPassError">
            <small id="loginPassError" class="form-text text-danger animated slideInUp" v-if="loginPassError">{{loginPassError}}</small>
          </div>
          <button type="button" class="btn btn-primary btn-block text-white btn-md" @click="sendLogin" :class="{disabled: btnDisabled}">
            <div class="loader" v-if="loaderSwitch"></div>
            <span v-else>Login</span>
          </button>
        </form>
        <div class="text-center">
          <!-- <a class="d-block small mt-3" href="">Register an Account</a> -->
          <a class="d-block small" href="" @click="goToForgotPassword">Forgot Password?</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/AuthService'
import {LoaderMixin} from '../mixins/LoaderMixin'

export default {
  name: 'AdminLogin',
  mixins: [LoaderMixin],
  data: () => ({
    msg: 'Welcome to AdminLogin Page!',
    loginEmail: '',
    loginPass: '',
    loginEmailError: '',
    loginPassError: '',
    loginSuccess: '',
    error: ''
  }),
  methods: {
    async sendLogin (e) {
      e.preventDefault()
      this.btnDisabled = true
      this.loaderSwitch = true
      var go = true
      this.loginEmailError = ''
      this.loginPassError = ''
      if (this.loginEmail.length === 0) {
        this.loginEmailError = 'Invalid Email Address supplied'
        go = false
      }
      if (this.loginPass.length === 0) {
        this.loginPassError = 'Invalid Password supplied'
        go = false
      }
      if (go) {
        try {
          const response = await AuthService.adminLogin({
            email: this.loginEmail,
            password: this.loginPass
          })
          console.log(response)
          this.loginSuccess = response.data.success
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setAdmin', response.data.adminDetails)
          this.timeOut()
          setTimeout(() => {
            this.$router.push({name: 'RecordCall'})
          }, 2000)
        } catch (error) {
          this.error = error.response.data.error
          this.loginEmailError = error.response.data.error_Email
          this.loginPassError = error.response.data.error_Password
          this.loginPass = ''
          this.timeOut()
        }
      } else {
        this.timeOut()
      }
    },
    goToForgotPassword (e) {
      e.preventDefault()
      this.$router.push({name: 'ForgotPassword'})
    }
  }
}
</script>

<style scoped>
  .alert {
    width: 400px;
    margin: 0px auto;
    margin-top: 10px;
  }
  @media only screen and (max-width: 600px) {
    .alert {
      width: 380px;
    }
  }
  @media only screen and (min-width: 600px) and (max-width: 992px) {
  }
  @media only screen and (min-width: 993px) {

  }

  /* smaller screen */
  @media only screen and (max-width: 400px) {
    .alert {
      width: 325px;
    }
  }
</style>
