import { DepartmentDto } from './department.dto';

export type DepartmentCreateDto = Omit<DepartmentDto, 'id' | 'createdAt' | 'updatedAt'> & {
  teacherIds: { id: string }[];
  facultyId: { id: string };
};
