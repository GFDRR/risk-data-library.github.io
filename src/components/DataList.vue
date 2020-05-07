<template>
  <span>
    <h2>Hazard Datasets</h2>
    <ul v-for="hazardEvent in hazardDataset" :key="hazardEvent.id">
      <li>
        <div>
          {{ hazardEvent.title }}
        </div>
      </li>
    </ul>
    <!-- <h2>Exposure Datasets</h2>
    <section id="exposure-datasets"></section>
    <h2>Vulnerability Datasets</h2>
    <section id="vulnerability-datasets"></section>
    <h2>Loss Datasets</h2>
    <section id="loss-datasets"></section> -->
  </span>
</template>

<script>
import siteData from '../../api/datasets.json';

const HAZARD = "hazard";
const EXPOSURE = "exposure";
const VOLUNERABILITY = "vulnerability";
const LOSS = "loss";

export default {
  name: 'DataList',
  data () {
    return {
      siteData: [],
      hazardDataset: [],
      exposureDataset: [],
      vulnerabilityDataset: [],
      lossDataset: []
    }
  },
  created () {
    this.siteData = JSON.parse(JSON.stringify(siteData.data));
    console.log("siteData.data-->", this.siteData);
    for (const key in this.siteData) {
      switch (key) {
        case HAZARD:
          this.hazardDataset.push(...siteData.data["hazard"])
          break;
        case EXPOSURE:
          this.exposureDataset.push(...siteData.data["exposure"])
          break;
        case VOLUNERABILITY:
          this.vulnerabilityDataset.push(...siteData.data["vulnerability"])
          break;
        case LOSS:
          this.lossDataset.push(...siteData.data["loss"])
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '_sass/main.scss';
h2 {
  font-family: $primary-font;
  font-size: $quaternary-font-size;
  font-weight: $secondary-font-weight;
  color: $purple-primary-font-color;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>