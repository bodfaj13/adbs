import Api from './Api'

export default {
  createAmbulance (credentials) {
    return Api().post('createambulance', credentials)
  }
}
