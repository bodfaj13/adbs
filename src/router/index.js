import Vue from 'vue'
import Router from 'vue-router'
import AdminLogin from '@/pages/AdminLogin'
import Dashboard from '@/pages/Dashboard'
import RecordCall from '@/components/RecordCall'
import Settings from '@/components/Settings'
import ActiveCases from '@/components/ActiveCases'
import ManageAmbulances from '@/components/ManageAmbulances'
import ManageDrivers from '@/components/ManageDrivers'
import store from '@/store/store'
import ForgotPassword from '@/pages/ForgotPassword'
import CreateCase from '@/pages/CreateCase'
import CreateDriver from '@/components/CreateDriver'
import CreateAmbulance from '@/components/CreateAmbulance'
import ViewCall from '@/pages/ViewCall'
import ViewEmergency from '@/pages/ViewEmergency'
import ViewCase from '@/pages/ViewCase'
import ViewAmbulance from '@/pages/ViewAmbulance'
import ViewDriver from '@/pages/ViewDriver'

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
      ],
      beforeEnter: (to, from, next) => {
        var isAuth = store.state.isAdminLoggedIn
        if (isAuth === false) {
          console.log('access denied!')
          next('/')
        }
        next()
      }
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
      path: '/view-driver',
      name: 'ViewDriver',
      component: ViewDriver
    },
    {
      path: 'manage-ambulances',
      name: 'ManageAmbulances',
      component: ManageAmbulances
    },
    {
      path: 'manage-driver',
      name: 'ManageDrivers',
      component: ManageDrivers
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    }
  ]
})
