import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET;

export const setToken = ((user) => {

    const token = jwt.sign({ username: user }, SECRET, { expiresIn: '15min' });

    return token;

});


export const verifyToken = ((req, res, next) => {
    const reqToken = req.headers['x-access-token'] || req.headers['authorization']
    
    if(!reqToken){ return res.status(400).json({errorMessage: 'Token é necessário para verificação.'}); }
    
    const token = reqToken?.split('Bearer ')[1]

    if(!token){ return res.status(400).json({errorMessage: 'Token é necessário para verificação.'}); } 

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) { return res.status(400).json({errorMessage: 'Token expirado/inválido.'}); }
        req.decoded = decoded
        next()
    });
})