const baseUrl = 'http://localhost:3001/';

export default {
  baseUrl: baseUrl,
  login: baseUrl + 'auth/login',
  courses: baseUrl + 'courses',
  events: baseUrl + 'events',
  permissions: baseUrl + 'permissions',
  roles: baseUrl + 'roles',
  resources: baseUrl + 'resources',
  notifications: baseUrl + 'notifications',
  tags: baseUrl + 'tags',
  token: baseUrl + 'auth/login',
  intervals: baseUrl + 'intervals',
  free_locals: baseUrl + 'locals/free',
  free_resources: baseUrl + 'resources/free',

  users: baseUrl + 'user',
  register: baseUrl + 'auth/register',
  profile: baseUrl + 'user/profile',

  local: baseUrl + 'local',
  localGetAll: baseUrl + 'local/all',

  groups: baseUrl + 'group',
  groupsGetAll: baseUrl + 'group/all',

  universities: baseUrl + 'university',
  universitiesGetAll: baseUrl + 'university/all',

  faculties: baseUrl + 'faculty',
  facultiesGetAll: baseUrl + 'faculty/all',

  teachers: baseUrl + 'teacher',
  teachersGetAll: baseUrl + 'teacher/all',

  typeClasses: baseUrl + 'typeclass',
  typeClassesGetAll: baseUrl + 'typeclass/all',

  majors: baseUrl + 'major',
  majorsGetAll: baseUrl + 'major/all',

  classes: baseUrl + 'class',
  multipleEditionClass: baseUrl + 'class/multiple',
  classesGetAll: baseUrl + 'class/all',
  classRemoveInSerie: baseUrl + 'class/in_serie',
  query: baseUrl + 'class/query',
  multipleCreateClass: baseUrl + 'class/create/multiple',
  createClass: baseUrl + 'class/create',

  departments: baseUrl + 'department',
  departmentGetAll: baseUrl + 'department/all',

  semesters: baseUrl + 'semester',
  semestersGetAll: baseUrl + 'semester/all',

  lessons: baseUrl + 'lesson',
  lessonsGetAll: baseUrl + 'lesson/all',

  excelReport: baseUrl + 'reports/excel',

  restrictions: baseUrl + 'restrictions',
};