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

  $("#hazard-datasets").append(
    "<p class='loading-text details-content'>Loading....</p>"
  );
  $("#exposure-datasets").append(
    "<p class='loading-text details-content'>Loading....</p>"
  );
  $("#loss-datasets").append(
    "<p class='loading-text details-content'>Loading....</p>"
  );
  $("#vulnerability-datasets").append(
    "<p class='loading-text details-content'>Loading....</p>"
  );

  const BASE_URL = "https://d3utuyt0gg.execute-api.ap-southeast-2.amazonaws.com/dev";

  $.get(BASE_URL+"/datasets", function (data) {
    let hazardDatasets = null;
    let exposureDatasets = null;
    let vulnerabilityDatasets = null;
    let lossDatasets = null;

    const siteData = JSON.parse(JSON.stringify(data));
    // need var here as IE11 doesn't support const/let for in loop
    for (var key in siteData) {
      switch (key) {
        case HAZARD:
          hazardDatasets = siteData[HAZARD]
          break;
        case EXPOSURE:
          exposureDatasets = siteData[EXPOSURE]
          break;
        case VULNERABILITY:
          vulnerabilityDatasets = siteData[VULNERABILITY]
          break;
        case LOSS:
          lossDatasets = siteData[LOSS]
          break;
        default:
          break;
      }
    } 

    function getHeadersFromData(dataset) {
      const keysFromDataset = Object.keys(dataset);
      
      const header = METADATA_FIELDS.map(function(key) {
          if (keysFromDataset.indexOf(key) !== -1) {
            return (
              "<th class='data-table-cell data-table-header'>" +
              key.toUpperCase().replace("_", " ") +
              "</th>"
            );
          }
        return "";
      });
      return "<tr class='data-table-header-container'>"
          + header.join('')
          + "<th class='data-table-cell'></th>"
          + "<th class='data-table-cell'></th>"
        + "</tr>"
    }

    function transformDataValue(data) {
      switch (data) {
        case "":
        case null:
          return "-";
        default:
          return data;
      }
    }

    function displayKeyValue(key, dataset) {
      switch (key) {
        case "year_developed":
          return new Date(dataset).toLocaleString("en-us", {
            year: "numeric",
            month: "short",
          });
        case "exposure_type":
          return dataset && dataset
            .replace("(", "")
            .replace(")", "")
            .split(",")
            .filter(function(data) {
              return data.length > 0;
            })
            .join(", ");
        default:
          return transformDataValue(dataset);
      }
    }



    function render(dataset, schema) {
      const keysFromDataset = Object.keys(dataset);

      const metadata = METADATA_FIELDS.map(function(key) {
        if (keysFromDataset.indexOf(key) !== -1) {
          return (
            "<td class='data-table-value data-table-cell'>" +
            displayKeyValue(key, dataset[key]) +
            "</td>"
          );
        }
        return "";
      });
      
      const downloadLink = BASE_URL+"/"+schema+"/"+dataset.id+"/"+"datasets?format=csv";

      return "<tr>"
          + metadata.join("")
          + "<td class='data-table-value data-table-cell'><a class='table-header-redirect data-table-value' href='/data-details#" + schema + "=" + dataset.id +"'" + "id='"+ dataset.id +"'>More→</a></td>"
          + "<td class='data-table-value data-table-cell'><a href='"+ downloadLink + "' download>"
          + "<img src='assets/images/download_icon.png' class='table-download-link'></a></td>"
        + "</tr>";
    }

    $("p.loading-text").remove();
    
    $("#hazard-datasets").append(getHeadersFromData(hazardDatasets[0]));

    $.each(hazardDatasets, function (key, hazardEvent){
      $("#hazard-datasets").append(render(hazardEvent, HAZARD));
    });

    $("#exposure-datasets").append(getHeadersFromData(exposureDatasets[0]));

    $.each(exposureDatasets, function (key, exposureEvent) {
      $("#exposure-datasets").append(render(exposureEvent, EXPOSURE));
    });

    $("#vulnerability-datasets").append(getHeadersFromData(vulnerabilityDatasets[0]));

    $.each(vulnerabilityDatasets, function (key, vulnerabilityEvent) {
      $("#vulnerability-datasets").append(
        render(vulnerabilityEvent, VULNERABILITY)
      );
    });

    $("#loss-datasets").append(getHeadersFromData(lossDatasets[0]));

    $.each(lossDatasets, function (key, lossEvent) {
      $("#loss-datasets").append(render(lossEvent, LOSS));
    });
  });
});
