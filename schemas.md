---
layout: page
title: The risk data schema
---

## The full schema

The risk data schema describes consistent and connected storage for hazard, exposure, vulnerability and loss data. For the first time, all four data components for a risk analysis can be stored in a single database. 

![keys6](/assets/images/edr/all-cf-keys6-2020-02-06.png "keys6")

The 'common' schema tables provide common entities used as dependencies in all the schemas.

| table name   | short description          |
|--------------|----------------------------|
| hazard_type  | Valid Hazard types         |
| imt          | Valid intensity measure codes and descriptions                           |
| license      | List of supported licenses |
| process type | Defines hazard processes (one hazard type may have >1 process type)                           |


## Hazard

A process, phenomenon or human activity that may cause loss of life, injury or other health impacts, property damage, social and economic disruption or environmental degradation. Hazard data for risk modelling describes the spatial distribution of intensity parameters for a scenario of return period hazard map. Hazard data are stored as point datasets in the Risk Data Library. Importantly, the exposure schema links to the vulnerability schema through the use of common hazard intensity parameters.

![hazard](/assets/images/edr/all-cf-hazard-2020-02-06.png "hazard")


| table name     | short description                                                 |
|----------------|-------------------------------------------------------------------|
| contribution   | Meta-data for contributed model, license, source etc.             |
| event          | A single event, member of an event set                            |
| event_set      | Collection of one or more events                                  |
| footprint      | A single footprint or intensity field, a realization of an event  |
| footprint_data | A single point in a footprint: point location and intensity value |
| footprint_set  | A homogeneous set of footprints associated with an event          |


## Exposure

Exposure refers to assets such as people, buildings, infrastructure (transport, communications and supply) and land that could be exposed to hazards. Exposure data for risk modelling describes the location, structural or socio-economic characteristics and value of those assets. The Risk Data Library can describe multiple asset types in point, polyon or polyline datasets. Importantly, the exposure schema links to the vulnerability schema through the use of common taxonomies.

![ged4all](/assets/images/edr/all-cf-ged4all-2020-02-06.png "ged4all")

| table name     | short description                                                 |
|----------------|-------------------------------------------------------------------|
| contribution   | Meta-data for contributed model, license, source etc.             |
| exposure_model | ...                            |
| asset          | ...                                  |
| model_cost_type      | ... |
| cost | ... |
| occupancy  | ... |
| tags  | ... |
| all_exposure (view)  | ... |
| exposure_type (type)  | ... |


## Vulnerability

Vulnerability refers to the conditions determined by physical, social, economic and environmental factors or processes which increase the susceptibility of an individual, a community, assets or systems to the impacts of hazards. The Risk Data Library stores structural vulnerability and fragility curves for multiple hazard and asset types. 

![mover](/assets/images/edr/all-cf-mover-2020-02-06.png "mover")

| table name     | short description                                                 |
|----------------|-------------------------------------------------------------------|
| contribution   | Meta-data for contributed model, license, source etc.             |
| f_core | ...                            |
| f_scoring          | ...                                  |
| reference_table     | ... |
| f_specifics | ... |
| f_additional      | ... |
| damage_scale | ... |
| lp_table  | ... |
| edp_table  | ... |


## Modeled Loss

Modeled loss datasets describe the estimated impact of a scenario, or risk communicated as a return period or annual average loss. 

![loss](/assets/images/edr/all-cf-loss-2020-02-06.png "loss")

| table name     | short description                                                 |
|----------------|-------------------------------------------------------------------|
| contribution   | Meta-data for contributed model, license, source etc.             |
| loss_model | ...                            |
| asset          | ...                                  |
| loss_map      | ... |
| loss_map_values | ... |
| loss_curve_map      | ... |
| loss_curve_map_values | ... |
| all_loss_map_values (view)  | ... |
