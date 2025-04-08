// src/main.mjs
import { prisma }  from '../prisma/db.mjs'
import { routerPessoas }  from './routes/pessoas.ts'
import express from 'express'

const app = express()
app.use(express.json())
app.use('/pessoas', routerPessoas)

app.get('/', async (req, res) => {
  const pessoas = await prisma.pessoa.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      telefone: true,
      dataNascimento: true,
      endereco: true,
      cliente: {
        select: {
          cpfOuCnpj: true
        }
      },
      lojista: {
        select: {
          cnpj: true,
          dadosBancarios: true
        }
      }
    }
  });

  res.json({ pessoas });
});



app.listen(3000, () => console.log(`running on http://localhost:${3000}`));

