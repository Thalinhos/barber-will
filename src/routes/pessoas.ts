import express from 'express';
import { prisma }  from '../../prisma/db.mjs'
import { hashPass } from '../../utils/bcryptHashPass.mjs';

export const routerPessoas = express.Router();
//@ts-ignore
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

  if (!nome || !email || !senha || !telefone || !dataNascimento || !endereco || !tipo) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }

  const pessoaTelefoneVerify = await prisma.pessoa.findUnique({
    where: {
      telefone
    }
  });
  if (pessoaTelefoneVerify) {
    return res.status(400).json({ error: 'Telefone ja cadastrado!' });
  }

  const pessoaVerify = await prisma.pessoa.findUnique({
    where: {
      email
    }
  });
  if (pessoaVerify) {
    return res.status(400).json({ error: 'Email ja cadastrado!' });
  }

  const pessoaClienteVerify = await prisma.cliente.findUnique({
    where: {
      cpfOuCnpj
    }
  });
  if (pessoaClienteVerify) {
    return res.status(400).json({ error: 'CPF/CNPJ ja cadastrado!' });
  }

  const pessoaLojistaVerify = await prisma.lojista.findUnique({
    where: {
      cnpj: cpfOuCnpj
    }
  });
  if (pessoaLojistaVerify) {
    return res.status(400).json({ error: 'CNPJ ja cadastrado!' });
  }


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


