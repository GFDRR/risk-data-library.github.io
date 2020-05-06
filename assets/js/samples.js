$(document).ready(function () {
  $.get("/api/samples.json", function (data) {
    for (let index = 0; index < data.data.length; index++) {
      const element = data.data[index];
      $("#samples").append(`
        <li>
          <h4>${element.title}</h4>
          <p>${element.description}</p>
          <a href="${element.download_link}" download>
            Download ${element.schema} dataset
            ${element.file_size}
          </a>  
        </li>`);
    }
  });
});