<template>
  <div>
    <div class="row">
      <div class="col-md-12">
          <h3>Settings</h3>
      </div>
    </div>  
    <hr>
    <div class="alert alert-success animated slideInDown" v-if="passUpdateSuccess">
      <strong>Update Successful</strong> 
      <br>
     {{passUpdateSuccess}}
    </div>
    <div class="alert alert-danger animated slideInDown" v-if="passUpdateError">
      <strong>Update Unsuccessful</strong> 
      <br>
     {{passUpdateError}}
    </div>
    <!-- <div class="alert alert-success animated slideInDown" v-if="emailUpdateSuccess">
      <strong>Update Successful</strong> 
      <br>
     {{emailUpdateSuccess}}
    </div> -->
    <div class="row">
      <!-- <div class="col-md-6">
        <h5>Email Settings</h5>
        <EmailReset></EmailReset>
      </div> -->
      <div class="col-md-12">
        <h5>Password Settings</h5>
        <PassReset @passSuccess="passUpdateSuccess = $event" @passError="passUpdateError = $event" @clearPassNotfy="clearNotfy"></PassReset>
      </div>
    </div>
  </div>
</template>

<script>
// import EmailReset from './EmailReset'
import PassReset from './PassReset'

export default {
  name: 'Settings',
  data: () => ({
    msg: 'Welcome to Settings Component!',
    passUpdateSuccess: '',
    passUpdateError: ''
  }),
  components: {
    PassReset
  },
  methods: {
    clearNotfy () {
      this.passUpdateSuccess = ''
      this.passUpdateError = ''
    }
  },
  watch: {
    passUpdateSuccess: function (val) {
      this.passUpdateSuccess = val
      this.passUpdateError = ''
      console.log(val)
    },
    passUpdateError: function (val) {
      this.passUpdateError = val
      this.passUpdateSuccess = ''
      console.log(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media only screen and (max-width: 600px) {

  }
  @media only screen and (min-width: 600px) and (max-width: 992px) {

  }
  @media only screen and (min-width: 993px) {

  }
</style>
