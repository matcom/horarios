import { TeachYearDto } from './teachYear.dto';

export type TeachYearUpdateDto = Omit<Partial<TeachYearDto>, 'id'> & {
  teachYearId: string;
};
