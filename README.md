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
