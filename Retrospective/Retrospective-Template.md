RETROSPECTIVE SPRINT 1 (Team 07)
=====================================

The retrospective should include _at least_ the following sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs done => **4/4**
- Total points committed vs done  => **31/31**
- Nr of hours planned vs spent (as a team) => **112/118h 32m**

**Remember**  a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Our DoD: A story is done when the backed tests performed by `jest` ends successfully and when the frontend tests performed by `cypress` are correctly completed.

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 16      | -      | 30h        | 60h 10m      |
| #1    | 4       | 13     | 35h        | 26h 10m      |
| #2    | 4       | 5      | 13h        | 6h 40m       |
| #3    | 4       | 8      | 21h        | 15h 5m       |
| #4    | 4       | 5      | 13h        | 10h 15m      |


> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task (average, standard deviation) => 3h 40m 
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table => **0.94**

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated => 
  - Total hours spent =>
  - Nr of automated unit test cases  => 
  - Coverage (if available)
- E2E testing:
  - Total hours estimated
  - Total hours spent
- Code review 
  - Total hours estimated 
  - Total hours spent
- Technical Debt management:
  - Total hours estimated 
  - Total hours spent
  - Hours estimated for remediation by SonarQube
  - Hours estimated for remediation by SonarQube only for the selected and planned issues 
  - Hours spent on remediation 
  - debt ratio (as reported by SonarQube under "Measures-Maintainability")
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability )
  


## ASSESSMENT

- What caused your errors in estimation (if any)?

  We were over optimistic! Thinking that organizing the base structure of the project (DB structures and APIs) would have made us very fast.

- What lessons did you learn (both positive and negative) in this sprint?

  It's better to plan 

- Which improvement goals set in the previous retrospective were you able to achieve? 

- Which ones you were not able to achieve? Why?

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

> Propose one or two

- One thing you are proud of as a Team!!