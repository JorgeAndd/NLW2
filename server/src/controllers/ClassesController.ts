import { Request, Response } from 'express';

import db from '../database/connection';
import timeUtils from '../utils/timeUtils';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filter = request.query;

    const subject = filter.subject as string;
    const week_day = filter.week_day as string;
    const time = filter.time as string;

    if (!subject || !week_day || !time) {
      return response.status(400).json({
        error: "Missing filter on class search"
      });
    }

    const timeInMinutes = timeUtils.convertHourStringToMinutes(time);

    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.json(classes).send();
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const trx = await db.transaction();

    try {
      const newUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = newUsersIds[0];

      const newClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id,
      });

      const class_id = newClassesIds[0];

      const classSchedule = schedule.map((item: ScheduleItem) => {
        const fromInMinutes = timeUtils.convertHourStringToMinutes(item.from);
        const toInMinutes = timeUtils.convertHourStringToMinutes(item.to);

        return {
          class_id,
          week_day: item.week_day,
          from: fromInMinutes,
          to: toInMinutes,
        };
      })

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (error) {
      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while creating new class',
      })
    }
  }
}