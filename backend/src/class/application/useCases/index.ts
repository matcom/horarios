import { CreateClassUseCase } from './class.create.use-case';
import { FindByIdClassUseCase } from './class.find-by-id.use-case';
import { FindDetailsClassUseCase } from './class.get-one-details.use-case';
import { PaginatedClassUseCase } from './class.paginated.use-case';
import { RemoveClassUseCase } from './class.remove.use-case';
import { UpdateClassUseCase } from './class.update.use-case';

export * from './class.create.use-case';
export * from './class.find-by-id.use-case';
export * from './class.get-one-details.use-case';
export * from './class.paginated.use-case';
export * from './class.remove.use-case';
export * from './class.update.use-case';

export const ClassUseCases = [
  CreateClassUseCase,
  FindByIdClassUseCase,
  FindDetailsClassUseCase,
  PaginatedClassUseCase,
  RemoveClassUseCase,
  UpdateClassUseCase,
];