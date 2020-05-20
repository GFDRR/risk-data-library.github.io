$(document).ready(function() {
  if (!window.location.hash) {
    window.location.href = "/data";
  } else {
    const hashDetails = window.location.hash.substr(1).split("=");
    const schema = `${hashDetails[0].charAt(0).toUpperCase()}${hashDetails[0].slice(1)}`;
    $("h1.main-title")
      .html(`${schema} Dataset`)
      .addClass("dataDetails-title");

    const METADATA_FIELDS = [
      "dataset_name", 
      "project_name", 
      "location", 
      "hazard_type",
      "exposure_type", 
      "process_type",  
      "analysis_type",
      "function_type",
      "mode_type", 
      "analysis_metric",
      "units",
      "loss_model_description",
      "developed_by", 
      "year_developed", 
      "license", 
      "intensity_measure", 
      "occurrence_probability", 
      "purpose", 
      "notes", 
      "data_spatial_reference", 
      "data_version", 
      "extent"
    ];

    const DATA_DETAILS_URL = "https://d3utuyt0gg.execute-api.ap-southeast-2.amazonaws.com/dev/" +
    hashDetails[0] + "/" + hashDetails[1];

    $("#data-details").append("<p id='loading-text' class='details-content'>Loading....</p>")

    $.get(DATA_DETAILS_URL, function(data) {
      console.log(data);
      $("#loading-text").remove();

      function renderHeader(data) {
        return (
          "<h2 class='dataDetails-subtitle'>" +
          data.dataset_name +
          "</h1>" +
          "<p class='datasetDetails-project'>" +
          data.project_name +
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
         return key == "year_developed"
           ? new Date(dataset).toLocaleString("en-us", {
               year: "numeric",
               month: "short",
             })
           : transformDataValue(dataset);
       }

      const dataDetails = METADATA_FIELDS.map(function(key) {
        if (Object.keys(data[0]).includes(key)) {
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

      $("#data-details").append(renderHeader(data[0])); 
      $("#data-details").append("<div class='dataDetails-content'>" + dataDetails.join('') + "</div>"); 
    });
  }
});
