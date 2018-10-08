import DataFunctions from '../services/DataFunctions'

export const DataMixin = {
  data: () => ({
    totalCalls: '',
    totalCases: '',
    availableAmb: '',
    activeEmg: '',
    drivers: [],
    driversLength: 0,
    ambulances: [],
    ambulancesLength: 0,
    totaldrivers: '',
    tableDrivers: [],
    tableAmb: []
  }),
  methods: {
    async getTotalCallsNo () {
      try {
        var response = await DataFunctions.getTotalCallsNo()
        this.totalCalls = response.data.data
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async getDriverNo () {
      try {
        var response = await DataFunctions.getDriverAvailbleForAssinging()
        this.totaldrivers = response.data.data
        this.totaldrivers = this.totaldrivers.length
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async getTotalCasesNo () {
      try {
        var response = await DataFunctions.getTotalCasesNo()
        this.totalCases = response.data.data
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async getAvailableAmbulanceNo () {
      try {
        var response = await DataFunctions.getAvailableAmbulanceNo()
        this.availableAmb = response.data.data
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async getActiveEmergencyNo () {
      try {
        var response = await DataFunctions.getActiveEmergencyNo()
        this.activeEmg = response.data.data
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async getDriverAvailbleForAssinging () {
      try {
        var response = await DataFunctions.getDriverAvailbleForAssinging()
        this.drivers = response.data.data
        this.driversLength = this.drivers.length
        console.log(this.driversLength)
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async getAvailableAmbulanceDetails () {
      try {
        var response = await DataFunctions.getAvailableAmbulanceDetails()
        this.ambulances = response.data.data
        this.$store.dispatch('keepAvailAmb', response.data.data)
        // console.log(this.ambulances)
        this.ambulancesLength = this.ambulances.length
        // console.log(this.ambulancesLength)
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async getTableDrivers () {
      try {
        var response = await DataFunctions.getAllDrivers()
        this.tableDrivers = response.data.data
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async getTableAmbulances () {
      try {
        var response = await DataFunctions.getAllAmbulances()
        this.tableAmb = response.data.data
      } catch (error) {
        console.log(error.response.data)
      }
    }
  }
}
