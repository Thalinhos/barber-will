import express from 'express';
import { prisma }  from '../../prisma/db.mjs'
import { compareHash } from '../../utils/bcryptHashPass.mjs';
import { setToken, verifyToken } from '../../utils/jwt.mjs';

export const routerCredentials = express.Router();

//@ts-ignore
routerCredentials.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    
    if(!email || !senha){
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    const user = await prisma.pessoa.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const passwordMatch = await compareHash(senha, user.senha);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const token = setToken(user);

    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', });
    res.json({
        usuario: {
            id: user.id,
            nome: user.nome,
            email: user.email,
        },
    });
});

//@ts-ignore
routerCredentials.post('/verifyToken', verifyToken, (req, res) => {
    res.json({message: req.decoded});
});

routerCredentials.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout efetuado com sucesso' });
});
