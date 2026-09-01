# Product Data Concepts

This is a terminology skeleton derived from the supplied brief. It is not a
database schema and does not authorize implementation choices.

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

## Needs verification

- Identifiers, ownership, tenancy, and authorization rules
- Field names, types, validation limits, and lifecycle states
- Whether hours are scheduled, confirmed, or adjustable
- Cancellation, no-show, dispute, correction, and deletion behavior
- Essay privacy and retention
- Share-link access and revocation
- Audit history and attendance-confirmation permissions
