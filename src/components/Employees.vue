<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col">
                    <h1>Employees</h1>
                </div>
                <div class="col">
                    <a href="#" class="float-right badge badge-pill badge-primary" v-on:click.prevent="launchModal()">Register Employee</a>
                </div>
            </div>
            <div class="row resultsModule">
                <div class="col" v-if="!loading && !invalidConfig">
                    <table v-if="employees.length">
                        <tr>
                            <th class="id">ID</th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Hire Date</th>
                            <th class="actions">Actions</th>
                        </tr>
                        <tr v-for="employee in employees" :key="employee.id">
                            <td class="id">{{employee.id}}</td>
                            <td><a href="#" v-on:click.prevent="launchModal(employee)">{{employee.name}}</a></td>
                            <td>{{employee.title}}</td>
                            <td>{{employee.hireDate}}</td>
                            <td class="actions">
                                <a href="#" class="badge badge-success" v-on:click.prevent="launchModal(employee)">edit</a>
                                <a href="#" class="badge badge-danger" v-on:click.prevent="deleteEmployee(employee)">delete</a>
                            </td>
                        </tr>
                    </table>
                    <div class="alert alert-warning" v-if="!employees.length">
                        No Employees Yet!
                    </div>
                </div>
                <div class="col loadingModule" v-if="loading && !invalidConfig"></div>
                <div class="col invalidModule" v-if="invalidConfig">
                    <p>Please copy "config.example.js" to "config.js" and set config values.</p>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button class="btn btn-primary" v-on:click="launchModal()">Register Employee</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Firebase from 'firebase/app'
import 'firebase/database'
import Config from '../../config'

let employeesRef = null;
let invalidConfig = false;

if (Config && Config.firebasePath) {
    let params = {
        apiKey: "AIzaSyDZCK8rw1XSKn_Ajm1zrwCyCHAbEs1eHOw",
        authDomain: Config.firebasePath + ".firebaseapp.com",
        databaseURL: "https://" + Config.firebasePath + ".firebaseio.com",
        projectId: Config.firebasePath,
        storageBucket: Config.firebasePath + ".appspot.com",
        messagingSenderId: "447846438512"
    };

    let app = Firebase.initializeApp(params);
    let db = app.database();
    employeesRef = db.ref('employees');
} else {
    invalidConfig = true;
}

export default {
  name: 'Employees',
  data() {
    return {
      loading: true,
      error: false,
      invalidConfig: invalidConfig
    }
  },
  firebase: {
    employees: {
      source: employeesRef,
      readyCallback: function() {
        this.loading = false;
      }
    }
  },
  created() {
      eventBus.$on('saveModal', (employee) => {
          if (!employee) return;
          
          // Update
          if (employee.id) {
            employeesRef.child(employee.key).set(employee);
            return;
          }

          // Create
          employeesRef.push({
              id: this.getNextEmployeeId(),
              name: employee.name,
              title: employee.title,
              hireDate: employee.hireDate
          });
      })
  },
  methods: {
    deleteEmployee(employee) {
        employeesRef.child(employee['.key']).remove();
    },
    launchModal(data) {
        eventBus.$emit('launchModal', data);
    },
    getNextEmployeeId() {
        let nextEmployeeId = 1;
        if (!this.employees || !this.employees.length) return nextEmployeeId;
        for (let i = 0; i < this.employees.length; i++) {
            if (this.employees[i].id >= nextEmployeeId) nextEmployeeId = this.employees[i].id+1;
        }
        return nextEmployeeId;
    }
  }
}
</script>

<style lang="scss" scoped>
section {
    min-height: 200px;
    padding-bottom: 20px;
    h1 {
        font-size: 22px;
        line-height: 30px;
        font-weight: bold;
        padding-bottom: 10px;
    }
    a.ctaLink {
        display: block;
        font-weight: normal;
    }
    .resultsModule {
        min-height: 100px;
    }
    .loadingModule {
        background: url('../assets/loading.gif') center center no-repeat;
        background-size: 147px 97px;
    }
    table {
        margin-bottom: 20px;
        th, td {
            padding-right: 30px;
            width: 195px;
            &.id {
                width: 40px;
            }
            &.actions {
                color: #aaa;
                width: 92px;
                padding-right: 0;
            }
        }
    }
}
</style>