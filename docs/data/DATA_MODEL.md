# Product Data Concepts

Vocabulary owned by the **separate YVC application**, kept here so marketing
copy stays consistent with the product it points at. It is not a database
schema, it does not authorize implementation choices, and none of it is
implemented in this repository.

## Presented concepts

| Concept | Presented meaning | Implemented here |
| --- | --- | --- |
| Volunteer | A young person with a reusable profile and participation record | No |
| Opportunity | A volunteer event that can be browsed, viewed, and applied to | No |
| Application | A three-step application using profile data and optionally a saved essay | No |
| Essay | Reusable application writing saved to a volunteer account | No |
| Attendance confirmation | Organizer/admin confirmation that an accepted volunteer attended | No |
| Volunteer record | Level, completed events, hours, reliability, and a shareable link | No |
| Admin | Core-team user who posts opportunities, reviews applicants, and confirms attendance | No |

## Presented rules

- Reliability = attended events divided by accepted events.
- Missing organizer confirmation must not penalize the volunteer.
- Levels are Newcomer, Active, Trusted, and Core with thresholds recorded in
  `PRODUCT.md`.

## Marketing boundary

The marketing site may explain that volunteering is organised around
opportunities, organisers, and taking part. It must not present a volunteer
record, level, reliability score, or application flow as something this website
offers, and it holds no sample volunteer or opportunity data.

## Needs verification

- Identifiers, ownership, tenancy, and authorization rules
- Field names, types, validation limits, and lifecycle states
- Whether hours are scheduled, confirmed, or adjustable
- Cancellation, no-show, dispute, correction, and deletion behavior
- Essay privacy and retention
- Share-link access and revocation
- Audit history and attendance-confirmation permissions
