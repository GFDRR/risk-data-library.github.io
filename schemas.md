---
layout: page
title: The risk data schema
---

## The full schema

The risk data schema comprises schema for hazard, exposure, vulnerability and loss data - all connected by a series of common tables. 

![keys6](/assets/images/edr/all-cf-keys6-2020-02-06.png "keys6")

The 'common' schema tables provide common entities used as dependencies in all the schemas.

| table name   | short description          |
|--------------|----------------------------|
| hazard_type  | Valid Hazard types         |
| imt          | Valid intensity measure codes and descriptions                           |
| license      | List of supported licenses |
| process type | Defines hazard processes (one hazard type may have >1 process type)                           |


## Hazard

A hazard is any agent that can cause harm or damage to humans, property, or the environment. Risk is defined as the probability that exposure to a hazard will lead to a negative consequence, or more simply, a hazard poses no risk if there is no exposure to that hazard.

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

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

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

## Vulnerability

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

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

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

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
