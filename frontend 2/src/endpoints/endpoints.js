const baseUrl = 'http://localhost:3001/';

export default {
  baseUrl: baseUrl,
  login: baseUrl + 'auth/login',
  courses: baseUrl + 'courses',
  groups: baseUrl + 'groups',
  events: baseUrl + 'events',
  query: baseUrl + 'events/query',
  locals: baseUrl + 'locals',
  permissions: baseUrl + 'permissions',
  profile: baseUrl + 'profile',
  register: baseUrl + 'auth/register',
  roles: baseUrl + 'roles',
  resources: baseUrl + 'resources',
  notifications: baseUrl + 'notifications',
  tags: baseUrl + 'tags',
  token: baseUrl + 'auth/login',
  users: baseUrl + 'users',
  intervals: baseUrl + 'intervals',
  free_locals: baseUrl + 'locals/free',
  free_resources: baseUrl + 'resources/free',
};