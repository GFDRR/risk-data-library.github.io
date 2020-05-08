<template>
  <span>
    <h2>Hazard Datasets</h2>
    <ul v-for="hazardEvent in hazardDatasets" :key="hazardEvent.id">
      <li>
        <div class="table">
          <div class="table-header">
            <h3 class="table-header-title">
              {{ hazardEvent.title }}
            </h3>
            <div>
              <a class="table-header-redirect">More infomation →</a>
              <a :href="hazardEvent.fileLink" download class="table-header-download">Download ↓</a>
            </div>
          </div>
          <div class="table-body">
            <div class="table-cell">
              <p class="table-value">{{hazardEvent.hazard}}</p>
              <p class="table-subtitle">Hazard</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{hazardEvent.region}}</p>
              <p class="table-subtitle">Region</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{hazardEvent.created}}</p>
              <p class="table-subtitle">Created</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{hazardEvent.publisher}}</p>
              <p class="table-subtitle">Publisher</p>
            </div>
             <div class="table-cell">
              <p class="table-value">{{hazardEvent.licence}}</p>
              <p class="table-subtitle">Licence</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{hazardEvent.fileType}}</p>
              <p class="table-subtitle">File type</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{hazardEvent.fileSize}}</p>
              <p class="table-subtitle">File size</p>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <h2>Exposure datasets</h2>
    <ul v-for="exposureEvent in exposureDatasets" :key="exposureEvent.id">
      <li>
        <div class="table">
          <div class="table-header">
            <h3 class="table-header-title">
              {{ exposureEvent.title }}
            </h3>
            <div>
              <a class="table-header-redirect">More infomation →</a>
              <a :href="exposureEvent.fileLink" download class="table-header-download">Download ↓</a>
            </div>
          </div>
          <div class="table-body">
            <div class="table-cell">
              <p class="table-value">{{exposureEvent.hazard}}</p>
              <p class="table-subtitle">Hazard</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{exposureEvent.region}}</p>
              <p class="table-subtitle">Region</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{exposureEvent.created}}</p>
              <p class="table-subtitle">Created</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{exposureEvent.publisher}}</p>
              <p class="table-subtitle">Publisher</p>
            </div>
             <div class="table-cell">
              <p class="table-value">{{exposureEvent.licence}}</p>
              <p class="table-subtitle">Licence</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{exposureEvent.fileType}}</p>
              <p class="table-subtitle">File type</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{exposureEvent.fileSize}}</p>
              <p class="table-subtitle">File size</p>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <h2>Vulnerability datasets</h2>
    <ul v-for="vulnerabilityEvent in vulnerabilityDatasets" :key="vulnerabilityEvent.id">
      <li>
        <div class="table">
          <div class="table-header">
            <h3 class="table-header-title">
              {{ vulnerabilityEvent.title }}
            </h3>
            <div>
              <a class="table-header-redirect">More infomation →</a>
              <a :href="vulnerabilityEvent.fileLink" download class="table-header-download">Download ↓</a>
            </div>
          </div>
          <div class="table-body">
            <div class="table-cell">
              <p class="table-value">{{vulnerabilityEvent.hazard}}</p>
              <p class="table-subtitle">Hazard</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{vulnerabilityEvent.region}}</p>
              <p class="table-subtitle">Region</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{vulnerabilityEvent.created}}</p>
              <p class="table-subtitle">Created</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{vulnerabilityEvent.publisher}}</p>
              <p class="table-subtitle">Publisher</p>
            </div>
             <div class="table-cell">
              <p class="table-value">{{vulnerabilityEvent.licence}}</p>
              <p class="table-subtitle">Licence</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{vulnerabilityEvent.fileType}}</p>
              <p class="table-subtitle">File type</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{vulnerabilityEvent.fileSize}}</p>
              <p class="table-subtitle">File size</p>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <h2>Loss datasets</h2>
    <ul v-for="lossDatasetsEvent in lossDatasets" :key="lossDatasetsEvent.id">
      <li>
        <div class="table">
          <div class="table-header">
            <h3 class="table-header-title">
              {{ lossDatasetsEvent.title }}
            </h3>
            <div>
              <a class="table-header-redirect">More infomation →</a>
              <a :href="lossDatasetsEvent.fileLink" download class="table-header-download">Download ↓</a>
            </div>
          </div>
          <div class="table-body">
            <div class="table-cell">
              <p class="table-value">{{lossDatasetsEvent.hazard}}</p>
              <p class="table-subtitle">Hazard</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{lossDatasetsEvent.region}}</p>
              <p class="table-subtitle">Region</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{lossDatasetsEvent.created}}</p>
              <p class="table-subtitle">Created</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{lossDatasetsEvent.publisher}}</p>
              <p class="table-subtitle">Publisher</p>
            </div>
             <div class="table-cell">
              <p class="table-value">{{lossDatasetsEvent.licence}}</p>
              <p class="table-subtitle">Licence</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{lossDatasetsEvent.fileType}}</p>
              <p class="table-subtitle">File type</p>
            </div>
            <div class="table-cell">
              <p class="table-value">{{lossDatasetsEvent.fileSize}}</p>
              <p class="table-subtitle">File size</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
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
      hazardDatasets: [],
      exposureDatasets: [],
      vulnerabilityDatasets: [],
      lossDatasets: []
    }
  },
  created () {
    this.siteData = JSON.parse(JSON.stringify(siteData.data));
    for (const key in this.siteData) {
      switch (key) {
        case HAZARD:
          this.hazardDatasets.push(...siteData.data["hazard"])
          break;
        case EXPOSURE:
          this.exposureDatasets.push(...siteData.data["exposure"])
          break;
        case VOLUNERABILITY:
          this.vulnerabilityDatasets.push(...siteData.data["vulnerability"])
          break;
        case LOSS:
          this.lossDatasets.push(...siteData.data["loss"])
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
  padding-bottom: 57px;
  padding-top: 91px;
}

h3 {
  font-family: $primary-font;
  font-size: $primary-font-size;
  font-weight: bold;
  color: $dark-secondary-font-color;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.table {
  background-color: $light-grey-background;
  padding: 13px 19px 19px;
  margin-bottom: 23px;
}

.table-header, .table-body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.table-header {
  border-bottom: 1px solid $divider-lines;
}

.table-header-redirect {
  font-weight: $secondary-font-weight;
  color: $grey-secondary-font-color;
  margin-right: 48px;
}

.table-header-download, .table-value, .table-subtitle, .table-header-redirect {
  font-family: $secondary-font;
  font-size: $small-font-size;
}

.table-cell {
  padding-top: 21px;
}

.table-header-download {
  font-weight: $secondary-font-weight;
  color: $purple-tertiary-font-color;
}

.table-value, .table-subtitle  {
  font-weight: $normal-font-weight;
}

.table-value {
  color: $dark-secondary-font-color;
}

.table-subtitle {
  color: $grey-tertiary-font-color;
}


</style>