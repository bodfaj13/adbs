<template>
  <div class="content" id="page-top">
    <DashboardNav></DashboardNav>
    <div class="content-wrapper">
      <div class="container-fluid">
        <!-- Breadcrumbs-->
        <ol class="breadcrumb animated slideInLeft">
          <li class="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li class="breadcrumb-item active">{{$store.state.adminDetails.fullName | toUppercase}}</li>
        </ol>
        <hr>

        <!-- Icon Cards-->
        <div class="row">
          <div class="col-xl-3 col-sm-6 mb-3 animated bounceIn">
            <div class="card text-white bg-primary o-hidden h-100">
              <div class="card-body">
                <div class="card-body-icon animated pulse infinite">
                  <i class="fa fa-fw fa-phone"></i>
                </div>
                <div class="mr-5"><b>{{totalCalls}} Total Calls</b></div>
              </div>
              <a class="card-footer text-white clearfix small z-1" @click="goToViewCall">
                <span class="float-left">View Details</span>
                <span class="float-right">
                  <i class="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-3 animated bounceIn">
            <div class="card text-white bg-warning o-hidden h-100">
              <div class="card-body">
                <div class="card-body-icon animated pulse infinite">
                  <i class="fa fa-fw fa-list"></i>
                </div>
                <div class="mr-5"><b>{{totalCases}}  Total Cases</b></div>
              </div>
              <a class="card-footer text-white clearfix small z-1" @click="goToViewCase">
                <span class="float-left">View Details</span>
                <span class="float-right">
                  <i class="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-3 animated bounceIn">
            <div class="card text-white bg-success o-hidden h-100">
              <div class="card-body">
                <div class="card-body-icon animated pulse infinite">
                  <i class="fa fa-fw fa-ambulance"></i>
                </div>
                <div class="mr-5"><b>{{availableAmb}} Available Ambulances</b></div>
              </div>
              <a class="card-footer text-white clearfix small z-1" @click="goToViewAmbulance">
                <span class="float-left">View Details</span>
                <span class="float-right">
                  <i class="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-3 animated bounceIn">
            <div class="card text-white bg-danger o-hidden h-100">
              <div class="card-body">
                <div class="card-body-icon animated pulse infinite">
                  <i class="fa fa-fw fa-support"></i>
                </div>
                <div class="mr-5"><b>{{activeEmg}} Active Emergencies</b></div>
              </div>
              <a class="card-footer text-white clearfix small z-1" @click="goToViewEmergency">
                <span class="float-left">View Details</span>
                <span class="float-right">
                  <i class="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>
        </div>

      </div>
      <!-- component view -->
      <router-view class="container-fluid" id="cview" @reRunNumbers="reRun"></router-view>
      <br>
      <br>

      <!-- Footer -->
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import DashboardNav from '../components/DashboardNav'
import Footer from '../components/Footer'
import {DataMixin} from '../mixins/DataMixin'

export default {
  name: 'Dashboard',
  mixins: [DataMixin],
  data: () => ({
    msg: 'Welcome to Dashboard Page!'
  }),
  methods: {
    gotoRecordCall (e) {
      e.preventDefault()
      this.$router.push({name: 'RecordCall'})
    },
    reRun () {
      this.getDriverNo()
      this.getTotalCasesNo()
      this.getAvailableAmbulanceNo()
      this.getActiveEmergencyNo()
    },
    goToViewAmbulance (e) {
      e.preventDefault()
      this.$router.push({ name: 'ViewAmbulance' })
    },
    goToViewCase (e) {
      e.preventDefault()
      this.$router.push({ name: 'ViewCase' })
    },
    goToViewCall (e) {
      e.preventDefault()
      this.$router.push({ name: 'ViewCall' })
    },
    goToViewEmergency (e) {
      e.preventDefault()
      this.$router.push({ name: 'ViewEmergency' })
    }
  },
  filters: {
    toUppercase (value) {
      return value.toUpperCase()
    }
  },
  components: {
    DashboardNav,
    Footer
  },
  mounted () {
    this.reRun()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .breadcrumb {
    margin-top: 50px;
  }
  #cview {
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 600px) {

  }
  @media only screen and (min-width: 600px) and (max-width: 992px) {

  }
  @media only screen and (min-width: 993px) {

  }
</style>
