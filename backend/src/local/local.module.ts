import {Module} from '@nestjs/common';
import {DataAccessModule} from "../shared/modules/data-access/data-access.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LocalPersistence} from "../faculty/infra/entities/faculty.persistence";
import {LocalUseCase} from "./application/useCases";
import {LocalRepository} from "./infra/repositories/local.repository";
import {LocalController} from "./presentation/controllers/local.controller";

@Module({
    imports: [DataAccessModule, TypeOrmModule.forFeature([LocalPersistence])],
    providers: [...LocalUseCase, LocalRepository],
    exports: [],
    controllers: [LocalController],
})
export class LocalModule {
}
