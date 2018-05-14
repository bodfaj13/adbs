<template>
  <div>
      <div class="row">
        <div class="col-md-12">
           <h3>Record Call</h3>
        </div>
      </div>  
      <hr>
      <form>
        <div class="form-group">
          <div class="form-row">
            <div class="col-md-5">
              <label for="callerName">Caller Name</label>
              <input class="form-control" id="callerName" type="text" aria-describedby="" placeholder="" v-model="callerName">
              <small id="callerNameError" class="form-text text-danger animated slideInUp" v-if="callerNameError">{{callerNameError}}</small>
            </div>
            <div class="col-md-4">
              <label for="callerContact">Caller Contact</label>
              <input class="form-control" id="callerContact" type="text" aria-describedby="" placeholder="" v-model="callerContact">
              <small id="callerContactError" class="form-text text-danger animated slideInUp" v-if="callerContactError">{{callerContactError}}</small>
            </div>
            <div class="col-md-3">
              <label for="liveAtScene">Live at Scene</label>
              <select class="form-control" id="liveAtScene" v-model="liveAtScene">
                <option value=""></option>
                <option value="True">Yes</option>
                <option value="False">No</option>
              </select>
              <small id="liveAtSceneError" class="form-text text-danger animated slideInUp" v-if="liveAtSceneError">{{liveAtSceneError}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="form-row">
            <div class="col-md-10">
              <label for="emergencyAddress">Emergency Address</label>
              <input class="form-control" id="emergencyAddress" type="text" aria-describedby="" placeholder="" v-model="emergencyAddress">
              <small id="emergencyAddressError" class="form-text text-danger animated slideInUp" v-if="emergencyAddressError">{{emergencyAddressError}}</small>
            </div>
            <div class="col-md-2">
              <label for="liveAtScene">View Map</label>
              <a class="btn btn-primary btn-block" href="" @click="
            controlMap" ref="mapBtn">Show Map</a>
            </div>
          </div>
          <div class="map text-white" v-if="showMap">
            <br>
            MAP GOES HERE
          </div>
        </div>
        <div class="form-group">
          <div class="form-row">
            <div class="col-md-4">
              <label for="noOfInjured">Number of Injured</label>
              <input class="form-control" id="noOfInjured" type="number" aria-describedby="" placeholder="" v-model="noOfInjured">
              <small id="noOfInjuredError" class="form-text text-danger animated slideInUp" v-if="noOfInjuredError">{{noOfInjuredError}}</small>
            </div>
            <div class="col-md-4">
              <label for="callerIsVictim">Caller is Victim</label>
              <select class="form-control" id="liveAtScene" v-model="callerIsVictim">
                <option value=""></option>
                <option value="True">Yes</option>
                <option value="False">No</option>
              </select>
              <small id="callerIsVictimError" class="form-text text-danger animated slideInUp" v-if="callerIsVictimError">{{callerIsVictimError}}</small>
            </div>
            <div class="col-md-4">
              <label for="emergencyType">Emergency Type</label>
              <select class="form-control" id="emergencyType" v-model="emergencyType">
                <option value=""></option>
                <option value="Critical">Critical</option>
                <option value="Very Critical">Very Critical</option>
              </select>
              <small id="emergencyTypeError" class="form-text text-danger animated slideInUp" v-if="emergencyTypeError">{{emergencyTypeError}}</small>
            </div>
          </div>  
        </div>
        <div class="form-group">
          <label for="note">Note</label>
          <textarea class="form-control" rows="5" id="note" v-model="note" placeholder="Call note..."></textarea>
        </div>
        <div class="row form-submit">
          <div class="col-md-12">
             <button type="button" class="btn btn-primary btn-block text-white btn-md" @click="proceedToCase" :class="{disabled: btnDisabled}">
              <div class="loader" v-if="loaderSwitch"></div>
              <span v-else>Proceed To Case 
                <i class="fa fa-fw fa-long-arrow-right"></i>
              </span>
            </button>
          </div>
          <div class="col-md-12">
            <button type="button" class="btn btn-primary btn-block text-white btn-md" @click="clearCall" v-if="!btnDisabled">
              Clear Call
            </button>
          </div>
        </div>  
      </form>
  </div>
</template>

<script>
import Emergency from '../services/Emergency'
import {LoaderMixin} from '../mixins/LoaderMixin'

export default {
  name: 'RecordCall',
  mixins: [LoaderMixin],
  data: () => ({
    msg: 'Welcome to RecordCall Component!',
    showMap: false,
    callerName: '',
    callerContact: '',
    liveAtScene: '',
    emergencyAddress: '',
    noOfInjured: '',
    callerIsVictim: '',
    emergencyType: '',
    note: '',
    recordSuccess: '',
    callerNameError: '',
    callerContactError: '',
    liveAtSceneError: '',
    emergencyAddressError: '',
    noOfInjuredError: '',
    callerIsVictimError: '',
    emergencyTypeError: '',
    error: ''
  }),
  methods: {
    controlMap (e) {
      e.preventDefault()
      if (!this.showMap) {
        this.showMap = true
        this.$refs.mapBtn.innerText = 'Close Map'
      } else {
        this.showMap = false
        this.$refs.mapBtn.innerText = 'Show Map'
      }
    },
    async proceedToCase (e) {
      e.preventDefault()
      this.btnDisabled = true
      this.loaderSwitch = true
      var go = true
      this.callerNameError = ''
      this.callerContactError = ''
      this.liveAtSceneError = ''
      this.emergencyAddressError = ''
      this.noOfInjuredError = ''
      this.callerIsVictimError = ''
      this.emergencyTypeError = ''
      var noOfInjured = parseInt(this.noOfInjured)
      if (this.callerName.length === 0) {
        this.callerNameError = 'Invalid Caller Name supplied'
        go = false
      }
      if (this.callerContact.length === 0) {
        this.callerContactError = 'Invalid Caller Contact supplied'
        go = false
      }
      if (this.liveAtScene.length === 0) {
        this.liveAtSceneError = 'Invalid option supplied for Live at Scene'
        go = false
      }
      if (this.emergencyAddress.length === 0) {
        this.emergencyAddressError = 'Invalid Emergency Address supplied'
        go = false
      }
      if (noOfInjured <= 0) {
        this.noOfInjuredError = 'Invalid Number of Injuired supplied'
        go = false
      }
      if (this.callerIsVictim.length < 1) {
        this.callerIsVictimError = 'Invalid option supplied for Caller is Victim supplied'
        go = false
      }
      if (this.emergencyType.length === 0) {
        this.emergencyTypeError = 'Invalid option supplied for Emergency Type supplied'
        go = false
      }
      if (go) {
        try {
          var response = await Emergency.recordCallCase({
            callerName: this.callerName,
            callerContact: this.callerContact,
            liveAtScene: this.liveAtScene,
            emergencyAddress: this.emergencyAddress,
            noOfInjured: this.noOfInjured,
            callerIsVictim: this.callerIsVictim,
            emergencyType: this.emergencyType,
            note: this.note
          })
          console.log(response)
          this.recordSuccess = response.data.success
          this.$store.dispatch('keepCurrentCase', response.data.callDetails)
          this.timeOut()
          this.$emit('reRunNumbers', true)
          setTimeout(() => {
            this.$router.push({name: 'CreateCase'})
          }, 500)
        } catch (error) {
          this.error = error.response.data.error
          this.timeOut()
        }
      } else {
        this.timeOut()
      }
    },
    clearCall (e) {
      e.preventDefault()
      this.clearInputs()
      this.recordSuccess = ''
    },
    clearInputs () {
      this.callerName = ''
      this.callerContact = ''
      this.liveAtScene = ''
      this.emergencyAddress = ''
      this.noOfInjured = ''
      this.callerIsVictim = ''
      this.emergencyType = ''
      this.note = ''
      this.callerNameError = ''
      this.callerContactError = ''
      this.liveAtSceneError = ''
      this.emergencyAddressError = ''
      this.noOfInjuredError = ''
      this.callerIsVictimError = ''
      this.emergencyTypeError = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .map {
    height: 300px;
    text-align: center;
    padding: 30px;
    background: #000;
    border-radius: 8px;
    margin-top: 8px;
  }
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
