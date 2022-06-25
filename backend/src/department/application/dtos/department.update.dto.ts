import { DepartmentDto } from './department.dto';

export type DepartmentUpdateDto = Omit<Partial<DepartmentDto>, 'id'> & {
  departmentId: string;
  teacherIds: [{ id: string }];
  facultyId: { id: string };
};
