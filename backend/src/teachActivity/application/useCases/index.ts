import { CreateTeachActivityUseCase } from './teachActivity.create.use-case';
import { FindByIdTeachActivityUseCase } from './teachActivity.find-by-id.use-case';
import { FindDetailsTeachActivityUseCase } from './teachActivity.get-one-details.use-case';
import { PaginatedTeachActivityUseCase } from './teachActivity.paginated.use-case';
import { RemoveTeachActivityUseCase } from './teachActivity.remove.use-case';
import { UpdateTeachActivityUseCase } from './teachActivity.update.use-case';

export * from './teachActivity.create.use-case';
export * from './teachActivity.find-by-id.use-case';
export * from './teachActivity.get-one-details.use-case';
export * from './teachActivity.paginated.use-case';
export * from './teachActivity.remove.use-case';
export * from './teachActivity.update.use-case';

export const TeachActivityUseCases = [
  CreateTeachActivityUseCase,
  FindByIdTeachActivityUseCase,
  FindDetailsTeachActivityUseCase,
  PaginatedTeachActivityUseCase,
  RemoveTeachActivityUseCase,
  UpdateTeachActivityUseCase,
];