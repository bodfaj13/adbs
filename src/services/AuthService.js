import Api from './Api'

export default {
  adminLogin (credentials) {
    return Api().post('adminlogin', credentials)
  },
  registerDriver (credentials) {
    return Api().post('registerdriver', credentials)
  },
  adminPassUpdate (credentials) {
    return Api().post('adminpassupdate', credentials)
  }
}
