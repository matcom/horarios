import { CreateCatTeacherUseCase } from './catTeacher.create.use-case';
import { FindByIdCatTeacherUseCase } from './catTeacher.find-by-id.use-case';
import { FindAllCatTeacherUseCase } from './catTeacher.get-all.use-case';
import { PaginatedCatTeacherUseCase } from './catTeacher.paginated.use-case';
import { RemoveCatTeacherUseCase } from './catTeacher.remove.use-case';
import { UpdateCatTeacherUseCase } from './catTeacher.update.use-case';

export * from './catTeacher.create.use-case';
export * from './catTeacher.find-by-id.use-case';
export * from './catTeacher.get-all.use-case';
export * from './catTeacher.paginated.use-case';
export * from './catTeacher.remove.use-case';
export * from './catTeacher.update.use-case';

export const CatTeacherUseCases = [
  CreateCatTeacherUseCase,
  FindByIdCatTeacherUseCase,
  FindAllCatTeacherUseCase,
  PaginatedCatTeacherUseCase,
  RemoveCatTeacherUseCase,
  UpdateCatTeacherUseCase,
];