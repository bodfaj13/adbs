<template>
  <div class="content">
    <DashboardNav></DashboardNav>
    <div class="content-wrapper">
      <div class="container-fluid">

        <div class="alert alert-success animated slideInDown" v-if="mobiliseSuccess">
          <strong>Case Mobilized Successfully</strong> 
          <br>
          <p>Navigating back to <b>Record Call View</b></p>
        </div>

        <div class="alert alert-danger animated slideInDown" v-if="mobiliseError">
          <strong>Something went wrong!</strong> 
        </div>

        <div class="alert alert-danger animated slideInDown" v-if="ambError">
          <strong>{{ambError}}</strong>
        </div>

        <div class="row">
          <div class="col-md-12">
            <h3>Create Emergency Case</h3>
          </div>
        </div>  
        <hr>

        <div class="row">
          <div class="col-md-7">
            <div class="card">
              <div class="card-header">
                <div class="row">
                  <div class="col-md-6">
                    <h6>Call ID: {{currentCase._id}}</h6>
                    <input  v-model="currentCase._id" hidden>
                  </div>
                  <div class="col-md-6 text-right">
                    <button class="btn btn-primary" @click="toggleShow" ref="showDetailsBtn">Show Call Details</button>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label for="noNeeded">No of Needed Ambulance(s)</label>
                  <input type="text" class="form-control" id="noNeeded" v-model="AmbNeeded" disabled/>
                </div>
                <div class="form-group">
                  <label for="noNeeded">No of Selected Ambulance(s)</label>
                  <input type="text" class="form-control" id="noSelected" :value="noAmbChosen" disabled/>
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
                    <button class="btn btn-primary" style="width: 100%" :class="{disabled: btnDisabled}" @click="mobiliseCase">
                      <div class="loader" v-if="loaderSwitch"></div>
                      <span v-else>Proceed To Case 
                        <i class="fa fa-fw fa-long-arrow-right"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-5">
            <div class="card">
              <div class="card-header">
                <h6>Avaliable Ambulances <span class="badge badge-success">{{ambulancesLength}}</span></h6>
              </div>
              <div class="card-body">
                <!-- <div class="form-check"> -->
                  <div class="" v-if="ambulancesLength">
                    <template v-for="(car, key) in ambulances">
                      <div class="input-group" :key="key" style="margin-left: 6px;padding-bottom: 3px;">
                        <span class="input-group-append">
                          <input type="checkbox" class="form-check-input" :value="car._id" v-model="ambChosen">
                        </span>
                        <button class="btn btn-primary ambBtn" data-toggle="modal" data-target="#clickOnAmb" @click="clickOnAmb(key)">Ambulance ID: {{car._id}}</button>
                      </div>
                    </template>
                  </div>
                  <div class="" style="margin: 5px" v-else>
                    <span class="small">None Available</span>  <button class="btn btn-primary small" @click="goToAddAmb" style="width: 100%"><i class="fa fa-fw fa-plus"></i> Add Ambulance(s)</button>
                  </div>
                  <div class="" style="margin: 5px" v-if="addMore">
                    <span class="small">Not Enough Available  Ambulance(s)</span> <button class="btn btn-primary small" style="width: 100%" @click="goToAddAmb"> <i class="fa fa-fw fa-plus"></i> Add Ambulance(s)</button>
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
      <div class="modal fade" id="clickOnAmb" tabindex="-1" role="dialog" aria-labelledby="clickOnAmbLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="clickOnAmbLabel">Ambulance Details</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <table class="table table-hover">
                <tbody>
                  <tr>
                    <th scope="row">Driver Name</th>
                    <td>{{clickOnAmbShow.assignedDriverName}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Driver ID</th>
                    <td>{{clickOnAmbShow.assignedDriver}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Plate Number</th>
                    <td>{{clickOnAmbShow.plateNumber}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Vechile Name</th>
                    <td>{{clickOnAmbShow.vechileName}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Vechile Model</th>
                    <td>{{clickOnAmbShow.vechileModel}}</td>
                  </tr>
                  <!-- <tr>
                    <th scope="row">Current Location</th>
                    <td>{{clickOnAmbShow.currentLocation.address}}</td>
                  </tr> -->
                </tbody>
              </table>
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
import { DataMixin } from '../mixins/DataMixin'
import { LoaderMixin } from '../mixins/LoaderMixin'
import Emergency from '../services/Emergency'

export default {
  name: 'CreateCase',
  mixins: [DataMixin, LoaderMixin],
  data: () => ({
    msg: 'Welcome to CreateCase Page!',
    showDetails: false,
    currentCase: {},
    AmbNeeded: 0,
    ambChosen: [],
    addMore: false,
    clickOnAmbShow: {},
    noAmbChosen: 0,
    mobiliseSuccess: '',
    mobiliseError: '',
    error: '',
    ambError: ''
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
      if (this.ambulancesLength <= this.AmbNeeded) {
        this.addMore = false
      } else {
        this.addMore = true
      }
    },
    goToAddAmb (e) {
      e.preventDefault()
      this.$router.push({ name: 'CreateAmbulance' })
    },
    clickOnAmb (no) {
      console.log(no)
      this.clickOnAmbShow = this.ambulances[no]
      console.log(this.clickOnAmbShow)
    },
    autoPickAmb () {
      if (this.ambulancesLength < this.AmbNeeded) {
        // for (var i = this.AmbNeeded; i >= 0; i--) {
        //   this.ambChosen.push(this.$store.state.AvailAmb[i]._id)
        // }
        console.log('less')
      }
      if (this.ambulancesLength > this.AmbNeeded) {
        // for (var x = this.AmbNeeded; x >= 0; x--) {
        //   this.ambChosen.push(this.$store.state.AvailAmb[x]._id)
        // }
        console.log('greater')
      }
      if (this.ambulancesLength === this.AmbNeeded) {
        // for (var y = this.AmbNeeded; y >= 0; y--) {
        //   this.ambChosen.push(this.$store.state.AvailAmb[i]._id)
        // }
        console.log('equal')
      }
    },
    async mobiliseCase (e) {
      e.preventDefault()
      this.ambError = ''
      this.mobiliseSuccess = ''
      this.btnDisabled = true
      this.loaderSwitch = true
      var go = true
      if (this.noAmbChosen === 0) {
        this.ambError = 'No Ambulance was chosen!'
        go = false
      }
      if (go) {
        try {
          const response = await Emergency.createCase({
            emergencyId: this.currentCase._id,
            ambulanceRequired: this.AmbNeeded,
            ambulanceId: this.ambChosen
          })
          console.log(response)
          this.timeOut()
          this.mobiliseSuccess = response.data.success
          this.getAvailableAmbulanceDetails()
          setTimeout(() => {
            this.$router.push({name: 'RecordCall'})
          }, 3000)
          this.$store.dispatch('keepCurrentCase', {})
        } catch (error) {
          this.error = error.response.data.error
          this.mobiliseError = this.error
          console.log(this.error)
          this.timeOut()
        }
      } else {
        this.timeOut()
      }
    }
  },
  components: {
    DashboardNav,
    Footer
  },
  watch: {
    ambChosen (val) {
      this.ambChosen = val
      this.noAmbChosen = val.length
      console.log(val)
    },
    AmbNeeded (val) {
      this.AmbNeeded = val
      // if (this.AmbNeeded < this.ambulancesLength) {
      //   console.log('lesser')
      // }
      this.autoPickAmb()
    }
  },
  mounted () {
    this.currentCase = this.$store.state.currentCase
    this.toggleAddMore()
    this.getAvailableAmbulanceDetails()
    this.calcAmbNeeded()
  },
  updated () {
    console.log('updated')
  },
  beforeUpdate () {
    console.log('beforeUpdated')
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
.ambHolder {
  padding: 3px;
}
.ambBtn {
  width: 100%;
  font-size: 15px;
}
@media only screen and (max-width: 600px) {
}

@media only screen and (min-width: 600px) and (max-width: 992px) {
}
@media only screen and (min-width: 993px) {
}
</style>
