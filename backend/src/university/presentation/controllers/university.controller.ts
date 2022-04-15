import { Controller, Get, Logger, Param } from '@nestjs/common';
import { UniversityDto } from '../../application/dtos/university.dto';
import { FindByIdUniversityUseCase } from '../../application/useCases';
import { UniversityMapper } from '../../infra/mappers/university.mapper';

@Controller('university')
export class UniversityController {

  private _logger: Logger;

  constructor(public readonly findOneUseCase: FindByIdUniversityUseCase) {
    this._logger = new Logger('UniversityController');
  }

  @Get(':id')
  async findOne(@Param() params): Promise<UniversityDto> {
    this._logger.log('Find One');

    const university = await this.findOneUseCase.execute({ id: params.id });

    //TODO: handle this
    if (university.isLeft)
      return null;

    return UniversityMapper.DomainToDto(university.value.unwrap());
  }
}