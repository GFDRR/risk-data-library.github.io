$(document).ready(function() {
  if (!window.location.hash) {
    window.location.href = "/data";
  } else {
    const BASE_URL =
      "https://d3utuyt0gg.execute-api.ap-southeast-2.amazonaws.com/dev";
    const METADATA_FIELDS = [
      "dataset_name", 
      "project_name", 
      "location", 
      "hazard_type",
      "exposure_type", 
      "process_type",  
      "analysis_type",
      "function_type",
      "model_type", 
      "analysis_metric",
      "units",
      "loss_model_description",
      "developed_by", 
      "year_developed", 
      "license", 
      "intensity_measure", 
      "occurrence_probability", 
      "data_purpose", 
      "notes", 
      "data_spatial_reference", 
      "data_version", 
      "extent"
    ];

    const hashDetails = window.location.hash.substr(1).split("=");
    const schema = hashDetails[0];
    const dataId = hashDetails[1];
    const riskType = schema.charAt(0).toUpperCase() + schema.slice(1);
    $("h1.main-title")
      .html(riskType + " Dataset")
      .addClass("dataDetails-title");


    const DATA_DETAILS_URL =
      "https://d3utuyt0gg.execute-api.ap-southeast-2.amazonaws.com/dev/" +
      schema +
      "/" +
      dataId;

    $("#data-details").append("<p id='loading-text' class='details-content'>Loading....</p>")

    $.get(DATA_DETAILS_URL, function(data) {
      $("#loading-text").remove();

      function renderHeader(data) {
        return (
          "<h2 class='dataDetails-subtitle'>" +
          transformDataValue(data.dataset_name) +
          "</h1>" +
          "<p class='datasetDetails-project'>" +
          transformDataValue(data.project_name) +
          "</p>"
        );
      }
     
      function transformKey(key) {
        let convertedKeyArray = [];
        key.split("_").forEach(function(word, index) {
          if (index === 0) {
            convertedKeyArray.push(word[0].toUpperCase() + word.slice(1));
          } else {
            convertedKeyArray.push(word);
          }
        });
        return convertedKeyArray.join(" ");
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
          case "analysis_metric":
            return (
              dataset &&
              dataset
                .replace("(", "")
                .replace(")", "")
                .split(",")
                .filter(function(data) {
                  return data.length > 0;
                })
                .join(", ")
            );
          default:
            return transformDataValue(dataset);
        }
      }

      const dataDetails = METADATA_FIELDS.map(function(key) {
        if (Object.keys(data[0]).indexOf(key) !== -1) {
          return (
            "<div class='dataDetails-list'>" +
            "<p class='dataDetails-list-left details-subtitle'>" +
            transformKey(key) +
            "</p>" +
            "<p class='dataDetails-list-right details-content'>" +
            displayKeyValue(key, data[0][key]) +
            "</p>" +
            "</div>"
          );
        }
        return "";
      });


      function downloadData(data){
        const downloadLink = BASE_URL+"/"+schema+"/"+data.id+"/"+"datasets?format=csv";
        return "<a href='" + downloadLink + "' download class='dataDetails-download-link'>Download <span>CSV</span></a>";
      };

      $("#data-details").append(renderHeader(data[0])); 
      $("#data-details").append(downloadData(data[0])); 
      $("#data-details").append("<div class='dataDetails-content'>" + dataDetails.join('') + "</div>"); 
    });
  }
});
