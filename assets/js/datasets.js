$(document).ready(function () {
  const HAZARD = {
    query: "event_set_id",
    dataset: 'hazard'
  }
  const EXPOSURE = {
    query: "exposure",
    dataset: 'exposure'
  };
  const VULNERABILITY = {
    query: "vulnerability",
    dataset: 'vulnerability'
  };

  const LOSS = {
    query: "loss",
    dataset: 'loss'
  };
  

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



  function update(url) {
    $.get(url, function (data) {
      let hazardDatasets = null;
      let exposureDatasets = null;
      let vulnerabilityDatasets = null;
      let lossDatasets = null;
      
      const siteData = JSON.parse(JSON.stringify(data));
      // need var here as IE11 doesn't support const/let for in loop
      for (var key in siteData) {
        switch (key) {
          case HAZARD.dataset:
            hazardDatasets = siteData[HAZARD.dataset]
            break;
          case EXPOSURE.dataset:
            exposureDatasets = siteData[EXPOSURE.dataset]
            break;
          case VULNERABILITY.dataset:
            vulnerabilityDatasets = siteData[VULNERABILITY.dataset]
            break;
          case LOSS.dataset:
            lossDatasets = siteData[LOSS.dataset]
            break;
          default:
            break;
        }
      } 

      function displayKey(key) {
        switch (key) {
          case "year_developed":
            return "year".toUpperCase();
          default:
            return key.toUpperCase().replace("_", " ");
        }
      }

  
      function getHeadersFromData(dataset) {
        const keysFromDataset = dataset? Object.keys(dataset) : '';
        
        const header = METADATA_FIELDS.map(function(key) {
            if (keysFromDataset.indexOf(key) !== -1) {
              return (
                "<th class='data-table-th data-table-header'>" +
                displayKey(key) +
                "</th>"
              );
            }
          return "";
        });
        return "<tr class='data-table-header-container'>"
            + header.join('')
            + "<th class='data-table-th'></th>"
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
    
      function displayKeyValue(schema, key, dataset) {
        switch (key) {
          case "dataset_name":
            return  "<a class='table-header-redirect data-table-value' href='./data-details#" +
                      schema +
                      "=" +
                      (schema != 'hazard' ? dataset.id : dataset.event_set_id) +
                      "'" +
                      "id='" +
                      dataset.id +
                      "'>" + dataset[key]+ "</a>";
          case "year_developed":
            return new Date(dataset[key]).toLocaleString("en-us", {
              year: "numeric",
            });
          case "exposure_type":
            if (dataset[key] === null || dataset[key] == '') {
              return '-'
            }
            return dataset[key]
              .replace("(", "")
              .replace(")", "")
              .split(",")
              .filter(function(data) {
                return data.length > 0;
              })
              .join(", ");
          default:
            return transformDataValue(dataset[key]);
        }
      }
  
  
      const METADATA_FIELDS = [
        "dataset_name", "location", "hazard_type", "analysis_type",
        "exposure_type", "function_type", "developed_by", "year_developed",
        "license"
      ];

      function buildDownloadLinks(downloadLink) {
        let links = '';
        for (var key in downloadLink) {
          links += "<a" +
              " href='" + downloadLink[key] +
              "' download " +
              " target='_blank' " +
              " class='table-dialog-download-link reusable-font-regular'>" +
              " Download " + displayKey(key) +
              " </a>" ;
        }

        return links;
      }


      function render(dataset, schema) {
        const keysFromDataset = Object.keys(dataset);
        const metadata = METADATA_FIELDS.map(function(key) {
          if (keysFromDataset.indexOf(key) !== -1) {
            return (
              "<td class='data-table-value data-table-cell'>" +
              displayKeyValue(schema, key, dataset) +
              "</td>"
            );
          }
          return "";
        });
        
        return (
          "<tr>" +
          metadata.join("") +
          "<td class='data-table-value data-table-image'>" +
          "<div class='table-dialog'>" +
          "<div class='table-dialog-text' id='" + schema + dataset.id + "'>"+
              buildDownloadLinks(dataset.download_link) +
           "</div>"+
          "<svg viewBox = '0 0 500 500' xmlns='http://www.w3.org/2000/svg'><circle style='fill: rgb(216, 216, 216);' cx='248.984' cy='251.416' r='249.057' transform='matrix(0.995483, 0, 0, 0.998119, 1.932797, -1.415413)'/><path d='M 169.12 -30.323 H 310.441 L 310.441 -106.792 L 439.724 6.309 L 310.441 119.41 L 310.441 42.941 H 169.12 V -30.323 Z' style='fill: rgb(255, 255, 255);' transform='matrix(-0.003056, 0.999995, -0.999995, -0.003056, 255.851608, -48.003548)' bx: shape='arrow 169.12 -106.792 270.604 226.202 73.264 129.283 0 1@48b5a99f'/></svg ></div></td>" +
          "</tr>"
        );
      }

      $(document).on('click', 'td.data-table-image', function () { 
        $('td.data-table-image>div>div').removeClass('show');
        $(this).find('div').toggleClass('show');
      })

      $(document).click(function(event) {
        const target = event.target;
        if (!$(target).is('td.data-table-image') && !$(target).parents().is('td.data-table-image')) {
          $('td.data-table-image>div>div').removeClass('show');
        }
      });
  
      $("p.loading-text").remove();
      
      $("#hazard-datasets").append(getHeadersFromData(hazardDatasets[0]));
  
      $.each(hazardDatasets, function (key, hazardEvent){
        $("#hazard-datasets").append(render(hazardEvent, HAZARD.dataset));
      });
  
      $("#exposure-datasets").append(getHeadersFromData(exposureDatasets[0]));
  
      $.each(exposureDatasets, function (key, exposureEvent) {
        $("#exposure-datasets").append(render(exposureEvent, EXPOSURE.dataset));
      });
  
      $("#vulnerability-datasets").append(getHeadersFromData(vulnerabilityDatasets[0]));
  
      $.each(vulnerabilityDatasets, function (key, vulnerabilityEvent) {
        $("#vulnerability-datasets").append(
          render(vulnerabilityEvent, VULNERABILITY.dataset)
        );
      });
  
      $("#loss-datasets").append(getHeadersFromData(lossDatasets[0]));
  
      $.each(lossDatasets, function (key, lossEvent) {
        $("#loss-datasets").append(render(lossEvent, LOSS.dataset));
      });
    });
  }

  const BASE_URL = "https://ddsurmhzkc.execute-api.ap-southeast-2.amazonaws.com/dev";
  var GET_SAMPLE_DATASET_URL = BASE_URL + '/datasets?';
  $.get("./api/samples.json", function (res) {
    const eventSetIds = res[HAZARD.dataset].map(function(json) {
      return json.id;
    }).join(",");

    const exposureIds = res[EXPOSURE.dataset].map(function(json) {
      return json.id;
    }).join(",");

    const vulnerabilityIds = res[VULNERABILITY.dataset].map(function(json) {
      return json.id;
    }).join(",");

    const lossIds = res[LOSS.dataset].map(function(json) {
      return json.id;
    }).join(",");
    
    GET_SAMPLE_DATASET_URL = 
    [
      BASE_URL,
      '/datasets?',
      HAZARD.query, '=', eventSetIds, '&',
      EXPOSURE.dataset, '=', exposureIds, '&',
      LOSS.dataset, '=', lossIds, '&',
      VULNERABILITY.dataset, '=', vulnerabilityIds
    ].join('')

    update(GET_SAMPLE_DATASET_URL);
  });
});
