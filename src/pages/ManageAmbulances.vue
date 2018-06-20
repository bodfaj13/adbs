<template>
  <div class="content">
    <DashboardNav></DashboardNav>
    <div class="content-wrapper">
      {{msg}}
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import DashboardNav from '../components/DashboardNav'
import Footer from '../components/Footer'

export default {
  name: 'ManageAmbulances',
  data: () => ({
    msg: 'Welcome to ManageAmbulances Component!'
  }),
  components: {
    DashboardNav,
    Footer
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
    