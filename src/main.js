import Vue from 'vue';
import DataList from "./components/DataList";

Vue.component("dataList", DataList);

const vm = new Vue({
  el: "#app",
});