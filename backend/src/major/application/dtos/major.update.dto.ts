import { PropsBaseDto } from '../../../shared/core/PropsBaseDto';
import { MajorCreateDto } from './major.create.dto';

export type MajorUpdateDto = Partial<MajorCreateDto> & {
  majorId: string
}

