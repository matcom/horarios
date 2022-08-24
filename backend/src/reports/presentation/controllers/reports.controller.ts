import { Controller, Get, Logger } from '@nestjs/common';
import { GenerateExcelReport } from '../../application/useCases/reports.generate-excel.use-case';

@Controller('reports')
export class ReportsController {
  private _logger: Logger;

  constructor(
    private readonly generateExcelReport: GenerateExcelReport,
  ) {
    this._logger = new Logger('ReportsController');
  }

  @Get('excel')
  async generateExcel() {
    this._logger.log('Generate Excel');

    return this.generateExcelReport.Handle();
  }
}