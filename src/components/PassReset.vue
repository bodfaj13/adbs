<template>
  <div class="content">
    <form>
  <div class="form-group">
    <div class="form-row">
      <div class="col-md-12">
        <label for="formerEmail">Former Password</label>
          <div class="input-group">
            <input  v-bind:type="passType" class="form-control" id="formerPass" aria-describedby="" placeholder=""  v-model="formerPass">
            <div class="input-group-addon pass-addon" style="padding-left: 5px;">
              <button class="btn btn-primary btn-block" @click="togglePassword  ">
              <i class="fa fa-fw fa-eye" v-if="hideText"></i>
              <i class="fa fa-fw fa-eye-slash" v-else></i>
            </button>
            </div>
          </div>
        <small id="formerPassError" class="form-text text-danger animated slideInUp" v-if="formerPassError">{{formerPassError}}</small>
      </div>
      <div class="col-md-12">
        <label for="newPass">New Pasowrd</label>
        <div class="input-group">
          <input  v-bind:type="passTypeNew" class="form-control" id="newPass" aria-describedby="" placeholder=""  v-model="newPass">
          <div class="input-group-addon pass-addon" style="padding-left: 5px;">
            <button class="btn btn-primary btn-block" @click="togglePasswordNew">
              <i class="fa fa-fw fa-eye" v-if="hideTextNew"></i>
              <i class="fa fa-fw fa-eye-slash" v-else></i>
            </button>
          </div>
        </div>
        <small id="callerContactError" class="form-text text-danger animated slideInUp" v-if="newPassError">{{newPassError}}</small>
      </div>
    </div>
    <div class="row form-submit">
      <div class="col-md-12">
          <button type="button" class="btn btn-primary btn-block text-white btn-md" @click="updatePass" :class="{disabled: btnDisabled}">
          <div class="loader" v-if="loaderSwitch"></div>
          <span v-else>Update Password 
            <i class="fa fa-fw fa-long-arrow-right"></i>
          </span>
        </button>
      </div>
      <div class="col-md-12">
        <button type="button" class="btn btn-primary btn-block text-white btn-md" @click="cancelPass" v-if="!btnDisabled">
          Cancel
        </button>
      </div>
    </div>
  </div>
</form>
  </div>
</template>

<script>
import {LoaderMixin} from '../mixins/LoaderMixin'
import AuthService from '../services/AuthService'

export default {
  name: 'EmailReset',
  mixins: [LoaderMixin],
  data: () => ({
    msg: 'Welcome to EmailReset Component!',
    formerPass: '',
    newPass: '',
    formerPassError: '',
    newPassError: '',
    passSuccess: '',
    hideText: false,
    passType: 'password',
    hideTextNew: false,
    passTypeNew: 'password',
    error: ''
  }),
  methods: {
    cancelPass (e) {
      e.preventDefault()
      this.clearPassInputs()
      this.passSuccess = ''
      this.$emit('clearPassNotfy', true)
    },
    clearPassInputs () {
      this.formerPass = ''
      this.newPass = ''
      this.formerPassError = ''
      this.newPassError = ''
    },
    async updatePass (e) {
      e.preventDefault()
      this.btnDisabled = true
      this.loaderSwitch = true
      var go = true
      this.formerPassError = ''
      this.newPassError = ''
      if (this.formerPass.length === 0) {
        this.formerPassError = 'Invalid Password supplied'
        go = false
      }
      if (this.newPass.length === 0) {
        this.newPassError = 'Invalid Password supplied'
        go = false
      }
      if (go) {
        try {
          const response = await AuthService.adminPassUpdate({
            formerPass: this.formerPass,
            newPass: this.newPass
          })
          console.log(response)
          this.passSuccess = response.data.success
          this.clearPassInputs()
          this.$emit('passSuccess', this.passSuccess)
          this.timeOut()
        } catch (error) {
          this.error = error.response.data.error
          this.formerPassError = error.response.data.error_formerPass
          this.newPassError = error.response.data.error_newPass
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
    togglePasswordNew (e) {
      e.preventDefault()
      this.hideTextNew = !this.hideTextNew
      if (this.hideTextNew) {
        this.passTypeNew = 'text'
      }
      if (!this.hideTextNew) {
        this.passTypeNew = 'password'
      }
    }
  },
  watch: {
    error: function (val) {
      this.error = val
      if (val === 'New Password should be different') {
        this.$emit('passError', val)
      }
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
