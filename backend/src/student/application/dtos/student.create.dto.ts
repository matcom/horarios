import { StudentDto } from '../../../student/application/dtos/student.dto';

export type StudentCreateDto = Omit<StudentDto, 'id' | 'createdAt' | 'updatedAt'> & {
  facultyId: { id: string };
  majorId: { id: string };
};
