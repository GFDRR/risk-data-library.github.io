$(document).ready(function () {
  $.get("/api/samples.json", function (data) {
    for (let index = 0; index < data.data.length; index++) {
      const element = data.data[index];

      function render(data) {
        return "<li>"
          + "<h4>" + data.title + "</h4>"
          + "<p>" + data.description + "</p>"
          + "<a href='" + data.download_link + "' download>"
          + "Download " + data.schema + " dataset"
          + " " + data.file_size
          + "</a>"  
        + "</li>"
      }
      $("#samples").append(render(element));
    }
  });
});