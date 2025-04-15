// src/main.mjs
import { routerCredentials } from './routes/credentialsAuth.ts'
import { googleAuthRouter } from './routes/googleAuth.ts'
import { routerPessoas }  from './routes/pessoas.ts'

import express from 'express'
import cors from 'cors'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS']
  })
)
app.use(express.json())
app.use('/pessoas', routerPessoas)
app.use('/googleAuth', googleAuthRouter)
app.use('/credentialsAuth', routerCredentials)





app.listen(3000, () => console.log(`running on http://localhost:${3000}`));

