const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = async (request, response, next) => {
    const url = request.url;
   
    const resetUrl = url.includes('reset_password');

    if(url !== '/signup' && url !== '/forgot_password' && !resetUrl && url !== '/logout' && url !== '/login'){
        const authHeader = request.headers.authorization;
        console.log(authHeader);
        if(!authHeader){
            return response.status(401).send({ error: 'No token provided!' });
        }
    
        // Token tem o seguinte formato:
        // Começa com Bearer, seguido de algum hash mt loko:
        // Bearer dnjkfbhwekjdbhwdgbwdhfdwhfwhakgwhwjg
    
        const parts = authHeader.split(' ');
    
        if(!parts.length === 2)
            return response.status(401).send( { error: 'Token error' } );
    
        const [ scheme, token ] = parts;
    
        if(!/^Bearer$/i.test(scheme))
            return response.status(401).send({ error: 'Token malformatted' } );
    
        try {       
            jwt.verify(token, authConfig.secret, (err, decoded) => {
            if(err){
                return response.status(401).send( { error: err } );
            }
            
            request.userId = decoded.userId;
    
            return next();
    
            });
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        return next();
    }    
}