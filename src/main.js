import Vue from 'vue';
// import axios from "axios";
// import App from "./App";
import DataList from "./components/DataList";

Vue.component("dataList", DataList);
// Vue.component("app", {
//   template: DataList,
//   data: function () {
//     return {
//       message: this.results
//     }
//   }})

// const url =
//   "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR";

const vm = new Vue({
  el: "#app",
});

// const vm = new Vue({
//   el: "#app",
//   data: {
//     results: [],
//   },
//   mounted() {
//     axios.get(url).then((response) => {
//       console.log("response-->", response);

//       this.results = response.data;
//     });
//   },
//   render: (h) =>
//     h(DataList, {
//       props: {
//         data: "New header text",
//       },
//     }),
//   // render: (h) => h(App),
// });