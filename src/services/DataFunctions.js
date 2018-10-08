import Api from './Api'

export default {
  getDriversNo () {
    return Api().get('getdriversno')
  },
  getDriverAvailbleForAssinging () {
    return Api().get('getdriversavilableforassining')
  },
  getAmbulanceNo () {
    return Api().get('getambulanceno')
  },
  getAmbulanceDetails () {
    return Api().get('getambulancedetails')
  },
  getTotalCallsNo () {
    return Api().get('gettotalcallno')
  },
  getTotalCasesNo () {
    return Api().get('gettotalcasesno')
  },
  getAvailableAmbulanceNo () {
    return Api().get('getavailableambulanceno')
  },
  getActiveEmergencyNo () {
    return Api().get('getactiveemergencyno')
  },
  getAvailableAmbulanceDetails () {
    return Api().get('getavailableambulancdetails')
  },
  getTotalCall () {
    return Api().get('gettotalcall')
  },
  getTotalCase () {
    return Api().get('gettotalcases')
  },
  getActiveEmergency () {
    return Api().get('getactiveambulance')
  },
  getAllDrivers () {
    return Api().get('getalldrivers')
  },
  getAllAmbulances () {
    return Api().get('getallambulances')
  }
}
