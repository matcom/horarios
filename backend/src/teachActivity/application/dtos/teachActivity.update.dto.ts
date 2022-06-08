import { TeachActivityDto } from './teachActivity.dto';

export type TeachActivityUpdateDto = Omit<Partial<TeachActivityDto>, 'id'> & {
  teachActivityId: string;
};
