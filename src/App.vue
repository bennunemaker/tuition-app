<template>
  <div id="app">
    <Header/>
    <Employees/>
    <Modal/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Employees from './components/Employees'
import Modal from './components/Modal'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Employees,
    Modal,
    Footer
  }
}
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
body {
  background: #f1f1f1;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 800px;
  margin: 20px auto;
  background: #fff;
  padding: 0 20px;
}
</style>
