import { ClassCreateDto } from './class.create.dto';

export type ClassCreateInSerieDto = Omit<ClassCreateDto, 'serieId'> & {
  frequency: string | number;
}