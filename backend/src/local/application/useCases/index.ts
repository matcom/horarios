import { CreateLocalUseCase } from './local.create.use-case';
import { UpdateLocalUseCase } from './local.update.use-case';
import { RemoveLocalUseCase } from './local.remove.use-case';
import { PaginatedLocalUseCase } from './local.paginated.use-case';
import { FindByIdLocalUseCase } from './local.find-by-id.use-case';

export * from './local.paginated.use-case';
export * from './local.create.use-case';
export * from './local.find-by-id.use-case';
export * from './local.remove.use-case';
export * from './local.update.use-case';

export const LocalUseCase = [
  FindByIdLocalUseCase,
  CreateLocalUseCase,
  RemoveLocalUseCase,
  UpdateLocalUseCase,
  PaginatedLocalUseCase,
];
