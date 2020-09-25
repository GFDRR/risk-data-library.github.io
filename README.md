# The Risk Data Library Project Website

## Developer Notes
### Run the repo locally

1. Navigate to the root of the repository
2. Run `docker-compose up --build` to build docker image
3. Follow the instructions in the Terminal and go to `http://0.0.0.0:4000` to see the pages

Note: `localhost` doesn't render data from the backend.

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
