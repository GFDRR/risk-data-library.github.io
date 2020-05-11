$(document).ready(function () {
  const HAZARD = "hazard";
  const EXPOSURE = "exposure";
  const VULNERABILITY = "vulnerability";
  const LOSS = "loss";

  $.get("/api/datasets.json", function (res) {
    let hazardDatasets = null;
    let exposureDatasets = null;
    let vulnerabilityDatasets = null;
    let lossDatasets = null;

    const siteData = JSON.parse(JSON.stringify(res.data));
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

    function appendData(event) {
      return `
      <li>
        <div class="table">
          <div class="table-header">
            <h3 class="table-header-title">
              ${event.title}
            </h3>
            <div>
              <a class="table-header-redirect">More information →</a>
              <a href="${event.fileLink}" download class="table-header-download">Download ↓</a>
            </div>
          </div>
          <div class="table-body">
            <div class="table-cell">
              <p class="table-value">${event.hazard}</p>
              <p class="table-subtitle">Hazard</p>
            </div>
            <div class="table-cell">
              <p class="table-value">${event.region}</p>
              <p class="table-subtitle">Region</p>
            </div>
            <div class="table-cell">
              <p class="table-value">${event.created}</p>
              <p class="table-subtitle">Created</p>
            </div>
            <div class="table-cell">
              <p class="table-value">${event.publisher}</p>
              <p class="table-subtitle">Publisher</p>
            </div>
             <div class="table-cell">
              <p class="table-value">${event.licence}</p>
              <p class="table-subtitle">Licence</p>
            </div>
            <div class="table-cell">
              <p class="table-value">${event.fileType}</p>
              <p class="table-subtitle">File type</p>
            </div>
            <div class="table-cell">
              <p class="table-value">${event.fileSize}</p>
              <p class="table-subtitle">File size</p>
            </div>
          </div>
        </div>
      </li>`
    }

    $.each(hazardDatasets, function (key, hazardEvent){
      $("#hazard-datasets").append(appendData(hazardEvent));
    });

    $.each(exposureDatasets, function (key, exposureEvent) {
      $("#exposure-datasets").append(appendData(exposureEvent));
    });

    $.each(vulnerabilityDatasets, function (key, vulnerabilityEvent) {
      $("#vulnerability-datasets").append(appendData(vulnerabilityEvent));
    });

    $.each(lossDatasets, function (key, lossEvent) {
      $("#loss-datasets").append(appendData(lossEvent));
    });
  });
});