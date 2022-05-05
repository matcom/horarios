import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';
import { UniversityModule } from './university/university.module';
import { DataAccessModule } from './shared/modules/data-access/data-access.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { FacultyModule } from './faculty/faculty.module';

@Module({
  imports: [
    TeacherModule,
    UniversityModule,
    DataAccessModule,
    UserModule,
    EmailModule,
    AuthModule,
    FacultyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
