import { TeachActivityDto } from '../../../teachActivity/application/dtos/teachActivity.dto';

export type TeachActivityCreateDto = Omit<TeachActivityDto, 'id' | 'createdAt' | 'updatedAt'>;
