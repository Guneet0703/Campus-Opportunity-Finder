/**
 * dummyData.js
 *
 * Per the project specification, this file originally held temporary
 * placeholder opportunities used before the backend/MongoDB integration was
 * complete (see PROJECT_SPECIFICATION.md, Chapter 3.8 & 3.14).
 *
 * This version of Campus Opportunity Finder is fully connected to the
 * Express/MongoDB backend (see src/services/opportunityService.js), so this
 * file is no longer used to render the UI. It is kept only so the folder
 * structure matches the specification and to document the data shape that
 * flows through the application.
 */

export const dummyOpportunities = [
  {
    _id: 'sample-1',
    title: 'Google Software Engineering Internship',
    category: 'Internship',
    organizer: 'Google',
    location: 'Remote',
    eligibility: 'B.Tech 2nd-4th Year Students',
    deadline: '2026-09-30',
    description:
      'Detailed information about the internship, responsibilities, requirements, benefits, and application process.',
    registrationLink: 'https://careers.google.com',
  },
];

export default dummyOpportunities;
