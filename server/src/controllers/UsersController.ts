import { Request, Response } from 'express';

import db from '../database/connection';

export default class UsersController {
  async index(request: Request, response: Response) {
    const filter = request.query;

    const id = Number(filter.id);

    const user = await db('users')
      .where('users.id', '=', id)
      .first('users.*');

    return response.json(user);
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    await db('connections').insert({
      user_id
    });

    return response.status(201).send();
  }
}