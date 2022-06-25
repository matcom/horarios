import { SemesterDto } from './semester.dto';

export type SemesterUpdateDto = Partial<SemesterDto> & {
  semesterId: string;
};
