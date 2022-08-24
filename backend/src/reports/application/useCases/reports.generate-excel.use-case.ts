import { Injectable, Logger } from '@nestjs/common';
import * as xl from 'excel4node';
import { FindAllWithDetailsClassUseCase } from '../../../class/application/useCases';
import { FindAllGroupUseCase } from '../../../group/application/useCases';
import { Group } from '../../../group/domain/entities/group.entity';
import { Local } from '../../../local/domain/entities/local.entity';
import { FindAllLocalUseCase } from '../../../local/application/useCases';
import { ClassMappers } from '../../../class/infra/mappers/class.mapper';
import * as moment from 'moment';
import * as _ from 'underscore';

@Injectable()
export class GenerateExcelReport {
  private _logger: Logger;

  constructor(
    private readonly findClassWithDetailsUseCase: FindAllWithDetailsClassUseCase,
    private readonly findGroupsUseCase: FindAllGroupUseCase,
    private readonly findLocals: FindAllLocalUseCase) {
    this._logger = new Logger('GenerateExcelReport');
  }

  async Handle() {
    let doc = new xl.Workbook();

    const groups: Group[] = (await this.findGroupsUseCase.execute({ filter: {} }))
      .value
      .unwrap()
      .items;

    const locals: Local[] = (await this.findLocals.execute({ filter: {} }))
      .value
      .unwrap()
      .items;

    let nameStartRow = 4; // begin for name of days (row)
    let nameStartColumn = 2; // begin for name of days (column)


    for (let i = 0; i < groups.length; ++i) {
      const g = groups[i];
      const classes = (await this.findClassWithDetailsUseCase.execute({ filter: { groupId: g._id.toString() } }))
        .value
        .unwrap()
        .items
        .map(ClassMappers.DomainToDetails);

      if (classes.length == 0) continue;

      const grouped = _.groupBy(classes, (c) => c.week.id);

      let ws = doc.addWorksheet(g.fullName);

      for (let i = nameStartColumn; i < nameStartColumn + 5; ++i) { // name of days
        ws.cell(nameStartRow, i)
          .string(moment().day(i - nameStartColumn + 1).format('dddd'))
          .style({
            alignment: {
              horizontal: 'center',
              vertical: 'center',
            },
          });
      }

      let startRow = nameStartRow + 1;
      let startColumn = nameStartColumn;
      for (let key in grouped) {  // walking for each week

        const classes = grouped[key]
          .sort((a, b) => a.start.getTime() - b.start.getTime());

        if (classes.length == 0) continue;

        let start = moment(classes[0].week.firstDate);
        let end = moment(classes[0].week.endDate);

        let row = startRow;
        let column = startColumn;

        const weekLabel = `Semana ${start.format('DD/MM')}  - ${end.format('DD/MM')}`;

        ws
          .cell(nameStartRow - 1, nameStartColumn + 2)
          .string(weekLabel)
          .style({
            font: {
              bold: true,
              size: 14,
            },
            alignment: { horizontal: 'center' },
          });

        while (start.isBefore(end)) { // explore a specific week
          const now = classes
            .filter(c => moment(c.start).isSame(start, 'day')); // day's classes

          now.forEach(c => {
            ws.cell(row, column)
              .string(moment(c.start).format('MMM Do YY'))
              .style({
                alignment: { horizontal: 'center' },
              });

            row++;
          });

          start = start.add(1, 'days');

          row = startRow;
          column++;
        }

        startRow += 10;
      }
    }
    doc.write('report.xlsx');
  }
}