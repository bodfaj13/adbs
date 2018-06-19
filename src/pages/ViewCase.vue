<template>
  <div class="content">
    <DashboardNav></DashboardNav>
    <div class="content-wrapper">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <h3>View Cases</h3>
          </div>
        </div>  
        <hr>

        <!-- <code>query: {{ query }}</code> -->
        <div class="card mb-3">
          <div class="card-header">
          <i class="fa fa-table"></i> View Cases Table  </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="viewSelect">Select views from <span class="badge badge-primary">{{totalLength}}</span> entries</label>
                  <select class="form-control" id="viewSelect" v-model="viewSelect">
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="search">Search by Emergency</label>
                  <input type="email" class="form-control" id="search" aria-describedby="search" placeholder="" v-model="inputSearch">
                  
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Emergency Address</th>
                    <th>Emergency Type</th>
                    <th>No of injured</th>
                    <th>Ambulance ID</th>
                    <th>Active</th>
                    <th>Note</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>#</th>
                    <th>Emergency Address</th>
                    <th>Emergency Type</th>
                    <th>No of injured</th>
                    <th>Ambulance ID</th>
                    <th>Active</th>
                    <th>Note</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </tfoot>
                <tbody v-if="totalCases">
                  <template v-for="(cases, index) in filteredCases">
                    <tr>
                      <th scope="row">{{index + 1}}</th>
                      <td>{{cases.emergencyAddress}}</td>
                      <td>{{cases.emergencyType}}</td>
                      <td>{{cases.noOfInjured}}</td>
                      <td>{{cases.ambulanceId}}</td>
                      <td>{{cases.active}}</td>
                      <td>{{cases.note}}</td>
                      <td>{{cases.createdAt}}</td>
                      <td>{{cases.updatedAt}}</td>
                    </tr>
                  </template>
                </tbody>
                <tbody v-else>
                  <tr class="table-secondary">
                    <td colspan="6">
                      <p class="text-center">There is no data</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <!-- <li class="page-item"><a class="page-link" @click="doNothing" :class="{disabled: prevBtn}">Previous</a></li> -->
                <template  v-for="(pages, key) in noPages">
                  <li class="page-item" :key="key"><a class="page-link" @click="getCurrentView(pages)">{{pages}}</a></li>
                  
                </template>
                <!-- <li class="page-item"><a class="page-link" @click="doNothing">Next</a></li> -->
              </ul>
            </nav>
          </div>
        <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
      </div>

      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import DashboardNav from '../components/DashboardNav'
import Footer from '../components/Footer'
import DataFunctions from '../services/DataFunctions'

export default {
  name: 'ViewCall',
  data: () => ({
    msg: 'Welcome to ViewCall Component!',
    totalCases: [],
    totalLength: '',
    currentView: [],
    noPages: '',
    viewSelect: 10,
    inputSearch: '',
    prevBtn: true
  }),
  methods: {
    async getTotalCase () {
      try {
        var response = await DataFunctions.getTotalCase()
        this.totalCases = response.data.data
        console.log(this.totalCases)
        this.totalLength = this.totalCases.length
        if (this.totalLength > 10) {
          for (var i = 0; i < 10; i++) {
            this.currentView.push(this.totalCases[i])
          }
        } else {
          for (var x = 0; x < this.totalLength; x++) {
            this.currentView.push(this.totalCases[x])
          }
        }
      } catch (error) {
        console.log(error.response.data)
      }
    },
    calPag () {
      var total = this.totalLength
      var div = this.viewSelect
      var noPages = Math.ceil(total / div)
      this.noPages = noPages
      console.log(noPages)
    },
    getCurrentView (no) {
      var toSee = no * this.viewSelect
      var toSeeing = toSee - this.viewSelect
      console.log('to seeing ' + toSeeing)
      console.log('to see ' + toSee)
      this.currentView = []
      if (toSeeing === 0) {
        for (var i = 0; i < this.viewSelect; i++) {
          this.currentView.push(this.totalCases[i])
        }
      } else {
        if (toSee > this.totalLength) {
          console.log('but now to see ' + this.totalLength)
          for (var y = toSeeing; y < this.totalLength; y++) {
            this.currentView.push(this.totalCases[y])
          }
        } else {
          for (var x = toSeeing; x < toSee; x++) {
            this.currentView.push(this.totalCases[x])
          }
        }
      }
    },
    doNothing (e) {
      e.preventDefault()
    }
  },
  components: {
    DashboardNav,
    Footer
  },
  mounted () {
    this.getTotalCase()
    // this.calPag()
  },
  updated () {
    this.calPag()
  },
  watch: {
    currentView (val) {
      this.currentView = val
      console.log(this.currentView)
    },
    viewSelect (val) {
      this.viewSelect = val
      console.log(this.viewSelect)
      this.currentView = []
      for (var i = 0; i < this.viewSelect; i++) {
        this.currentView.push(this.totalCases[i])
      }
    }
  },
  computed: {
    filteredCases: function () {
      return this.currentView.filter((cases) => {
        return cases.emergencyAddress.match(this.inputSearch)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-wrapper {
    margin-top: 50px;
  }
  .container-fluid {
    margin-bottom: 100px;
  }
  label {
      display: inline-block;
      margin-bottom: .5rem;
  }
  @media only screen and (max-width: 600px) {

  }

  @media only screen and (min-width: 600px) and (max-width: 992px) {

  }
  @media only screen and (min-width: 993px) {

  }
</style>
