<template>
  <div>
      <h3>Active Cases</h3>  
      <hr>
      
      <div class="card mb-3">
          <div class="card-header">
          <i class="fa fa-table"></i> View Call Table  </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="viewSelect">Select views from <span class="badge badge-primary">{{totalLength}}</span> entries</label>
                  <select class="form-control" id="viewSelect" v-model="viewSelect">
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="search">Search by Caller Name</label>
                  <input type="email" class="form-control" id="search" aria-describedby="search" placeholder="" v-model="inputSearch">
                  
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Caller Name</th>
                    <th>Caller Contact</th>
                    <th>Live At Scene</th>
                    <th>Caller Is Victim</th>
                    <th>Emergency ID</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>#</th>
                    <th>Caller Name</th>
                    <th>Caller Contact</th>
                    <th>Live At Scene</th>
                    <th>Caller Is Victim</th>
                    <th>Emergency ID</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody v-if="totalActiveCases">
                  <template v-for="(activeCases, index, key) in filteredActiveCases">
                    <tr :key="key">
                      <th scope="row">{{index + 1}}</th>
                      <td>{{activeCases.callerName}}</td>
                      <td>{{activeCases.callerContact}}</td>
                      <td>{{activeCases.liveAtScene}}</td>
                      <td>{{activeCases.callerIsVictim}}</td>
                      <td>{{activeCases._id}}</td>
                      <td>{{activeCases.createdAt}}</td>
                      <td>
                        <button type="button" class="btn btn-primary btn-block text-white btn-md" @click="releaseCaseTrigger(index)" data-toggle="modal" data-target="#releaseModal">
                          Case Delivered
                        </button>
                      </td>
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

      <div class="modal fade" id="releaseModal" tabindex="-1" role="dialog" aria-labelledby="releaseModal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="releaseModalLabel">Case delivered successfully?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">Select "<b>Logout</b>" below if you are ready to end your current session.</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <a class="btn btn-primary" href="" @click="releaseCase(releaseCaseNo)" data-dismiss="modal">Proceed</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataFunctions from '../services/DataFunctions'
import Emergency from '../services/Emergency'

export default {
  name: 'ActiveCases',
  data: () => ({
    msg: 'Welcome to ActiveCases Component!',
    totalActiveCases: [],
    totalLength: '',
    currentView: [],
    noPages: '',
    viewSelect: 5,
    inputSearch: '',
    prevBtn: true,
    releaseSuccess: '',
    releaseCaseNo: ''
  }),
  methods: {
    async getActiveCases () {
      try {
        var response = await DataFunctions.getActiveEmergency()
        this.totalActiveCases = response.data.data
        this.totalLength = this.totalActiveCases.length
        if (this.totalLength > 5) {
          for (var i = 0; i < 5; i++) {
            this.currentView.push(this.totalActiveCases[i])
          }
        } else {
          for (var x = 0; x < this.totalLength; x++) {
            this.currentView.push(this.totalActiveCases[x])
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
          this.currentView.push(this.totalActiveCases[i])
        }
      } else {
        if (toSee > this.totalLength) {
          console.log('but now to see ' + this.totalLength)
          for (var y = toSeeing; y < this.totalLength; y++) {
            this.currentView.push(this.totalActiveCases[y])
          }
        } else {
          for (var x = toSeeing; x < toSee; x++) {
            this.currentView.push(this.totalActiveCases[x])
          }
        }
      }
    },
    doNothing (e) {
      e.preventDefault()
    },
    async releaseCase (no) {
      console.log(no)
      var caseNp = no
      var getCase = this.totalActiveCases[caseNp]
      try {
        const response = await Emergency.releaseCase({
          emergencyId: getCase._id,
          ambulanceId: getCase.ambulanceId
        })
        console.log(response)
        this.releaseSuccess = response.data.success
        this.getActiveCases()
        this.$emit('reRunNumbers', true)
      } catch (error) {
        this.error = error.response.data.error
        console.log(this.error)
      }
    },
    releaseCaseTrigger (no) {
      this.releaseCaseNo = no
      console.log(no)
    }
  },
  mounted () {
    this.getActiveCases()
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
        this.currentView.push(this.totalActiveCases[i])
      }
    }
  },
  computed: {
    filteredActiveCases: function () {
      return this.currentView.filter((calls) => {
        return calls.callerName.match(this.inputSearch)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media only screen and (max-width: 600px) {

  }
  @media only screen and (min-width: 600px) and (max-width: 992px) {

  }
  @media only screen and (min-width: 993px) {

  }
</style>
