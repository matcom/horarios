import {Body, Controller, Delete, Get, Logger, Param, Post, Put, Response} from '@nestjs/common';
import {
    CreateLocalUseCase,
    FindByIdLocalUseCase,
    PaginatedLocalUseCase,
    RemoveLocalUseCase,
    UpdateLocalUseCase,
} from '../../application/useCases';
import {ProcessResponse} from '../../../shared/core/utils/processResponse';
import {Local} from '../../domain/entities/local.entity';
import {LocalPaginatedDto} from '../../application/dtos/local.paginated.dto';
import {LocalUpdateDto} from '../../application/dtos/local.update.dto';
import {LocalCreateDto} from '../../application/dtos/local.create.dto';
import {LocalMappers} from '../../infra/mappers/local.mappers';

@Controller('faculty')
export class LocalController {

    private _logger: Logger;

    constructor(
        private readonly findOneUseCase: FindByIdLocalUseCase,
        private readonly createLocalUseCase: CreateLocalUseCase,
        private readonly updateLocalUseCase: UpdateLocalUseCase,
        private readonly removeLocalUseCase: RemoveLocalUseCase,
        private readonly paginatedLocalUseCase: PaginatedLocalUseCase) {
    }

    @Get(':id')
    async findOne(@Param() params, @Response() res) {
        this._logger.log('Find One');

        const university = await this.findOneUseCase.execute({id: params.id});
        return ProcessResponse.setResponse<Local>(res, university, LocalMappers.DomainToDto);

    }

    @Post()
    async getAllPaginated(@Body() body: LocalPaginatedDto, @Response() res) {
        this._logger.log('Paginated');

        const pag = await this.paginatedLocalUseCase.execute(body);
        return ProcessResponse.setResponse(res, pag, (a) => a);
    }

    // @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() body: LocalCreateDto, @Response() res) {

        this._logger.log('Create');

        const local = await this.createLocalUseCase.execute(body);
        return ProcessResponse.setResponse<Local>(res, local, LocalMappers.DomainToDto);
    }

    // @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Body() body: LocalUpdateDto, @Response() res) {
        this._logger.log('Update');

        const local = await this.updateLocalUseCase.execute(body);
        return ProcessResponse.setResponse<Local>(res, local, LocalMappers.DomainToDto);
    }

    // @UseGuards(JwtAuthGuard)
    @Delete()
    async delete(@Body() body: { id: string }, @Response() res) {
        this._logger.log('Delete');

        const local = await this.removeLocalUseCase.execute(body);
        return ProcessResponse.setResponse<Local>(res, local, LocalMappers.DomainToDto);
    }


}
