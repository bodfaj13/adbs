import Vue from 'vue'
import Router from 'vue-router'
import AdminLogin from '@/pages/AdminLogin'
import Dashboard from '@/pages/Dashboard'
import RecordCall from '@/components/RecordCall'
import Settings from '@/components/Settings'
import ActiveCases from '@/components/ActiveCases'
// import store from '@/store/store'
import ForgotPassword from '@/pages/ForgotPassword'
import CreateCase from '@/pages/CreateCase'
import CreateDriver from '@/components/CreateDriver'
import CreateAmbulance from '@/components/CreateAmbulance'
import ViewCall from '@/pages/ViewCall'
import ViewEmergency from '@/pages/ViewEmergency'
import ViewCase from '@/pages/ViewCase'
import ViewAmbulance from '@/pages/ViewAmbulance'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/dashboard',
      // name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'RecordCall',
          component: RecordCall
        },
        {
          path: 'active-cases',
          name: 'ActiveCases',
          component: ActiveCases
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Settings
        },
        {
          path: 'create-driver',
          name: 'CreateDriver',
          component: CreateDriver
        },
        {
          path: 'create-ambulance',
          name: 'CreateAmbulance',
          component: CreateAmbulance
        }
      ]
    // beforeenter
    },
    {
      path: '/emergency-case',
      name: 'CreateCase',
      component: CreateCase
    },
    {
      path: '/view-call',
      name: 'ViewCall',
      component: ViewCall
    },
    {
      path: '/view-emergency',
      name: 'ViewEmergency',
      component: ViewEmergency
    },
    {
      path: '/view-case',
      name: 'ViewCase',
      component: ViewCase
    },
    {
      path: '/view-ambulance',
      name: 'ViewAmbulance',
      component: ViewAmbulance
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    }
  ]
})
