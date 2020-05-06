import Vue from 'vue';
import HelloWorld from "./components/HelloWorld";

Vue.component("helloWorld", HelloWorld);

new Vue({
  el: "#app",
});