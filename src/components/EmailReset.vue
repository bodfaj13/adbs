<template>
  <div class="content">
    <form>
      <div class="form-group">
        <div class="form-row">
          <div class="col-md-12">
            <label for="formerEmail">Former Email</label>
            <input class="form-control" id="formerEmail" type="text" aria-describedby="" placeholder="" v-model="formerEmail">
            <small id="formerEmailError" class="form-text text-danger animated slideInUp" v-if="formerEmailError">{{formerEmailError}}</small>
          </div>
          <div class="col-md-12">
            <label for="newEmail">New Email</label>
            <input class="form-control" id="newEmail" type="text" aria-describedby="" placeholder="" v-model="newEmail">
            <small id="callerContactError" class="form-text text-danger animated slideInUp" v-if="newEmailError">{{newEmailError}}</small>
          </div>
        </div>
        <div class="row form-submit">
          <div class="col-md-12">
              <button type="button" class="btn btn-primary btn-block text-white btn-md" @click="updateEmail" :class="{disabled: btnDisabled}">
              <div class="loader" v-if="loaderSwitch"></div>
              <span v-else>Update Email 
                <i class="fa fa-fw fa-long-arrow-right"></i>
              </span>
            </button>
          </div>
          <div class="col-md-12">
            <button type="button" class="btn btn-primary btn-block text-white btn-md" @click="cancelEmail" v-if="!btnDisabled">
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

export default {
  name: 'EmailReset',
  mixins: [LoaderMixin],
  data: () => ({
    msg: 'Welcome to EmailReset Component!',
    formerEmail: '',
    newEmail: '',
    formerEmailError: '',
    newEmailError: '',
    emailSuccess: ''
  }),
  methods: {
    cancelEmail (e) {
      e.preventDefault()
      this.clearEmailInputs()
      this.emailSuccess = ''
    },
    clearEmailInputs () {
      this.formerEmail = ''
      this.newEmail = ''
      this.formerEmailError = ''
      this.newEmailError = ''
    },
    async updateEmail (e) {
      e.preventDefault()
      this.btnDisabled = true
      this.loaderSwitch = true
      var go = true
      this.formerEmailError = ''
      this.newEmailError = ''
      if (this.formerEmail.length === 0) {
        this.formerEmailError = 'Invalid Email Address supplied'
        go = false
      }
      if (this.newEmail.length === 0) {
        this.newEmailError = 'Invalid Email Address supplied'
        go = false
      }
      if (go) {
        console.log(true)
        console.log(`${this.formerEmail} and  ${this.newEmail} `)
      } else {
        console.log(false)
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
