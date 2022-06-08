import { CreateTeachYearUseCase } from './teachYear.create.use-case';
import { FindByIdTeachYearUseCase } from './teachYear.find-by-id.use-case';
import { FindDetailsTeachYearUseCase } from './teachYear.get-one-details.use-case';
import { PaginatedTeachYearUseCase } from './teachYear.paginated.use-case';
import { RemoveTeachYearUseCase } from './teachYear.remove.use-case';
import { UpdateTeachYearUseCase } from './teachYear.update.use-case';

export * from './teachYear.create.use-case';
export * from './teachYear.find-by-id.use-case';
export * from './teachYear.get-one-details.use-case';
export * from './teachYear.paginated.use-case';
export * from './teachYear.remove.use-case';
export * from './teachYear.update.use-case';

export const TeachYearUseCases = [
  CreateTeachYearUseCase,
  FindByIdTeachYearUseCase,
  FindDetailsTeachYearUseCase,
  PaginatedTeachYearUseCase,
  RemoveTeachYearUseCase,
  UpdateTeachYearUseCase,
];