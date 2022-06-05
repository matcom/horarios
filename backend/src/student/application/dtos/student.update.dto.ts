import { StudentDto } from '../../../student/application/dtos/student.dto';

export type StudentUpdateDto = Omit<Partial<StudentDto>, 'id'> & {
  studentId: string;
  facultyId: { id: string };
  majorId: { id: string };
};
