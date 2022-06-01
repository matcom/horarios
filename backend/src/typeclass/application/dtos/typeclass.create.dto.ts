import { BaseDto } from '../../../shared/core/BaseDto';
import { PropsBaseDto } from '../../../shared/core/PropsBaseDto';
import { EnumActivitieType } from '../../domain/enums/enum.activitie.type';

export type TypeclassCreateDto = PropsBaseDto & BaseDto & {
  type: EnumActivitieType
  duration: Date
}
