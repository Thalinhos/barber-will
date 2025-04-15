import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { usersCollection } from '../models/db.mjs';


dotenv.config();
export const googleAuthRouter = express.Router();

googleAuthRouter.get('/', (req, res) => {
  const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile&access_type=offline`;
  res.redirect(redirectUrl);
});

googleAuthRouter.get('/callback', async (req, res) => {
  const code = req.query.code;
    
  try {
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

    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const googleUser = await userInfoResponse.json();

    const user = await usersCollection.findOne({ email: googleUser.email }) || null;

    if (!user){
      await usersCollection.insertOne({ email: googleUser.email, nome: googleUser.name });
    } 

    const token = jwt.sign(
      { id: googleUser.id, nome: googleUser.name, email: googleUser.email },
      process.env.SECRET,
      { expiresIn: '15min' }
    );

    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    // res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    res.json({ message: 'Autenticado com sucesso', token, googleUser });
    

  } catch (error) {
    console.error('Erro na autenticação Google:', error);
    res.status(500).json({ erro: 'Erro ao autenticar com o Google' });
  }
});