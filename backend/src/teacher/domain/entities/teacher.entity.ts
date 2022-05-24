import { DomainBaseProps } from '../../../shared/domain/domain.base-props';
import { DomainTimestamp } from '../../../shared/domain/domain.timestamp';
import { DomainEntity } from '../../../shared/domain/entity.abstract';
import { Result } from '../../../shared/core/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

type TeacherProps = DomainBaseProps & DomainTimestamp & {
  email: string;
  facultyIds?: { id: string }[];
};

type newTeacherProps = Omit<TeacherProps, 'id' | 'createdAt' | 'updatedAt'>;

export class Teacher extends DomainEntity<TeacherProps> {

  get email(): string {
    return this.props.email;
  }

  get shortName(): string {
    return this.props.shortName;
  }

  get facultyIds(): { id: string }[] {
    return this.props.facultyIds;
  }

  // get faculties(): Faculty[] {
  //   return this.props.faculties;
  // }

  get fullName(): string {
    return this.props.fullName;
  }

  get description(): string {
    return this.props.description;
  }

  get priority(): number {
    return this.props.priority;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public SetFaculties(facs: { id: string }[]): void {
    this.props.facultyIds = facs;
  }

  public static New(props: newTeacherProps): Result<Teacher> {
    const ans: Result<Teacher> = this.Create({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (ans.isFailure) return Result.Fail(ans.unwrapError());

    return Result.Ok(ans.unwrap());
  }

  public static Create(props: TeacherProps, id: string = null): Result<Teacher> {
    // set guards here
    return Result.Ok(new Teacher(props, new UniqueEntityID(id)));
  }

  public Update(props: any) {
    this.props.priority = props.priority ?? this.props.priority;
    this.props.email = props.email ?? this.props.email;
    this.props.description = props.description ?? this.props.description;
    this.props.fullName = props.fullName ?? this.props.fullName;
    this.props.shortName = props.shortName ?? this.props.shortName;

    this.props.updatedAt = new Date();
  }

}