import { GroupDto } from './group.dto';

export type GroupCreateDto = Omit<GroupDto, 'id' | 'createdAt' | 'updatedAt'> & {
  majorId: { id: string };
};
