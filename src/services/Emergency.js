import Api from './Api'

export default {
  recordCallCase (credentials) {
    return Api().post('recordcallcase', credentials)
  },
  createCase (credentials) {
    return Api().post('createcase', credentials)
  },
  releaseCase (credentials) {
    return Api().post('releasecase', credentials)
  }
}
