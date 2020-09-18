import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../database/connection';
import bcrypt from 'bcrypt';

const authConfig = require('../config/auth.json');
const crypto = require('crypto');
const mailer = require('../modules/mailer');

function generateToken(params = {}){
    return jwt.sign(
        params, 
        authConfig.secret, {
        expiresIn: 1000000
    });
}

export default class ClassesController {    

    async index(request: Request, response: Response){
        const { email } = request.query;

        try{  
            const user = await db('user_account').where({
                email
            }).select('*');

            if(!user)
                return response.status(401).send({ message: 'User not found!'});

            return response.json(user);
        }
        catch(error){
            console.log(error);
        }
    }

    async create (request: Request, response: Response) {
        const { account_name, last_name, email, password } = request.body;
       
        const userExists = await db('user_account').where({
            email: `${email}`
        }).select('id');
                
        if(userExists.length > 0){
            return response.status(409).json( { error: 'This email is already registered'} );
        } 

        else{
            try{
                const saltRounds = 10;
                
                bcrypt.genSalt(saltRounds, function(err, salt){
                    bcrypt.hash(password, salt, async function(err, hash) {
                        const user = await db('user_account').insert({
                            account_name, 
                            last_name,
                            email,
                            password: hash,
                        });   
                        const id = user[0];
                        
                        return response.send({auth: true, id, account_name, last_name, email, token: generateToken({ id: user[0] }), message: 'Cadastrado'});
                        
                    });
                });             
            }catch(error){
                console.log('DEU RUIM NO USER CONTOLLER: ', error);
            }
        }
    }
    async login (request: Request, response: Response){   
        
        const { email, password } = request.body;
        
        try{
            const dbPassword = await db('user_account').where({
                email: `${email}`
            }).select('password');

            const userId = await db('user_account').where({
                email: `${email}`
            }).select('id');

            const id = userId[0].id;

            let hash = dbPassword[0].password;

            bcrypt.compare(password, hash, function(err, result) {
                // result == true    
                if(result){
                    return response.send({id, auth: true, token: generateToken( { id: userId[0] }) });
                }

                return response.json({ message: 'Invalid login' });

            });
        }
        catch(error){
            return response.status(401).send({ error: 'You do not have an account yet. Sign up first.' });        
        }
    }

    async logout (request: Request, response: Response) {
        response.status(200).send({ auth: false, token: null })
    }

    async forgotPassword(request: Request, response: Response){
        const { email } = request.body;

        try{
            const IdemailOnDB = await db('user_account').where({
                email: `${email}`
            }).select('id');

            if (!IdemailOnDB){
                return response.status(404).send({ error: 'User not found!' })
            }

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await db('user_account').where('email', '=', `${email}`)
            .update({
                passwordResetToken: token,
                passwordResetExpires: now,
            })
            
            mailer.sendMail({
                to: email,
                from: 'thiago25pro@gmail.com',
                template: 'auth/forgot_password',
                context: { token }
            }, (err: any) => {
                if (err)
                    return response.status(400).send({ error: 'Cannot send forgot password email.'})

                return response.status(200).send({ token, email });
            }
            );

        }
        catch(error){
            console.log('Erro no forgot password: ', error);
        }

    }

    async resetPassword(request: Request, response: Response){
        const { token, password } = request.body;
        const { email } = request.query;
        const newPassword = password;
        try {

            // Email
            const emailOnDB = await db('user_account').where({
                email: `${email}`
            }).select('email');

            // Password reset token
            const resetTokenOnDB = await db('user_account').where({
                email: `${email}`
            }).select('passwordResetToken');

            // Token expires
            const tokenExpiresOnDB = await db('user_account').where({
                email: `${email}`
            }).select('passwordResetExpires');
           
            if (!emailOnDB){
                return response.status(404).send({ error: 'User not found!' })
            }
            
            const { passwordResetToken } = resetTokenOnDB[0]; // Pego o token do banco de dados
            if(token !== passwordResetToken)
                return response.status(404).send({ error: 'Deu pau aqui no reset!' })

            const now = new Date();
            const { passwordResetExpires } = tokenExpiresOnDB[0]; // Pego o tempo decorrido do token
          
            if(now > passwordResetExpires){
                return response.status(400).send({ error: 'Token expired. Please generate a new one!' });
            }


            const saltRounds = 10;
                
            bcrypt.genSalt(saltRounds, function(err, salt){
                bcrypt.hash(newPassword, salt, async function(err, hash) {
                    await db('user_account')
                    .where('email', '=', email)
                    .update({
                        password: `${hash}`
                    });
                })
            });

            return response.status(200).send({ message: 'Password updated succesfully' })
            
        }
        catch(error){
            return response.status(400).send({ error: 'Cannot reset password. Try again!' });
        }
    }

}


