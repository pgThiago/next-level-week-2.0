import { Request, Response } from 'express';

import db from '../database/connection';
import conventHourToMinutes from '../utils/convertHourToMinutes';
import doNotReturnYourself from '../utils/doNotReturnYourself';

import { attachPaginate } from 'knex-paginate';
attachPaginate();

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {

    async index (request: Request, response: Response){

        const filters = request.query;

        /* const { porPag, currentPag } = request.query;

        const quantidadePorPagina = Number(porPag);
        const paginaAtual = Number(currentPag); */

        try{

            const loggedUserId = Number(filters.id);

            const porPag = Number(filters.porPag);
            const currentPag = Number(filters.currentPag);

            const subject = filters.subject as string;
            const week_day = filters.week_day as string;
            const time = filters.time as string;
            
    
            if(!filters.week_day || !filters.subject || !filters.time){
                return response.status(400).json({
                    error: 'Missing filters to search'
                });
            }
    
            const timeInMinutes = conventHourToMinutes(time);
    
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
            .where('users.id', '!=', `${loggedUserId}`)
            .select(['classes.*', 'users.*']).paginate( { perPage: porPag, currentPage: currentPag } );

            if(classes.data.length > 0)
                return response.json(classes.data);
    
        }
        catch(error){
            return response.json(error);    
        }
    }

    async create (request: Request, response: Response) {
        const { id } = request.query;     
        
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
        
        const trx = await db.transaction();
        
        try {
            const userIdFromDataBase = await trx('user_account').where({
                id: `${id}`
            }).select('id');
            
            const insertedUsersIds = await trx('users').insert({
                user_id: userIdFromDataBase[0].id,
                name,
                avatar,
                whatsapp,
                bio,
            });
        
            const user_id = insertedUsersIds[0];        
            const insertedClssesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            })
        
            const class_id = insertedClssesIds[0];
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: conventHourToMinutes(scheduleItem.from),
                    to: conventHourToMinutes(scheduleItem.to)
                };
            })
        
            await trx('class_schedule').insert(classSchedule);
           
            await trx.commit();
        
            return response.status(201).send();
    
        }catch(err){
            
            trx.rollback();
            console.log('Erro: ', err)
            return response.status(400).json({
                error: 'Unexpected error while creating new class.'
            })
    
        }
    }
}