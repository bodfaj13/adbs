<template>
  <div class="content">
    <DashboardNav></DashboardNav>
    <div class="content-wrapper">
      <div class="container-fluid">
        <!-- <div class="alert alert-success animated slideInDown" >
          <strong>Update Successful</strong> 
          <br>
          Here goes the shit
        </div> -->

        <div class="row">
          <div class="col-md-12">
            <h3>Create Emergency Case</h3>
          </div>
        </div>  
        <hr>

        <div class="row">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">
                <div class="row">
                  <div class="col-md-8">
                    <h5>Call ID: </h5>
                  </div>
                  <div class="col-md-4 text-right">
                    <button class="btn btn-primary">Show Call Details</button>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label for="noNeeded">No of Needed Ambulance(s)</label>
                  <input type="text" class="form-control" id="noNeeded" value="0" disabled/>
                </div>
                <div class="form-group">
                  <label for="noNeeded">No of Selected Ambulance(s)</label>
                  <input type="text" class="form-control" id="noSelected" value="0" disabled/>
                </div>
                <hr>
                <table class="table table-hover">
                  <tbody>
                    <tr>
                      <th scope="row">Caller Name</th>
                      <td>{{}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Caller Contact</th>
                      <td>{{}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Live At Scene</th>
                      <td>{{}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Emergency Address</th>
                      <td>{{}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Caller Is Victim</th>
                      <td>{{}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Emergency Type</th>
                      <td>{{}}</td>
                    </tr>
                    <tr>
                      <th scope="row">No Of Injured</th>
                      <td>{{}}</td>
                    </tr>
                    <tr>
                      <th scope="row">No Of Injured</th>
                      <td>{{}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Note</th>
                      <td>{{}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer text-muted">
                <div class="row">
                  <div class="col-md-12">
                    <button class="btn btn-primary" style="width: 100%">Moblise Case <i class="fa fa-plus"></i></button> 
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <div class="card-header">
                <h5>Avaliable Ambulances <span class="badge badge-success">4</span></h5>
              </div>
              <div class="card-body">
                <h4 class="card-title">Special title treatment</h4>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
              <div class="card-footer text-muted">
                Pick from pool of available ambulances
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- Footer -->
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import DashboardNav from '../components/DashboardNav'
import Footer from '../components/Footer'
import {DataMixin} from '../mixins/DataMixin'
import {LoaderMixin} from '../mixins/LoaderMixin'

export default {
  name: 'CreateCase',
  mixins: [DataMixin, LoaderMixin],
  data: () => ({
    msg: 'Welcome to CreateCase Page!'
  }),
  components: {
    DashboardNav,
    Footer
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
  @media only screen and (max-width: 600px) {

  }

  @media only screen and (min-width: 600px) and (max-width: 992px) {

  }
  @media only screen and (min-width: 993px) {

  }
</style>
