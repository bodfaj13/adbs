<template>
  <div class="content">
    <DashboardNav></DashboardNav>
    <div class="content-wrapper">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <h3>View Cases</h3>
          </div>
        </div>  
        <hr>

        <code>query: {{ query }}</code>

      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import DashboardNav from '../components/DashboardNav'
import Footer from '../components/Footer'
import DataFunctions from '../services/DataFunctions'

export default {
  name: 'ViewCall',
  data: () => ({
    msg: 'Welcome to ViewCall Component!',
    totalCalls: [],
    query: {}
  }),
  methods: {
    async getTotalCall () {
      try {
        var response = await DataFunctions.getTotalCall()
        this.totalCalls = response.data.data
        this.data = this.totalCalls
      } catch (error) {
        console.log(error.response.data)
      }
    }
  },
  components: {
    DashboardNav,
    Footer
  },
  mounted () {
    this.getTotalCall()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-wrapper {
    margin-top: 50px;
  }
  .container-fluid {
    margin-bottom: 100px;
  }

  @media only screen and (max-width: 600px) {

  }

  @media only screen and (min-width: 600px) and (max-width: 992px) {

  }
  @media only screen and (min-width: 993px) {

  }
</style>
