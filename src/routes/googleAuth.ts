import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { prisma }  from '../../prisma/db.mjs'

dotenv.config();
export const googleAuthRouter = express.Router();

googleAuthRouter.get('/', (req, res) => {
  // 0. Redirecionar o usuário para a tela de login do Google
  const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile&access_type=offline`;
  res.redirect(redirectUrl);
});

googleAuthRouter.get('/callback', async (req, res) => {
  const code = req.query.code;
    
  try {
    // 1. Trocar o code por um access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // @ts-ignore
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Buscar informações do usuário no Google
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const googleUser = await userInfoResponse.json();

    // 3. Verificar se o usuário já existe no banco
    let usuario = await prisma.pessoa.findUnique({
      where: { email: googleUser.email },
    });

    // 4. Se não existir, criar
    if (!usuario) {
      usuario = await prisma.pessoa.create({
        data: {
          nome: googleUser.name,
          email: googleUser.email,
          endereco: 'Login com Google',
        },
      });
    }

    // 5. Gerar JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.SECRET,
      { expiresIn: '15min' }
    );

    // 6. Enviar resposta pro frontend
    res.cookie('token', token, { httpOnly: true });
    res.json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });

  } catch (error) {
    console.error('Erro na autenticação Google:', error);
    res.status(500).json({ erro: 'Erro ao autenticar com o Google' });
  }
});