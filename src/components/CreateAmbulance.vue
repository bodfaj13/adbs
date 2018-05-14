<template>
  <div>
    <div class="row">
      <div class="col-md-12">
          <h3>Create Ambulance</h3>
      </div>
    </div>   
    <hr>
    <div class="alert alert-success animated slideInDown" v-if="createSuccess">
        <strong>Creation Successful</strong> 
        <br>
        Ambulance was created successfully!
      </div>
    <form>
        <div class="form-group">
          <div class="form-row">
            <div class="col-md-6">
              <label for="callerName">Vechile  Name</label>
              <input class="form-control" id="vechileName" type="text" aria-describedby="" placeholder="" v-model="vechileName">
              <small id="callerNameError" class="form-text text-danger animated slideInUp" v-if="vechileNameError">{{vechileNameError}}</small>
            </div>
            <div class="col-md-6">
              <label for="engineNumber">Vechile Model</label>
              <input class="form-control" id="vechileModel" type="text" aria-describedby="" placeholder="" v-model="vechileModel">
              <small id="engineNumberError" class="form-text text-danger animated slideInUp" v-if="vechileModelError">{{vechileModelError}}</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="form-row">
            <!-- <div class="col-md-6">
              <label for="engineNumber">Engine Number</label>
              <input class="form-control" id="engineNumber" type="text" aria-describedby="" placeholder="" v-model="engineNumber">
              <small id="engineNumberError" class="form-text text-danger animated slideInUp" v-if="engineNumberError">{{engineNumberError}}</small>
            </div> -->
            <div class="col-md-12">
              <label for="plateNumber">Plate Number</label>
              <input class="form-control" id="plateNumber" type="text" aria-describedby="" placeholder="" v-model="plateNumber">
              <small id="plateNumberError" class="form-text text-danger animated slideInUp" v-if="plateNumberError">{{plateNumberError}}</small>
            </div>
          </div>
        </div> 
        <div class="form-group">
          <div class="form-row">
            <div class="col-md-12">
              <label for="assignDriver">Assign Available Driver</label>
              <select class="form-control" id="assignDriver" v-model="assignedDriver" v-if="driversLength">
                <option value=""></option>
                 <template v-for="(staff, key) in drivers">
                  <option :value="staff._id" :key="key">{{staff.fullName}}</option>
                </template>
              </select> 
              <div v-else>
                None Available  <button class="btn btn-primary" @click="goToAddDriver"> <i class="fa fa-fw fa-plus"></i> Add Driver</button>
              </div>
              <small id="assignDriverError" class="form-text text-danger animated slideInUp" v-if="assignedDriverError">{{assignedDriverError}}</small>
            </div>
          </div>
        </div>
        <!-- <div class="form-group">
          <div class="form-row">
            <div class="col-md-12">
              <label for="assignedParamedic">Assign Available Paramedic</label>
              <select multiple class="form-control" id="assignedParamedic" v-model="assignedParamedic">
                 
              </select> 
              <small id="assignedParamedicError" class="form-text text-danger animated slideInUp" v-if="assignedParamedicError">{{assignedParamedicError}}</small>
            </div>
          </div>
        </div> -->
        <div class="row form-submit">
          <div class="col-md-12">
             <button type="button" class="btn btn-primary btn-block text-white btn-md" @click="createAmbulance" :class="{disabled: btnDisabled}">
              <div class="loader" v-if="loaderSwitch"></div>
              <span v-else>Register Ambulance 
                <i class="fa fa-fw fa-long-arrow-right"></i>
              </span>
            </button>
          </div>
          <div class="col-md-12">
            <button type="button" class="btn btn-primary btn-block text-white btn-md" @click="cancel" v-if="!btnDisabled">
              Cancel
            </button>
          </div>
        </div>
      </form>
  </div>
</template>

<script>
import {LoaderMixin} from '../mixins/LoaderMixin'
import Functions from '../services/Functions'
import {DataMixin} from '../mixins/DataMixin'

export default {
  name: 'CreateAmbulance',
  mixins: [LoaderMixin, DataMixin],
  data: () => ({
    msg: 'Welcome to Create Ambulance Component!',
    createSuccess: '',
    vechileName: '',
    vechileModel: '',
    assignedDriver: '',
    // assignedParamedic: '',
    plateNumber: '',
    vechileNameError: '',
    vechileModelError: '',
    plateNumberError: '',
    assignedDriverError: '',
    // assignedParamedicError: '',
    error: ''
  }),
  methods: {
    cancel (e) {
      e.preventDefault()
      this.clearInputs()
      this.createSuccess = ''
    },
    async createAmbulance (e) {
      e.preventDefault()
      this.btnDisabled = true
      this.loaderSwitch = true
      var go = true
      this.vechileNameError = ''
      this.vechileModelError = ''
      this.assignedDriverError = ''
      this.engineNumberError = ''
      this.plateNumberError = ''
      this.createSuccess = ''
      if (this.vechileName.length === 0) {
        this.vechileNameError = 'Invalid Vechile Name supplied'
        go = false
      }
      if (this.vechileModel.length === 0) {
        this.vechileModelError = 'Invalid Vechile Model supplied'
        go = false
      }
      if (this.assignedDriver.length === 0) {
        this.assignedDriverError = 'Invalid Assign Driver supplied'
        go = false
      }
      if (this.plateNumber.length === 0) {
        this.plateNumberError = 'Invalid Driver Name supplied'
        go = false
      }
      if (go) {
        try {
          const response = await Functions.createAmbulance({
            vechileName: this.vechileName,
            vechileModel: this.vechileModel,
            plateNumber: this.plateNumber,
            assignedDriver: this.assignedDriver
          })
          console.log(response)
          this.createSuccess = response.data.success
          this.clearInputs()
          this.timeOut()
          this.reRun()
          this.$emit('reRunNumbers', true)
        } catch (error) {
          this.error = error.response.data.error
          this.plateNumberError = error.response.data.error_PlateNumber
          this.timeOut()
        }
      } else {
        this.timeOut()
      }
    },
    goToAddDriver (e) {
      e.preventDefault()
      this.$router.push({name: 'CreateDriver'})
    },
    clearInputs () {
      this.vechileName = ''
      this.vechileModel = ''
      this.assignedDriver = []
      this.plateNumber = ''
      this.vechileNameError = ''
      this.vechileModelError = ''
      this.plateNumberError = ''
      this.assignedDriverError = ''
    },
    reRun () {
      this.getDriverAvailbleForAssinging()
    }
  },
  mounted () {
    this.reRun()
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
