<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <a class="navbar-brand" href="" @click="gotoRecordCall"><i class="fa fa-fw fa-dashboard"></i> Admin Dashboard</a>
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav navbar-sidenav" id="dashbboardAccordion">
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Record Call">
          <a class="nav-link" href="" @click="gotoRecordCall">
            <i class="fa fa-fw fa-phone"></i>
            <span class="nav-link-text">Record Call</span>
          </a>
        </li>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Active Cases">
          <a class="nav-link" href="" @click="gotoActiveCases">
            <i class="fa fa-fw fa-briefcase"></i>
            <span class="nav-link-text">Active Cases</span>
          </a>
        </li>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Settings">
          <a class="nav-link" href="" @click="gotoSettings">
            <i class="fa fa-fw fa-wrench"></i>
            <span class="nav-link-text">Settings</span>
          </a>
        </li>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Create Resources">
          <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseCR" data-parent="#dashbboardAccordion">
            <i class="fa fa-fw fa-plus"></i>
            <span class="nav-link-text">Create Resources</span>
          </a>
          <ul class="sidenav-second-level collapse" id="collapseCR">
            <li>
              <a href="" @click="gotoCreateDriver">Create Driver</a>
            </li>
            <li>
              <a href="" @click="gotoCreateAmbulance">Create Ambulance</a>
            </li>
          </ul>
        </li>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Manage Resources">
          <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMR" data-parent="#dashbboardAccordion">
            <i class="fa fa-fw fa-sitemap"></i>
            <span class="nav-link-text">Manage Resources</span>
          </a>
          <ul class="sidenav-second-level collapse" id="collapseMR">
            <li>
              <a href="" @click="gotoManageAmbulances">Manage Ambulance</a>
            </li>
            <li>
              <a href="" @click="gotoManageDrivers">Manage Driver</a>
            </li>
             <!-- <li>
              <a href="">Manage Staffs</a>
            </li> -->
          </ul>
        </li>
      </ul>
      <!-- <ul class="navbar-nav sidenav-toggler">
        <li class="nav-item">
          <a class="nav-link text-center" id="sidenavToggler">
            <i class="fa fa-fw fa-angle-left"></i>
          </a>
        </li>
      </ul> -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" @click="goBack">
            <i class="fa fa-fw fa-arrow-left"></i>Go Back</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="goFront">
            <i class="fa fa-fw fa-arrow-right"></i>Go Forward</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="modal" data-target="#logoutModal">
            <i class="fa fa-fw fa-sign-out"></i>Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'DashboardNav',
  data: () => ({
    msg: 'Welcome to DashboardNav Component!'
  }),
  methods: {
    gotoRecordCall (e) {
      e.preventDefault()
      this.$router.push({name: 'RecordCall'})
    },
    gotoSettings (e) {
      e.preventDefault()
      this.$router.push({name: 'Settings'})
    },
    gotoActiveCases (e) {
      e.preventDefault()
      this.$router.push({name: 'ActiveCases'})
    },
    gotoCreateAmbulance (e) {
      e.preventDefault()
      this.$router.push({name: 'CreateAmbulance'})
    },
    gotoCreateDriver (e) {
      e.preventDefault()
      this.$router.push({name: 'CreateDriver'})
    },
    gotoManageAmbulances (e) {
      e.preventDefault()
      this.$router.push({name: 'ManageAmbulances'})
    },
    gotoManageDrivers (e) {
      e.preventDefault()
      this.$router.push({name: 'ManageDrivers'})
    },
    goBack (e) {
      e.preventDefault()
      this.$router.go(-1)
    },
    goFront (e) {
      e.preventDefault()
      this.$router.go(+1)
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
