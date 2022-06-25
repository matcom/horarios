import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';
import { UniversityModule } from './university/university.module';
import { DataAccessModule } from './shared/modules/data-access/data-access.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { FacultyModule } from './faculty/faculty.module';
import { LocalModule } from './local/local.module';
import { TypeclassModule } from './typeclass/typeclass.module';
import { MajorModule } from './major/major.module';
import { CatTeacherModule } from './categoryTeacher/catTeacher.module';
import { LessonModule } from './lesson/lesson.module';
import { TeachYearModule } from './teachYear/teachYear.module';
import { TeachActivityModule } from './teachActivity/teachActivity.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [
    TeacherModule,
    UniversityModule,
    DataAccessModule,
    UserModule,
    EmailModule,
    AuthModule,
    FacultyModule,
    LocalModule,
    TypeclassModule,
    MajorModule,
    CatTeacherModule,
    LessonModule,
    TeachYearModule,
    TeachActivityModule,
    DepartmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
