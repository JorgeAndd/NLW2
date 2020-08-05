import express from 'express';
import db from './database/connection';

import timeUtils from './utils/timeUtils';

const routes = express.Router();

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

routes.post('/classes', async (request, response) => {
  const {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule,
  } = request.body;

  const newUsersIds = await db('users').insert({
    name,
    avatar,
    whatsapp,
    bio,
  });

  const user_id = newUsersIds[0];

  const newClassesIds = await db('classes').insert({
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

  console.log(classSchedule);

  await db('class_schedule').insert(classSchedule);

  return response.send();
});

export default routes;