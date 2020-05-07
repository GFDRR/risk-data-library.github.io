---
layout: page
title: Database
---

## Database structure

This document summarises the structure of the unified database (unified February 2020) and data import scripts. The database is implemented in PostgreSQL, and uses PostGIS for geospatial operations. Data values are stored in point or with full geometry to represent polyline and polygon features. No raster data is stored in the database (though PostGIS supports raster and we may explore this in the future). The unified database is stored at https://github.com/gem/cf_db/ An example SQL script to import data is given here for hazard data. Exposure, loss and vulnerability data are imported using similar SQL scripts. Below is a simplified entity-relationship diagram of the whole database. All tables are shown but only key fields are included in each table. The full tables from each component follow in subsequent diagrams.

```mermaid

```