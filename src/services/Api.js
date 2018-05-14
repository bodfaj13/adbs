import axios from 'axios'
import store from '@/store/store'

export default () => {
  return axios.create({
    baseURL: process.env.PORT ? '' : 'http://localhost:3000/api/',
    headers: {'x-auth': store.state.token}
  })
}
