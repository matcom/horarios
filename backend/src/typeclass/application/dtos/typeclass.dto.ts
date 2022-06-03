import { PropsBaseDto } from '../../../shared/core/PropsBaseDto';
import { BaseDto } from '../../../shared/core/BaseDto';
import { EnumActivitieType } from '../../domain/enums/enum.activitie.type';

type PropsTypeClass = {
  type: EnumActivitieType
  duration: number
}

export type TypeclassDto = PropsBaseDto & BaseDto & PropsTypeClass
