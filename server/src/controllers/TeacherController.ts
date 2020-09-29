import { Request, Response } from 'express';
import db from '../database/connection';

import conventHourToMinutes from '../utils/convertHourToMinutes';

export default class ClassesController {
    async index(request: Request, response: Response){ // Proffy exibindo seu perfil
        
        const { id } = request.query;
        try{
            // Juntar as tables user_account, users, classes, class_schedule,
            
            // Da user_account preciso do: last_name, email 
            // Da users preciso do: avatar, whatsapp, bio
            // Da classes preciso do: subject, cost, bio
            // Da class_schedule preciso do: week_day, from, to

            const proffyDatas = await db('user_account')
            .join('users', `user_account.id`, '=', `users.id`)
            .join('classes', `users.id`, '=', `classes.user_id`)
            .join('class_schedule', 'class_id', '=', 'classes.id')
            .select('name', 'last_name', 'email', 'whatsapp', 'bio', 'cost', 'avatar', 'subject', 'week_day', 'from', 'to')
            .where(`users.id`, '=', `${id}`);
            
            return response.json(proffyDatas);
        }
        
        catch(error){
            console.log(error);
        }
        
    }

    async update(request: Request, response: Response){
        const { id } = request.query;

        // Na tabela user_account mudar o: last_name 
        // Na tabela users mudar o: name, avatar, whatsapp, bio
        // Na tabela classes mudar o: subject, cost, bio
        // Na tabela class_schedule mudar o: week_day, from, to
        try {
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
            .where(`user_account.id`, '=', id)
            .update({
                last_name,
            })


            await db('users')
            .where(`users.id`, '=', id)
            .update({
                name,
                avatar,
                whatsapp,
                bio
            })

            await db('classes')
            .where(`user_id`, '=', id)
            .update({
                subject,
                cost,
            })

            

            await db('class_schedule')
            .where(`class_id`, '=', id)
            .update({
                week_day,
                from: conventHourToMinutes(from),
                to: conventHourToMinutes(to)
            })      
            
            return response.send({ message: 'Successfully updated' })
        }
        catch(error){
            console.log('Deu pau na atualização do perfil: ', error);
        }
    }

    async loadFavoritesIds(request: Request, response: Response){
        const { user } = request.headers;

        const userId = user as string;

        const favTeachers = await db('favorites')
        .where({
            user_id: userId
        }).select('prof_id');

        let profs: any[] = [];

        favTeachers.map(fav => {
            profs.push(fav.prof_id)
        })

        return response.send(profs);
    }

    async loadFavoritesContent(request: Request, response: Response){
        const { proffyid } = request.headers;

        const favTeachers= await db('user_account')
        .join('users', `user_account.id`, '=', `users.id`)
        .join('classes', `users.id`, '=', `classes.user_id`)
        .join('class_schedule', 'class_id', '=', 'classes.id')
        .select('users.id', 'name', 'last_name', 'email', 'whatsapp', 'bio', 'cost', 'avatar', 'subject', 'week_day', 'from', 'to')
        .where(`users.id`, '=', `${proffyid}`);

        let responseArray = [];
        responseArray.push(favTeachers[0]);    

        return response.json(responseArray);
    }

    async setFavorites(request: Request, response: Response){
        const { user, teacherid } = request.headers;

        try{

            const checkIfUserExists = await db('users').where({
                id: user
            }).select('id');
        
            if(checkIfUserExists.length === 0)
                return response.status(400).send({ message: 'user does not exists.' });

            const checkIfProffyExists = await db('users').where({
                id: teacherid,
            }).select('id');
            
            if(checkIfProffyExists.length === 0)
                return response.status(400).send({ message: 'This proffy does not exists.' });

            const checkIfIsAlreadFavorited = await db('favorites').where({
                prof_id: teacherid,
                user_id: user,
            }).select('*');


            if(user !== teacherid && checkIfIsAlreadFavorited.length === 0){
                await db('favorites').insert({
                    prof_id: teacherid,
                    user_id: user,
                });
            }
            else
                return response.send('Already favorited!');

            const teacher = await db('users')
            .where({
                id: teacherid
            }).select('*');


            return response.json(teacher);
        }
        catch(error){
            console.log(error);
            return response.send(error);
        }

    }

    async delFavorites(request: Request, response: Response){
        const { user , teacherid} = request.headers;

        const checkIfUserExists = await db('users').where({
            id: user
        }).select('id');
       
        if(checkIfUserExists.length === 0)
            return response.status(400).send({ message: 'user does not exists.' });

        const checkIfProffyExists = await db('users').where({
            id: teacherid,
        }).select('id');
        
        if(checkIfProffyExists.length === 0)
            return response.status(400).send({ message: 'This proffy does not exists.' }); 

         const checkIfIsFavorited = await db('favorites').where({
                prof_id: teacherid,
                user_id: user,
            }).select('*');

            if(checkIfIsFavorited.length !== 0){
                await db('favorites').where(
                    'prof_id', teacherid
                ).del();
                
                await db('favorites').where(
                    'user_id', user
                ).del();                

            }
            

        return response.send({ message: "succesfully deleted" });
    }
}