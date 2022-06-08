import { TeachYearDto } from '../../../teachYear/application/dtos/teachYear.dto';

export type TeachYearCreateDto = Omit<TeachYearDto, 'id' | 'createdAt' | 'updatedAt'>;
