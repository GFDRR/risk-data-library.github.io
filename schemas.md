---
layout: page
title: Risk-data Schemas
---

## Common

Utility tables with common entities used as dependencies in all the schemas.

| table name   | short description          |
|--------------|----------------------------|
| hazard_type  | Valid Hazard types         |
| imt          |                            |
| license      | List of supported licenses |
| process type |                            |

## Hazard

A hazard is any agent that can cause harm or damage to humans, property, or the environment. Risk is defined as the probability that exposure to a hazard will lead to a negative consequence, or more simply, a hazard poses no risk if there is no exposure to that hazard.




```mermaid
classDiagram
    class contribution {
        <<hazard>>
        id
        event_set_id
        model_source
        model_date
        notes
        version
        purpose
        project
        contributed_at
        license_code
    }

    class event {
        <<hazard>>
        id
        event_set_id
        calculation_method
        frequency
        occurrence_probability
        occurrence_time_start
        occurrence_time_end
        occurrence_time_span
        trigger_hazard_type
        trigger_process_type
        trigger_event_id
        description
    }

    class event_set {
        <<hazard>>
        id
        the_geom
        geographic_area_name
        creation_date
        hazard_type
        time_start
        time_end
        time_duration
        description
        bibliography
        is_prob
    }

    class footprint {
        <<hazard>>
        id
        footprint_set_id
        uncertainty_2nd_moment
        trigger_footprint_id
    }

    class footprint_data {
        <<hazard>>
        id
        footprint_id
        the_geom
        intensity
    }

    class footprint_set {
        <<hazard>>
        id
        event_id
        process_type
        imt
        data_uncertainty
    }

    class imt {
        <<cf_common>>
        [PK] im_code
        process_code
        hazard_code
        description
        units
    }

    class license {
        <<cf_common>>
        [PK] code
        name
        notes
        url
    }

    class process_type {
        <<cf_common>>
        [PK] code
        hazard_code
        name
    }

    class hazard_type {
        <<cf_common>>
        [PK] code
        name
    }

    event_set o-- contribution
    event o-- event_set
    event o-- footprint_set
    footprint_set o-- footprint
    footprint o-- footprint_data
    footprint o-- footprint
    imt o-- footprint_set
    license o-- contribution
    process_type o-- event
    process_type o-- footprint_set
    process_type o-- imt
    hazard_type o-- process_type
    hazard_type o-- event
    hazard_type o-- event_set

    link hazard_type "/" "To be determined"
```

## Tables

| table name     | short description                                                 |
|----------------|-------------------------------------------------------------------|
| contribution   | Meta-data for contributed model, license, source etc.             |
| event          | A single event, member of an event set                            |
| event_set      | Collection of one or more events                                  |
| footprint      | A single footprint or intensity field, a realization of an event  |
| footprint_data | A single point in a footprint: point location and intensity value |
| footprint_set  | A homogeneous set of footprints associated with an event          |


## Loss

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Exposure

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Vulnerability

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
