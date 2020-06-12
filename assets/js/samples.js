$(document).ready(function () {
  const HAZARD = "hazard";
  const EXPOSURE = "exposure";
  const VULNERABILITY = "vulnerability";
  const LOSS = "loss";

   $("#samples_hazard").append(
     "<p id='loading-text' class='details-content'>Loading....</p>"
   );
   $("#samples_exposure").append(
     "<p id='loading-text' class='details-content'>Loading....</p>"
   );
   $("#samples_vulnerability").append(
     "<p id='loading-text' class='details-content'>Loading....</p>"
   );
   $("#samples_loss").append(
     "<p id='loading-text' class='details-content'>Loading....</p>"
   );
  
  $.get("/api/samples.json", function (requestedData) {
    const hazardIds = requestedData[HAZARD].map(function(requestedData) {
      return requestedData.id;
    }).join(",");

    const exposureIds = requestedData[EXPOSURE].map(function(requestedData) {
      return requestedData.id;
    }).join(",");

    const vulnerabilityIds = requestedData[VULNERABILITY].map(function(requestedData) {
      return requestedData.id;
    }).join(",");

    const lossIds = requestedData[LOSS].map(function(requestedData) {
      return requestedData.id;
    }).join(",");

    const BASE_URL = "https://d3utuyt0gg.execute-api.ap-southeast-2.amazonaws.com/dev"
    const SAMPLE_BASE_URL = BASE_URL + "/datasets/samples?";
    const GET_SAMPLE_DATASET_URL =
      SAMPLE_BASE_URL +
      HAZARD +
      "=" +
      hazardIds +
      "&" +
      EXPOSURE +
      "=" +
      exposureIds +
      "&" +
      LOSS +
      "=" +
      lossIds +
      "&" +
      VULNERABILITY +
      "=" +
      vulnerabilityIds;
  
    $.get(GET_SAMPLE_DATASET_URL, function(receivedSampleDataset) {
      
      function mergedSampleAndRequestData(requestData, receivedSampleData) {
        let mergedData = [];
        for (var k in receivedSampleData) {
          for (var j in requestData) {
            const sample = receivedSampleData[k];
            const request = requestData[j];

            if (sample.id === request.id) {
              mergedData.push({
                id: sample.id,
                dataset_name: sample.dataset_name,
                description: request.description,
                value: request.value,
                schema: request.schema,
                download_link: sample.download_link
              });
            }
          }
        }
        return mergedData;
      }

      const mergedHazardData = mergedSampleAndRequestData(
        requestedData[HAZARD],
        receivedSampleDataset[HAZARD]
      );

      const mergedExposureData = mergedSampleAndRequestData(
        requestedData[EXPOSURE],
        receivedSampleDataset[EXPOSURE]
      );

      const mergedLossData = mergedSampleAndRequestData(
        requestedData[LOSS],
        receivedSampleDataset[LOSS]
      );

      const mergedVulnerabilityData = mergedSampleAndRequestData(
        requestedData[VULNERABILITY],
        receivedSampleDataset[VULNERABILITY]
      );
      
      function displaySampleDatasets(dataPerSchema){
        return dataPerSchema.map(function(eachData) {
          return (
            "<li>" +
            "<p class='datasets-dataset-title'>" +
            eachData.dataset_name +
            "</p>" +
            "<p class='datasets-dataset-content paragraph-padding-bottom'>" +
            eachData.description +
            "</p>" +
            "<p class='datasets-dataset-content'>" +
            eachData.value +
            "</p>" +
            "<div class='datasets-link-container'>"+
            "<a href='" +
            eachData.download_link +
            "' download target='_blank' class='link'>" +
            "Download " +
            " dataset" +
            "</a>" +
            "</div>" +
            "</li>"
          );
        });
      }

      $("p#loading-text").remove();
      $("#samples_hazard").append(displaySampleDatasets(mergedHazardData));
      $("#samples_exposure").append(displaySampleDatasets(mergedExposureData));
      $("#samples_vulnerability").append(displaySampleDatasets(mergedVulnerabilityData));
      $("#samples_loss").append(displaySampleDatasets(mergedLossData));

    });
  });
});