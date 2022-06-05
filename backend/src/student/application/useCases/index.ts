import { CreateStudentUseCase } from './student.create.use-case';
import { FindByIdStudentUseCase } from './student.find-by-id.use-case';
import { PaginatedStudentUseCase } from './student.paginated.use-case';
import { RemoveStudentUseCase } from './student.remove.use-case';
import { UpdateStudentUseCase } from './student.update.use-case';
import { FindDetailsStudentUseCase } from './stundent.get-one-details.use-case';

export * from './student.create.use-case';
export * from './student.find-by-id.use-case';
export * from './student.paginated.use-case';
export * from './student.remove.use-case';
export * from './student.update.use-case';
export * from './stundent.get-one-details.use-case';


export const StudentUseCases = [
  CreateStudentUseCase,
  FindByIdStudentUseCase,
  PaginatedStudentUseCase,
  RemoveStudentUseCase,
  UpdateStudentUseCase,
  FindDetailsStudentUseCase,
];