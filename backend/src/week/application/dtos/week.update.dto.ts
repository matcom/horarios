import { WeekDto } from './week.dto';

export type WeekUpdateDto = Partial<WeekDto> & {
  weekId: string;
};
