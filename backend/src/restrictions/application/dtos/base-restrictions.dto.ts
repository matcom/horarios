export type BaseRestrictionsDto = {
  id: string;
  conditions: string;
  teacherId: { id: string };
  interval: number;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}