<template>
  <div class="container animated bounceIn">
    <div class="card card-login mx-auto mt-5">
      <div class="card-header"><h3>Reset Password</h3></div>
      <div class="card-body">
        <div class="text-center mt-4 mb-5">
          <h3>Forgot your password?</h3>
          <p>Enter your email address and we will send you instructions on how to reset your password.</p>
        </div>
        <form>
          <div class="form-group">
            <input class="form-control" id="exampleInputEmail1" type="email" aria-describedby="emailHelp" placeholder="Enter email address">
          </div>
          <a class="btn btn-primary btn-block" href="" @click="doNothing">Reset Password</a>
        </form>
        <div class="text-center">
         <a class="d-block small" href="" @click="goToLogin">Login</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data: () => ({
    msg: 'Welcome to ForgotPassword Page!'
  }),
  methods: {
    doNothing (e) {
      e.preventDefault()
    },
    goToLogin (e) {
      e.preventDefault()
      this.$router.push('/')
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
