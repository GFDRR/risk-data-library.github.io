$(document).ready(function() {
  if (!window.location.hash) {
    window.location.href = "/data";
  } else {
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

    const DATA_DETAILS_URL =
      "https://ddsurmhzkc.execute-api.ap-southeast-2.amazonaws.com/dev/" +
      schema +
      "/" +
      dataId;

    $("#data-details").append("<p id='loading-text' class='details-content'>Loading....</p>")

    $.get(DATA_DETAILS_URL, function(data) {
      $("#loading-text").remove();
      const HAZARD = 'hazard';
      const EXPOSURE = 'exposure';
      const LOSS = 'loss';
      const VULNERABILITY = 'vulnerability';

      // console.log("data---->", data[0][HAZARD]);
      
      // add units to intensity
      function renderHeader(data) {
        return (
          "<h1 class='dataDetails-title'>" +
          transformDataValue(data.dataset_name) +
          "</h1>" 
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
            return new Date(dataset[key]).toLocaleString("en-us", {
              year: "numeric",
              month: "short",
            });
          case "intensity_measure":
            if(Array.isArray(dataset[key])){
              let intensity_concat = [];
              if(dataset[key] && dataset[key].length > 0){
                dataset[key].forEach(function(intensity, idx){
                  intensity_concat.push(intensity + ' (' + dataset['unit'][idx] + ')' )
                })
              }
              return transformDataValue(intensity_concat.join(', '));
            }
            else {
              return transformDataValue(dataset[key]);
            }
          case "occurrence_probability":
            return transformDataValue(dataset[key].join(', '));
          case "analysis_metric":
            return (
              dataset[key] &&
              dataset[key]
                .replace("(", "")
                .replace(")", "")
                .split(",")
                .filter(function(data) {
                  return data.length > 0;
                })
                .join(", ")
            );
          // case "hazard":
          // case "exposure":
          // case "loss":
          // case "vulnerability":
          //   return createLinksToOtherDataTypes(key, dataset[key]);
          default:
            return transformDataValue(dataset[key]);
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
            displayKeyValue(key, data[0]) +
            "</p>" +
            "</div>"
          );
        }
        return "";
      });

      function buildDownloadLinks(downloadLink) {
        let links = '';
        for (var key in downloadLink) {
          links += "<li class='dataDetails-link-sub-container'><a" +
              " href='" + downloadLink[key] +
              "' download " +
              " target='_blank' " +
              " class='table-dialog-download-link reusable-font-regular'>" +
              " Download " + displayKey(key) +
              " </a></li>" ;
        }

        return links;
      }

      function displayKey(key) {
        switch (key) {
          case "year_developed":
            return "year".toUpperCase();
          default:
            return key.toUpperCase().replace("_", " ");
        }
      }

      function downloadData(data){
        return "<ul class='dataDetails-link-container'>" + buildDownloadLinks(data.download_link) + "</ul>"
      };

      // const test = createLinkForEachSchema(schema, dataPerSchema);


      function createLinkForEachSchema(schema, dataPerSchema) {
        console.log(schema, dataPerSchema);
        const matcher = {
          "hazard": "description",
          "exposure": "name",
          "loss": "name",
          "vulnerability": "f_reference"
        }
        let linksArray = [];
        // const props = ['description', 'f_reference', 'name'];
        let links = dataPerSchema.map(function(value){
          console.log("value-->", value['id']);
          if (value['id'] !== null) {
            const dataKey = matcher[schema];
            console.log(dataKey, value[dataKey]);
            console.log("address-->", "<a id='" + value['id'] + "' " + "href='./data-details#" + schema + "=" + value['id'] + "'>" + value[dataKey] + "</a>");
            return "<a href='/data-details#" + schema + "=" + value['id'] + "'>" + value[dataKey] + "</a>"
          }

          return 'Not Available';
          // for(var key in value[0]) {
          //   if(value[key] !== null) {
          //     console.log(key, value[key]);
          //   } else {
          //     return 'Not Available';
          //   }
          // }
          // props.every(function(prop){
          //   if (dataPerSchema.hasOwnProperty(prop)) {
          //     console.log("YEs!", prop);
          //   }
          // })
          
          return "<div>" + schema + "</div>"
        })
        // console.log("links-->", links);
        return links;
      }

      function linkedDatasets(data) {
        // console.log("data-->", data);
        for (var key in data) {
          switch (key) {
            case 'hazard':
            case 'exposure':
            case 'vulnerability':
            case 'loss':
              return createLinkForEachSchema(key, data[key]);
              // console.log('HERE!', data[key]);
              // hazardDatasets = siteData[HAZARD.dataset]
            // case EXPOSURE.dataset:
            //   exposureDatasets = siteData[EXPOSURE.dataset]
            //   break;
            // case VULNERABILITY.dataset:
            //   vulnerabilityDatasets = siteData[VULNERABILITY.dataset]
            //   break;
            // case LOSS.dataset:
            //   lossDatasets = siteData[LOSS.dataset]
            //   break;
            default:
              break;
          }
        }
      }

      $('p.dataDetails-list-right>a').click(function () {
        // window.location.href = '/data-details#exposure=164';
        // window.location.hash = '#exposure' + 164;
        console.log("CLICKED");
        window.location.reload();
        // return false;
      });

      $("#data-details").append(renderHeader(data[0])); 
      $("#data-details").append(downloadData(data[0])); 
      $("#data-details").append("<div class='dataDetails-content'>" + dataDetails.join('') + "<div class='dataDetails-list'>" + "<p class='dataDetails-list-left details-subtitle'>Linked Datasets</p>" + "<p class='dataDetails-list-right details-content'>" + linkedDatasets(data[0]) + "</p></div></div>"); 
    });
  }
});
