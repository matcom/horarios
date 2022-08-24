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
import { FindAllLessonUseCase } from '../../../lesson/application/useCases';

@Injectable()
export class GenerateExcelReport {
  private _logger: Logger;

  constructor(
    private readonly findClassWithDetailsUseCase: FindAllWithDetailsClassUseCase,
    private readonly findGroupsUseCase: FindAllGroupUseCase,
    private readonly findLocals: FindAllLocalUseCase,
    private readonly findLessons: FindAllLessonUseCase) {
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

      const grouped = _.groupBy(classes, (c) => c.week.id); // grouping by week

      let ws = doc.addWorksheet(g.fullName);
      let year = 0;

      for (let i = nameStartColumn; i < nameStartColumn + 5; ++i) { // name of days
        ws.cell(nameStartRow, i)
          .string(moment().day(i - nameStartColumn + 1).format('dddd'))
          .style({
            font: {
              italics: true,
            },
            alignment: {
              horizontal: 'center',
              vertical: 'center',
            },
          });
      }

      let startRow = nameStartRow + 1;
      let startColumn = nameStartColumn;

      // walking for each week
      for (let key in grouped) {

        let maxLessonInADay = 10;

        const classes = grouped[key]
          .sort((a, b) => a.start.getTime() - b.start.getTime());

        if (classes.length == 0) continue;

        let start = moment(classes[0].week.firstDate);
        let end = moment(classes[0].week.endDate);
        year = classes[0].lesson.year;

        let row = startRow;
        let column = startColumn;

        const weekLabel = `Semana ${start.format('DD/MM')}  - ${end.format('DD/MM')}`;
        ws
          .cell(startRow - 2, startColumn + 2)
          .string(weekLabel)
          .style({
            font: {
              bold: true,
              size: 14,
            },
            alignment: { horizontal: 'center' },
          });

        // explore specific week
        while (start.isBefore(end)) {
          const now = classes
            .filter(c => moment(c.start).isSame(start, 'day')); // day's classes

          maxLessonInADay = Math.max(maxLessonInADay, now.length + 5);

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

        startRow += maxLessonInADay;
      }

      await this.makeLegend(ws, year);

    }
    doc.write('report.xlsx');
  }

  private async makeLegend(ws: xl.Worksheet, year: number) {
    let row = 3;
    let column = 9;

    ws
      .cell(row, column + 1)
      .string('Asignaturas')
      .style({
        font: {
          bold: true,
          size: 12,
        },
        alignment: { horizontal: 'center' },
      });

    const lessons = (await this.findLessons.execute({ filter: { year: year } }))
      .value
      .unwrap()
      .items;

    row += 1;
    for (let i = 0; i < lessons.length; ++i, row += i) {
      ws
        .cell(row, column)
        .string(lessons[i].shortName)
        .style({
          alignment: { horizontal: 'center' },
        });

      ws
        .cell(row, column + 1)
        .string(lessons[i].fullName);
    }


    row += 2;

    ws
      .cell(row, column + 1)
      .string('Horario de los turnos')
      .style({
        font: {
          bold: true,
          size: 12,
        },
        alignment: { horizontal: 'center' },
      });

    let start = moment('08:00', 'HH:mm');
    for (let i = 0; i < 6; ++i) {
      ws
        .cell(row + i + 1, column)
        .string(`${i + 1}º turno`)
        .style({
          alignment: { horizontal: 'center' },
        });

      ws
        .cell(row + i + 1, column + 1)
        .string(`${start.format('HH:mm')} - ${start.add(1.5, 'hours').format('HH:mm')}`);
    }
  }
}