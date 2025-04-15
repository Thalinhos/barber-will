import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET;

export const setToken = ((user) => {

    const token = jwt.sign({ username: user.nome, email: user.email }, SECRET, { expiresIn: '15min' });

    return token;

});


export const verifyToken = ((req, res, next) => {

    let token = req.headers.authorization || req.headers.cookie
    
    if (!token) {
    return res.status(400).json({ error: 'Token é necessário para verificação.' });
    }

    token = req.headers.cookie.split('token=')[1];

    jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
        return res.status(400).json({ error: 'Token expirado/inválido.' });
    }
    req.decoded = decoded;
    next();
    });
})