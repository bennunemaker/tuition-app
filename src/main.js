// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueFire from "vuefire";
import App from "./App";

Vue.use(VueFire);

Vue.config.productionTip = false;

window.eventBus = new Vue();

/* eslint-disable no-new */
var vm = new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
