import Api from './Api'

export default {
  sendContact (credentials) {
    return Api().post('usersendcontact', credentials)
  }
}
