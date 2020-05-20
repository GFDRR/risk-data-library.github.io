$(document).ready(function() {
  if (!window.location.hash) {
    window.location.href = "/data";
  } else {
    const hashDetails = window.location.hash.substr(1).split("=");
    const schema = `${hashDetails[0].charAt(0).toUpperCase()}${hashDetails[0].slice(1)}`;
    $("h1.main-title").html(`${schema} Dataset`).addClass('dataDetails-title');
    const DATA_DETAILS_URL = `https://d3utuyt0gg.execute-api.ap-southeast-2.amazonaws.com/dev/${hashDetails[0]}/${hashDetails[1]}`;
    const METADATA_FIELDS = [
    'dataset_name', 
    'project_name', 
    'location', 
    'hazard_type',
    'exposure_type', 
    'process_type',  
    'analysis_type',
    'function_type',
    'mode_type', 
    'analysis_metric',
    'units',
    'loss_model_description',
    'developed_by', 
    'year_developed', 
    'license', 
    'intensity_measure', 
    'occurrence_probability', 
    'purpose', 
    'notes', 
    'data_spatial_reference', 
    'data_version', 
    'extent'
  ];

  

    $.get(DATA_DETAILS_URL, function(data) {
      console.log(data);
      $("#data-details").append(`
      <h1>${data[0].dataset_name}</h1>

      `); 

      function transformKey(key) {
        const keyArray = key.split("_");
        const firstWord = `${keyArray.join(" ")[0].toUpperCase()}${keyArray[0].slice(1)}`
        console.log(keyArray);

        keyArray.map(function(eachKey, index){
          
        });
        
        
        // console.log(keyArray.slice(0, 1));
        
        // return `${keyArray.join(" ")[0].toUpperCase()}${keyArray[0].slice(1)} ${keyArray.splice(1)}`;
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


      const eachData = data[0];

      const keysFromData = Object.keys(eachData);
      const dataDetails = METADATA_FIELDS.map(function(key) {
        if (keysFromData.includes(key)) {
          return `
            <div class="dataDetails-content">
              <p class="dataDetails-content-left details-subtitle">${transformKey(key)}</p>
              <p class="dataDetails-content-right details-content">${
                eachData[key] && eachData[key].length > 0
                  ? eachData[key]
                  : transformDataValue(eachData[key])
              }</p>
            </div>
          `;
        }
        return '';
      });

      $("#data-details").append(`
      <div>${dataDetails.join('')}</div>

      `); 
    });
  }
});
