import express from 'express';
import { verifyToken } from '../utils/jwt.mjs';


export const routerCredentials = express.Router();



//@ts-ignore
routerCredentials.post('/verifyToken', verifyToken, (req, res) => {
    res.json({message: req.decoded});
});

routerCredentials.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout efetuado com sucesso' });
});
