<template>
  <div>
    <div class="row">
      <div class="col-md-12">
          <h3>Create Driver</h3>
      </div>
    </div>  
    <hr>
    <div class="alert alert-success animated slideInDown" v-if="resgisterSuccess">
      <strong>Registration Successful</strong> 
      <br>
      Driver was created successfully!
    </div>
    <form>
      <div class="form-group">
        <div class="form-row">
          <div class="col-md-6">
            <label for="fullName">Full Name</label>
            <input class="form-control" id="fullName" type="text" aria-describedby="" placeholder="" v-model="fullName">
            <small id="fullNameError" class="form-text text-danger animated slideInUp" v-if="fullNameError">{{fullNameError}}</small>
          </div>
          <div class="col-md-6">
            <label for="email">Email Address</label>
            <input class="form-control" id="email" type="text" aria-describedby="" placeholder="" v-model="email">
            <small id="callerContactError" class="form-text text-danger animated slideInUp" v-if="emailError">{{emailError}}</small>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="form-row">
          <div class="col-md-12">
            <label for="address">Home Address</label>
            <input class="form-control" id="address" type="text" aria-describedby="" placeholder="" v-model="address">
            <small id="addressError" class="form-text text-danger animated slideInUp" v-if="addressError">{{addressError}}</small>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="form-row">
          <div class="col-md-4">
            <label for="gender">Gender</label>
            <select class="form-control" id="gender" v-model="gender">
              <option value=""></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <small id="callerIsVictimError" class="form-text text-danger animated slideInUp" v-if="genderError">{{genderError}}</small>
          </div>
          <div class="col-md-4">
            <label for="email">Password</label>
            <div class="input-group">
              <input v-bind:type="passType" class="form-control" id="password" aria-describedby="" placeholder=""  v-model="password">
              <div class="input-group-addon pass-addon" style="
              padding-left: 5px;">
                <button class="btn btn-primary btn-block" @click="togglePassword">
                  <i class="fa fa-fw fa-eye" v-if="hideText"></i>
                  <i class="fa fa-fw fa-eye-slash" v-else></i>
                </button>
              </div>
            </div>
            <small id="callerContactError" class="form-text text-danger animated slideInUp" v-if="passwordError">{{passwordError}}</small>
          </div>
          <div class="col-md-4">
            <label for="email">Contact</label>
            <input class="form-control" id="contact" type="text" aria-describedby="" placeholder="" v-model="contact">
            <small id="callerContactError" class="form-text text-danger animated slideInUp" v-if="contactError">{{contactError}}</small>
          </div>
        </div>  
      </div>
      <div class="row form-submit">
        <div class="col-md-12">
            <button type="button" class="btn btn-primary btn-block text-white btn-md" @click="createDriver" :class="{disabled: btnDisabled}">
            <div class="loader" v-if="loaderSwitch"></div>
            <span v-else>Create Driver 
              <i class="fa fa-fw fa-long-arrow-right"></i>
            </span>
          </button>
        </div>
        <div class="col-md-12">
          <button type="button" class="btn btn-primary btn-block text-white btn-md" @click="cancel" v-if="!btnDisabled">
            Clear
          </button>
        </div>
      </div>  
    </form>
  </div>
</template>

<script>
import AuthService from '../services/AuthService'
import {LoaderMixin} from '../mixins/LoaderMixin'

export default {
  name: 'CreateDriver',
  mixins: [LoaderMixin],
  data: () => ({
    msg: 'Welcome to Create Driver Component!',
    fullName: '',
    email: '',
    address: '',
    gender: '',
    password: '',
    contact: '',
    fullNameError: '',
    emailError: '',
    addressError: '',
    genderError: '',
    passwordError: '',
    contactError: '',
    passType: 'password',
    hideText: false,
    error: '',
    resgisterSuccess: ''
  }),
  methods: {
    cancel (e) {
      e.preventDefault()
      this.clearInputs()
      this.resgisterSuccess = ''
    },
    async createDriver (e) {
      e.preventDefault()
      this.btnDisabled = true
      this.loaderSwitch = true
      var go = true
      this.fullNameError = ''
      this.emailError = ''
      this.addressError = ''
      this.passwordError = ''
      this.contactError = ''
      this.genderError = ''
      this.resgisterSuccess = ''
      if (this.fullName.length === 0) {
        this.fullNameError = 'Invalid Driver Name supplied'
        go = false
      }
      if (this.email.length === 0) {
        this.emailError = 'Invalid Email Address supplied'
        go = false
      }
      if (this.gender.length === 0) {
        this.genderError = 'Invalid Gender supplied'
        go = false
      }
      if (this.address.length === 0) {
        this.addressError = 'Invalid Address supplied'
        go = false
      }
      if (this.password.length === 0) {
        this.passwordError = 'Invalid Password supplied'
        go = false
      }
      if (this.contact.length === 0) {
        this.contactError = 'Invalid Contact supplied'
        go = false
      }
      if (go) {
        try {
          const response = await AuthService.registerDriver({
            fullName: this.fullName,
            password: this.password,
            email: this.email,
            address: this.address,
            contact: this.contact,
            gender: this.gender
          })
          console.log(response)
          this.resgisterSuccess = response.data.success
          this.clearInputs()
          this.timeOut()
          this.$emit('reRunNumbers', true)
        } catch (error) {
          this.error = error.response.data.error
          this.emailError = error.response.data.error_Email
          this.timeOut()
        }
      } else {
        this.timeOut()
      }
    },
    togglePassword (e) {
      e.preventDefault()
      this.hideText = !this.hideText
      if (this.hideText) {
        this.passType = 'text'
      }
      if (!this.hideText) {
        this.passType = 'password'
      }
    },
    clearInputs () {
      this.fullName = ''
      this.email = ''
      this.address = ''
      this.gender = ''
      this.password = ''
      this.contact = ''
      this.fullNameError = ''
      this.emailError = ''
      this.addressError = ''
      this.passwordError = ''
      this.contactError = ''
      this.genderError = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .form-submit button:nth-child(1){
    margin-top: 5px;
  }
  @media only screen and (max-width: 600px) {

  }
  @media only screen and (min-width: 600px) and (max-width: 992px) {

  }
  @media only screen and (min-width: 993px) {

  }
</style>
