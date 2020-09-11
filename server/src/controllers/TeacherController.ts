import { Request, Response } from 'express';
import db from '../database/connection';

export default class ClassesController {
    async index(request: Request, response: Response){ // Proffy exibindo seu perfil

        const userId = request.params.id;
        
        // Juntar as tables user_account, users, classes, class_schedule,
        
        // Da user_account preciso do: last_name, email 
        // Da users precido do: avatar, whatsapp, bio
        // Da classes precido do: subject, cost, bio
        // Da class_schedule precido do: week_day, from, to

        const proffyDatas = await db('users')
        .join('user_account', `users.id`, '=', `user_account.id`)
        .join('classes', `users.id`, '=', `classes.user_id`)
        .join('class_schedule', 'class_id', '=', 'classes.id')
        .select('name', 'last_name', 'email', 'whatsapp', 'bio', 'cost', 'avatar', 'subject', 'week_day', 'from', 'to')
        .where(`users.id`, '=', `${userId}`);

        return response.json(proffyDatas);
        
    }

    async update(request: Request, response: Response){
        const userId = request.params.id;
        
        // Na tabela user_account mudar o: last_name 
        // Na tabela users mudar o: name, avatar, whatsapp, bio
        // Na tabela classes mudar o: subject, cost, bio
        // Na tabela class_schedule mudar o: week_day, from, to

        const {
            name,
	        last_name,
            whatsapp,
            bio,
            cost,
            avatar,
            subject,
            week_day,
            from,
            to
        } = request.body;

        await db('user_account')
        .where(`user_account.id`, '=', userId)
        .update({
            last_name,
        })


        await db('users')
        .where(`users.id`, '=', userId)
        .update({
            name,
            avatar,
            whatsapp,
            bio
        })

        await db('classes')
        .where(`user_id`, '=', userId)
        .update({
            subject,
            cost,
        })

        await db('class_schedule')
        .where(`class_id`, '=', userId)
        .update({
            week_day,
            from,
            to
        })      
        
        return response.send({ message: 'Successfully updated' })
    }

    async setFavorites(request: Request, response: Response){
        const { user } = request.headers;
        const { proffyid } = request.params;

        const checkIfUserExists = await db('users').where({
            id: user
        }).select('id');
       
        if(checkIfUserExists.length === 0)
            return response.status(400).send({ message: 'user does not exists.' });

        const checkIfProffyExists = await db('users').where({
            id: proffyid,
        }).select('id');
        
        if(checkIfProffyExists.length === 0)
            return response.status(400).send({ message: 'This proffy does not exists.' });

        if(user !== proffyid){
            await db('favorites').insert({
                user_id: proffyid
            });
        }

        const favTeachers = await db('users')
        .join('favorites', 'users.id', '=', 'favorites.user_id')
        .select('*');

        return response.send(favTeachers);

    }

    async delFavorites(request: Request, response: Response){
        const { user } = request.headers;
        const { proffyid } = request.params;

        const checkIfUserExists = await db('users').where({
            id: user
        }).select('id');
       
        if(checkIfUserExists.length === 0)
            return response.status(400).send({ message: 'user does not exists.' });

        const checkIfProffyExists = await db('users').where({
            id: proffyid,
        }).select('id');
        
        if(checkIfProffyExists.length === 0)
            return response.status(400).send({ message: 'This proffy does not exists.' });

        if(user !== proffyid){
            await db('favorites').where('user_id', proffyid).del()
        }        

        return response.send({ message: "succesfully deleted" });
    }
}