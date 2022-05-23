import { DomainTimestamp } from '../../../shared/domain/domain.timestamp';
import { DomainEntity } from '../../../shared/domain/entity.abstract';
import { Result } from '../../../shared/core/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

type TeacherFacultyProps = DomainTimestamp & {
  teacherId: string,
  facultyId: string
}

type NewTeacherFacultyProps = Omit<TeacherFacultyProps, 'id' | 'createdAt' | 'updatedAt'>;

export class TeacherFaculty extends DomainEntity<TeacherFacultyProps> {
  get teacherId(): string {
    return this.props.teacherId;
  }

  get facultyId(): string {
    return this.props.facultyId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }


  public static New(props: NewTeacherFacultyProps): Result<TeacherFaculty> {
    const ans: Result<TeacherFaculty> = this.Create({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (ans.isFailure) return Result.Fail(ans.unwrapError());

    return Result.Ok(ans.unwrap());
  }

  public static Create(props: TeacherFacultyProps, id: string = null): Result<TeacherFaculty> {
    // set guards here
    return Result.Ok(new TeacherFaculty(props, new UniqueEntityID(id)));
  }
}