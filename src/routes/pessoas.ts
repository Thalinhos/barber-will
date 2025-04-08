import express from 'express';
import { prisma }  from '../../prisma/db.mjs'
import { hashPass } from '../../utils/bcryptHashPass.mjs';

export const routerPessoas = express.Router();

routerPessoas.post('/addPessoa', async (req, res) => {
  const {
    nome,
    email,
    senha,
    telefone,
    dataNascimento,
    endereco,
    tipo, // 'cliente' ou 'lojista'
    cpfOuCnpj,
    dadosBancarios // só se for lojista
  } = req.body;

  //hash
  const senhaCriptografada = await hashPass(senha);

  try {
    // Cria a Pessoa
    const novaPessoa = await prisma.pessoa.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
        telefone,
        dataNascimento: new Date(dataNascimento),
        endereco
      }
    });

    // Se for cliente
    if (tipo === 'cliente') {
      await prisma.cliente.create({
        data: {
          id: novaPessoa.id,
          cpfOuCnpj
        }
      });
    }

    // Se for lojista
    if (tipo === 'lojista') {
      await prisma.lojista.create({
        data: {
          id: novaPessoa.id,
          cnpj: cpfOuCnpj,
          dadosBancarios
        }
      });
    }

    res.status(201).json({ message: 'Pessoa criada com sucesso!', pessoa: novaPessoa });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar pessoa.' });
  }
});


