$(document).ready(function () {
  const HAZARD = "hazard";
  const EXPOSURE = "exposure";
  const VULNERABILITY = "vulnerability";
  const LOSS = "loss";

  $.get("https://d3utuyt0gg.execute-api.ap-southeast-2.amazonaws.com/dev/datasets", function (data) {
    let hazardDatasets = null;
    let exposureDatasets = null;
    let vulnerabilityDatasets = null;
    let lossDatasets = null;

    const siteData = JSON.parse(JSON.stringify(data));
    for (const key in siteData) {
      switch (key) {
        case HAZARD:
          hazardDatasets = siteData[`${HAZARD}`]
          break;
        case EXPOSURE:
          exposureDatasets = siteData[`${EXPOSURE}`]
          break;
        case VULNERABILITY:
          vulnerabilityDatasets = siteData[`${VULNERABILITY}`]
          break;
        case LOSS:
          lossDatasets = siteData[`${LOSS}`]
          break;
        default:
          break;
      }
    } 

    function render(dataset) {
      const metadata = Object.keys(dataset).map(function(key) {
        if (dataset[key]) {
          var metadata_fields = [
            "id",
            "project",
            "year_developed",
            "developed_by",
            "license",
            "data_purpose",
            "notes",
            "version",
            // "dataset",
            // "dataset_name",
            "location",
            // "extent",
            "analysis_type",
            "exposure_type",
            "hazard_type",
            "process_type",
            "intensity_measure",
            "occurrence_probability"
          ];
          if (metadata_fields.includes(key)) {
            return `<div class="table-cell">
              <p class="table-value">${
                (key == 'year_developed') ? (new Date(dataset[key])).toLocaleString('en-us', { year: 'numeric', month: 'short' }) : dataset[key]
              }</p>
              <p class="table-subtitle">${(key[0].toUpperCase() + key.slice(1)).replace('_', ' ')}</p>
            </div>
            `;
          }
        }
        return ''
      });
      return `
      <li>
        <div class="table">
          <div class="table-header">
            <h3 class="table-header-title">
              ${dataset.dataset || dataset.dataset_name}
            </h3>
            <div>
              <a class="table-header-redirect">More information →</a>
              <a href="${dataset.fileLink}" download class="table-header-download">Download ↓</a>
            </div>
          </div>
          <div class="table-body">
            ${metadata.join('')}
          </div>
        </div>
      </li>`
    }

    $.each(hazardDatasets, function (key, hazardEvent){
      $("#hazard-datasets").append(render(hazardEvent));
    });

    $.each(exposureDatasets, function (key, exposureEvent) {
      $("#exposure-datasets").append(render(exposureEvent));
    });

    $.each(vulnerabilityDatasets, function (key, vulnerabilityEvent) {
      $("#vulnerability-datasets").append(render(vulnerabilityEvent));
    });

    $.each(lossDatasets, function (key, lossEvent) {
      $("#loss-datasets").append(render(lossEvent));
    });
  });
});
