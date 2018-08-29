<template>
    <section v-if="modalActive">
        <div class="cover" v-on:click="resetModal"></div>
        <form>
            <h4 class="text-center">
                <span v-if="employee.id">Edit</span>
                <span v-if="!employee.id">Register</span>
                Employee
            </h4>
            <div class="form-inputs">
                <div class="errors" v-if="errors.length">
                    <div class="badge badge-pill badge-danger">Please fix these errors</div>
                    <div v-for="error in errors">{{error}}</div>
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input v-model="employee.name" ref="employeeName" type="text" class="form-control" id="name" placeholder="Enter name...">
                </div>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input v-model="employee.title" type="text" class="form-control" id="title" placeholder="Enter title...">
                </div>
                <div class="form-group">
                    <label for="hireDate">Hire Date</label>
                    <input v-model="employee.hireDate" type="text" class="form-control" id="hireDate" placeholder="Enter hire date...">
                </div>
                <input v-model="employee.id" type="hidden" />
                <input v-model="employee.key" type="hidden" />
            </div>
            <button type="submit" class="btn btn-primary" v-on:click.prevent.stop="saveModal">
                <span v-if="employee.id">Save</span>
                <span v-if="!employee.id">Register Employee</span>
            </button>
            <div class="btn btn-outline-danger" v-on:click="resetModal">Cancel</div>
        </form>
    </section>
</template>

<script>
export default {
  name: 'Employees',
  data () {
    return {
      modalActive: false,
      errors: [],
      employee: {
          id: 0,
          name: '',
          title: '',
          hireDate: '',
          key: ''
      }
    }
  },
  created() {
      eventBus.$on('launchModal', (data) => {
          if (data) {
            if (data.id) this.employee.id = data.id;
            if (data.name) this.employee.name = data.name;
            if (data.title) this.employee.title = data.title;
            if (data.hireDate) this.employee.hireDate = data.hireDate;
            if (data['.key']) this.employee.key = data['.key'];
          }
          this.modalActive = true;
          this.$nextTick(() => this.$refs.employeeName.focus());
      })
  },
  methods: {
    saveModal() {
        var employee = {};
        if (this.employee) {
            if (this.employee.id) employee.id = this.employee.id;
            if (this.employee.name) employee.name = this.employee.name.trim();
            if (this.employee.title) employee.title = this.employee.title.trim();
            if (this.employee.hireDate) employee.hireDate = this.employee.hireDate.trim();
            if (this.employee.key) employee.key = this.employee.key.trim();
        }

        // Input Validation
        let validation = this.validateInput(employee);
        if (!validation) this.errors = [];
        else {
            this.errors = validation;
            return;
        }
        eventBus.$emit('saveModal', employee)
        this.resetModal();
    },
    resetModal() {
      this.modalActive = false;
      this.employee.id = 0;
      this.employee.name = '';
      this.employee.title = '';
      this.employee.hireDate = '';
      this.employee.key = '';
    },
    validateInput(employee) {
        let errors = [];
        let stringLimit = 40;
        let dateLimit = 25;
        if (!employee) errors.push('Unknown Error');
        
        if (!employee.name || !employee.name.trim()) errors.push('Name is Required');
        if (employee.name && employee.name.length && employee.name.length > stringLimit) errors.push('Name is Longer Than ' + stringLimit + ' Characters');

        if (!employee.title || !employee.title.trim()) errors.push('Title is Required');
        if (employee.title && employee.title.length && employee.title.length > stringLimit) errors.push('Title is Longer Than ' + stringLimit + ' Characters');

        if (!employee.hireDate || !employee.hireDate.trim()) errors.push('Hire Date is Required');
        if (employee.hireDate && employee.hireDate.length && employee.hireDate.length > dateLimit) errors.push('Hire Date is Longer Than ' + dateLimit + ' Characters');

        if (!errors.length) return false;
        return errors;
    }
  }
}
</script>

<style lang="scss" scoped>
section {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.cover {
    width: 100%;
    height: 100%;
    background: #222;
    opacity: 0.8;
}
form {
    width: 400px;
    margin: 50px auto;
    background: #fff;
    padding: 30px;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -200px;
}
.form-inputs {
    padding-bottom: 10px;
}
.errors {
    text-align: center;
    padding-bottom: 10px;
}
</style>
