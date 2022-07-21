const baseUrl = 'http://localhost:3001/';

export default {
  baseUrl: baseUrl,
  login: baseUrl + 'auth/login',
  courses: baseUrl + 'courses',
  groups: baseUrl + 'group',
  events: baseUrl + 'events',
  query: baseUrl + 'events/query',
  local: baseUrl + 'local',
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
  universities: baseUrl + 'university',
  universitiesGetAll: baseUrl + 'university/all',
  faculties: baseUrl + 'faculty',
  facultiesGetAll: baseUrl + 'faculty/all',
  teachers: baseUrl + 'teacher',
  typeClasses: baseUrl + 'typeclass',
  majors: baseUrl + 'major',
  majorsGetAll: baseUrl + 'major/all',
  classes: baseUrl + 'class',
  departments: baseUrl + 'department',
  departmentGetAll: baseUrl + 'department/all',
  semesters: baseUrl + 'semester',
  semestersGetAll: baseUrl + 'semester/all',
};