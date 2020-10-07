# The Risk Data Library Project Website

## Developer Notes
### Run the repo locally

1. Navigate to the root of the repository
2. Run `docker-compose up --build` and/or `docker-compose up`(if no structure changes) to build docker image
3. Follow the instructions in the Terminal and go to `http://0.0.0.0:4000` to see the pages

Note: 
- `localhost` doesn't render data from the backend.
- Need to support **IE11**, some ES6 functions or syntax cannot be used. Refer to this table for compatibility: https://kangax.github.io/compat-table/es6/ 
- If website doesn't updating during development, remove `_site` and `sass-cache` and restart the server
- Jekyll doesn't support hot reload, need to restart server for javascript changes

---
---

## User Notes
### To Display Image block in the future

1. Remove `hidden` class from the parent div in the schema & dashboard page
2. For example

``` html
From
<div class="image-container hidden component-individual data-table-margin-bottom">

To
<div class="image-container component-individual data-table-margin-bottom">`
```
---

### To add new columns in the data page tables

NOTE: Make sure the column you are looking to expose on the UI present in the API response i.e. from `datasets_service.py` in `rdl-infra` project.

Add the new attribute you're trying to expose on the data table to METADATA_FIELDS Arrray in `assets > js > datasets.js`

Example 

FROM: 
``` js
	const METADATA_FIELDS = [
        "dataset_name", "location", "hazard_type", "analysis_type",
        "exposure_type", "function_type", "developed_by", "year_developed",
        "license"
	  ];
```

TO: to include hazard type as the last column
```js
	const METADATA_FIELDS = [
        "dataset_name", "location", "hazard_type", "analysis_type",
        "exposure_type", "function_type", "developed_by", "year_developed",
        "license", "hazard_type"
	];
```

---

### To Display extra rows for sponsoring organisation logos and names
Remove `hidden` class from the parent div (i.e. `<div class="logos-container hidden">`) in the project page

Existing structure:
```html
 <div class="logos-container hidden">
      <figure class="individual-logo-container">
        <a href="actual-organisation-link" class="link" title="title-of-organisation" target="_blank">
          <img src="location-to-the-image"  class="logo-image">
        </a> 
        <figcaption class="reusable-font-regular">
          Single-column wide description text can span multiple lines as required.
        </figcaption> 
      </figure>
      <figure class="individual-logo-container">
        <a href="actual-organisation-link" class="link" title="title-of-organisation" target="_blank">
          <img src="location-to-the-image"  class="logo-image">
        </a>
        <figcaption class="reusable-font-regular">
          Single-column wide description text can span multiple lines as required.
        </figcaption> 
      </figure>
      <figure class="individual-logo-container">
        <a href="actual-organisation-link" class="link" title="title-of-organisation" target="_blank">
          <img src="location-to-the-image"  class="logo-image">
        </a>
        <figcaption class="reusable-font-regular">
          Single-column wide description text can span multiple lines as required.
        </figcaption> 
      </figure>
    </div>
```

To create extra row for more organisations, copy and paste everything inside `<div class="logos-container hidden"></div>` and please make sure everything is still wrapped inside `<div class="schema-page-image"></div>` container, for example:

From:
```html
<div class="schema-page-image">
  <div class="logos-container">

    <figure class="individual-logo-container">
      <a href="" class="link" title="" target="_blank">
        <img src=""  class="logo-image">
      </a>
      <figcaption class="reusable-font-regular">
        logo 1 text
      </figcaption> 
    </figure>

    <figure class="individual-logo-container">
      <a href="" class="link" title="" target="_blank">
        <img src=""  class="logo-image">
      </a> 
      <figcaption class="reusable-font-regular">
        logo 2 text
      </figcaption> 
    </figure>

    <figure class="individual-logo-container">
      <a href="" class="link" title="" target="_blank">
        <img src=""  class="logo-image">
      </a> 
      <figcaption class="reusable-font-regular">
        logo 3 text
      </figcaption> 
    </figure>

  </div>
</div>
```

To:
```html
<div class="schema-page-image">
  <!-- one logos-container per row & one individual-logo-container per organisation -->
  <div class="logos-container">

    <figure class="individual-logo-container">
      <a href="" class="link" title="" target="_blank">
        <img src=""  class="logo-image">
      </a>
      <figcaption class="reusable-font-regular">
        logo 1 text
      </figcaption> 
    </figure>

    <figure class="individual-logo-container">
      <a href="" class="link" title="" target="_blank">
        <img src=""  class="logo-image">
      </a> 
      <figcaption class="reusable-font-regular">
        logo 2 text
      </figcaption> 
    </figure>

    <figure class="individual-logo-container">
      <a href="" class="link" title="" target="_blank">
        <img src=""  class="logo-image">
      </a> 
      <figcaption class="reusable-font-regular">
        logo 3 text
      </figcaption> 
    </figure>

  </div>

  <!-- extra row with 3 logos -->
  <div class="logos-container">

    <figure class="individual-logo-container">
      <a href="" class="link" title="" target="_blank">
        <img src=""  class="logo-image">
      </a>
      <figcaption class="reusable-font-regular">
        logo 4 text
      </figcaption> 
    </figure>

    <figure class="individual-logo-container">
      <a href="" class="link" title="" target="_blank">
        <img src=""  class="logo-image">
      </a> 
      <figcaption class="reusable-font-regular">
        logo 5 text
      </figcaption> 
    </figure>

    <figure class="individual-logo-container">
      <a href="" class="link" title="" target="_blank">
        <img src=""  class="logo-image">
      </a> 
      <figcaption class="reusable-font-regular">
        logo 6 text
      </figcaption> 
    </figure>

  </div>
</div>
```

Note: each logo has width 204px, for the best outcome it is encouraged to use small logo for image display