$(document).ready(function () {
  $.get("/api/datasets.json", function (res) {
    $("#hazard-datasets").append(`<pre>${JSON.stringify(res.data.hazard, null, 2)}</pre>`);
    $("#exposure-datasets").append(`<pre>${JSON.stringify(res.data.exposure, null, 2)}</pre>`);
    $("#vulnerability-datasets").append(`<pre>${JSON.stringify(res.data.vulnerability, null, 2)}</pre>`);
    $("#loss-datasets").append(`<pre>${JSON.stringify(res.data.loss, null, 2)}</pre>`);
  });
});