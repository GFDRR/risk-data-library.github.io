$(document).ready(function () {
  const HAZARD = "hazard";
  const EXPOSURE = "exposure";
  const VULNERABILITY = "vulnerability";
  const LOSS = "loss";
  const METADATA_FIELDS = [
    // "id",
    "dataset_name",
    "location",
    "hazard_type",
    "analysis_type",
    "exposure_type",
    "function_type",
    "developed_by",
    "year_developed",
    "license"
  ];

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

    function getHeadersFromData(dataset) {
      const keysFromDataset = Object.keys(dataset);
      
      const header = METADATA_FIELDS.map(function(key) {
        console.log(key, keysFromDataset.includes(key));
        

          if (keysFromDataset.includes(key)) {
            return `<th class="data-table-cell data-table-header">${key
              .toUpperCase()
              .replace("_", " ")}</th>`;
          }
        return "";
      });
      return `
        <tr class="data-table-header-container">
          ${header.join('')}
          <th class="data-table-cell"></th>
          <th class="data-table-cell"></th>
        </tr>
      `
    }

    function transformDataValue(data) {
      switch (data) {
        case '':
          return '-';
        default:
          return data;
      }
    }


    function render(dataset) {
      const keysFromDataset = Object.keys(dataset);

      const metadata = METADATA_FIELDS.map(function(key) {
        if (keysFromDataset.includes(key)) {
          return `
            <td class="data-table-value data-table-cell">${
              key == "year_developed"
                ? new Date(dataset[key]).toLocaleString("en-us", {
                    year: "numeric",
                    month: "short",
                  })
                : transformDataValue(dataset[key])
            }</td>

          `;
        }
        return "";
      });
      
      return `
        <tr>
          ${metadata.join("")}
          <td class="data-table-value data-table-cell"><a class="table-header-redirect data-table-value" href="#" id="${dataset.id}">More→</a></td>
          <td class="data-table-value data-table-cell"><a href="/${
            dataset.id
          }" download><img src="/assets/images/download_icon.png" class="table-download-link"></a></td>
        </tr>
      `;
    }
    

    $("#hazard-datasets").append(getHeadersFromData(hazardDatasets[0]));

    $.each(hazardDatasets, function (key, hazardEvent){
      $("#hazard-datasets").append(render(hazardEvent));
    });

    $("#exposure-datasets").append(getHeadersFromData(exposureDatasets[0]));

    $.each(exposureDatasets, function (key, exposureEvent) {
      $("#exposure-datasets").append(render(exposureEvent));
    });

    $("#vulnerability-datasets").append(getHeadersFromData(vulnerabilityDatasets[0]));

    $.each(vulnerabilityDatasets, function (key, vulnerabilityEvent) {
      $("#vulnerability-datasets").append(
        render(vulnerabilityEvent)
      );
    });

    $("#loss-datasets").append(getHeadersFromData(lossDatasets[0]));

    $.each(lossDatasets, function (key, lossEvent) {
      $("#loss-datasets").append(render(lossEvent));
    });

  });
});
