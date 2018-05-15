<template>
  <div class="content">
    <DashboardNav></DashboardNav>
    <div class="content-wrapper">
      <div class="container-fluid">

        <!-- <div class="alert alert-success animated slideInDown" >
          <strong>Update Successful</strong> 
          <br>
          Here goes the shit
        </div> -->

        <div class="row">
          <div class="col-md-12">
            <h3>Create Emergency Case</h3>
          </div>
        </div>  
        <hr>

        <div class="row">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">
                <div class="row">
                  <div class="col-md-9">
                    <h6>Call ID: {{currentCase._id}}</h6>
                  </div>
                  <div class="col-md-3">
                    <button class="btn btn-primary" @click="toggleShow" ref="showDetailsBtn">Show Call Details</button>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label for="noNeeded">No of Needed Ambulance(s)</label>
                  <input type="text" class="form-control" id="noNeeded" :value="AmbNeeded" disabled/>
                </div>
                <div class="form-group">
                  <label for="noNeeded">No of Selected Ambulance(s)</label>
                  <input type="text" class="form-control" id="noSelected" value="0" disabled/>
                </div>
                <hr>
                <table class="table table-hover" v-if="showDetails">
                  <tbody>
                    <tr>
                      <th scope="row">Caller Name</th>
                      <td>{{currentCase.callerName}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Caller Contact</th>
                      <td>{{currentCase.callerContact}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Live At Scene</th>
                      <td>{{currentCase.liveAtScene}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Emergency Address</th>
                      <td>{{currentCase.emergencyAddress}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Caller Is Victim</th>
                      <td>{{currentCase.callerIsVictim}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Emergency Type</th>
                      <td>{{currentCase.emergencyType}}</td>
                    </tr>
                    <tr>
                      <th scope="row">No Of Injured</th>
                      <td>{{currentCase.noOfInjured}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Note</th>
                      <td>{{currentCase.note}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer text-muted">
                <div class="row">
                  <div class="col-md-12">
                    <button class="btn btn-primary" style="width: 100%">Moblise Case <i class="fa fa-plus"></i></button> 
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <div class="card-header">
                <h6>Avaliable Ambulances <span class="badge badge-success">{{ambulancesLength}}</span></h6>
              </div>
              <div class="card-body">
                <!-- <div class="form-check"> -->
                  <div class="" v-if="ambulancesLength">
                    <template v-for="(car, key) in ambulances">
                      <p>
                        <input type="checkbox" class="form-check-input" :key="key" :value="car._id">
                        <button class="btn btn-primary" style="width: 100%;" data-toggle="modal" data-target="#exampleModal" :key="key">Ambulance ID: {{car._id}}</button>
                      </p>
                    </template>
                  </div>
                  <div class="container" v-else>
                    None Available  <button class="btn btn-primary" @click="goToAddAmb"> <i class="fa fa-fw fa-plus"></i> Add Ambulance(s)</button>
                  </div>
                  <div class="container" v-if="addMore">
                    Not Enough Available  Ambulance(s) <button class="btn btn-primary" @click="goToAddAmb"> <i class="fa fa-fw fa-plus"></i> Add Ambulance(s)</button>
                  </div>
                <!-- </div> -->
              </div>
              <div class="card-footer text-muted">
                Pick from pool of available ambulances
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- Footer -->
      <Footer></Footer>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardNav from '../components/DashboardNav'
import Footer from '../components/Footer'
import {DataMixin} from '../mixins/DataMixin'
import {LoaderMixin} from '../mixins/LoaderMixin'

export default {
  name: 'CreateCase',
  mixins: [DataMixin, LoaderMixin],
  data: () => ({
    msg: 'Welcome to CreateCase Page!',
    showDetails: false,
    currentCase: {},
    AmbNeeded: 0,
    ambChosen: [],
    addMore: true
  }),
  methods: {
    toggleShow (e) {
      e.preventDefault()
      if (!this.showDetails) {
        this.showDetails = true
        this.$refs.showDetailsBtn.innerText = 'Hide Call Details'
      } else {
        this.showDetails = false
        this.$refs.showDetailsBtn.innerText = 'Show Call Details'
      }
    },
    calcAmbNeeded () {
      this.AmbNeeded = Math.ceil(this.currentCase.noOfInjured / 3)
    },
    toggleAddMore () {
      if (this.ambulancesLength < 1 && this.AmbNeeded > this.ambulancesLength + 1) {
        this.addMore = false
      } else if () {
        
      }
    },
    goToAddAmb (e) {
      e.preventDefault()
      this.$router.push({name: 'CreateAmbulance'})
    }
  },
  components: {
    DashboardNav,
    Footer
  },
  mounted () {
    this.currentCase = this.$store.state.currentCase
    this.calcAmbNeeded()
    this.toggleAddMore()
    this.getAvailableAmbulanceDetails()
    console.log(this.ambulancesLength)
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
  .form-check {
    margin-top: 5px;
  }
  @media only screen and (max-width: 600px) {

  }

  @media only screen and (min-width: 600px) and (max-width: 992px) {

  }
  @media only screen and (min-width: 993px) {

  }
</style>
